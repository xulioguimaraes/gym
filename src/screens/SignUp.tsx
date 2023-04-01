import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";

import Background from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import axios from "axios";
import { Alert } from "react-native";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

interface FormDataProps {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}
const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o email").email("E-mail invalido"),
  password: yup
    .string()
    .required("Informe sua senha")
    .min(6, "A senha deve ter mais de 6 digitos"),
  confirm_password: yup
    .string()
    .required("Confirme a senha")
    .oneOf([yup.ref("password")], "A confirmação de senha não confere"),
});

export const SignUp = () => {
  const toast = useToast();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(false);
  const { singIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const handleGoBack = () => navigation.navigate("signIn");
  const handleSignUp = async (data: FormDataProps) => {
    setIsLoading(true);
    const { password, email, name } = data;
    try {
      await api.post("/users", {
        password,
        email,
        name,
      });
      await singIn(email, password);
    } catch (error) {
      const isAxiosError = error instanceof AppError;
      console.log(isAxiosError);
      const title = isAxiosError
        ? error.message
        : "Não foi possivel criar uma conta, Tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.600",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px="10" pb="14">
        <Image
          source={Background}
          defaultSource={Background}
          alt="backgroud"
          resizeMode="contain"
          position={"absolute"}
        />
        <Center mt={20} mb={16}>
          <LogoSvg />

          <Text color={"gray.100"} fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            fontFamily={"heading"}
            color={"gray.100"}
            mb="6"
            fontSize={"xl"}
          >
            Crie sua conta
          </Heading>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nome"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="E-mail"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Confirmar senha"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            isLoading={isLoading}
            onPress={handleSubmit(handleSignUp)}
            title="Criar e acessar"
          />
        </Center>
        <Button
          onPress={handleGoBack}
          mt={20}
          variant={"outline"}
          title="Voltar ao login"
        />
      </VStack>
    </ScrollView>
  );
};
