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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { useState } from "react";
interface FormDataProps {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().required("Informe o email").email("E-mail invalido"),
  password: yup
    .string()
    .required("Informe sua senha")
    .min(6, "A senha deve ter mais de 6 digitos"),
});

export const SignIn = () => {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();
  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  const { singIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const handleSignIn = async (data: FormDataProps) => {
    try {
      setIsLoading(true);
      await singIn(data.email, data.password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde";

      if (isAppError) {
        setError("email", {
          message: "Email Incorreto",
        });
        setError("password", {
          message: "Senha Incoreta",
        });
      }
      setIsLoading(false);

      toast.show({
        title,
        placement: "top",
        bgColor: "red.600",
      });
    }
  };
  console.log(errors);

  const handleNewAccount = () => navigation.navigate("signUp");
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px="10" pb="16">
        <Image
          source={Background}
          defaultSource={Background}
          alt="backgroud"
          resizeMode="contain"
          position={"absolute"}
        />
        <Center my={24}>
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
            Acesse sua conta
          </Heading>
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
          <Button onPress={handleSubmit(handleSignIn)} title="Acessar" />
        </Center>
        <Center mt={16}>
          <Text color={"gray.100"} fontSize="sm" mb={"3"} fontFamily={"body"}>
            Ainda não tem acesso?
          </Text>
          <Button
            variant={"outline"}
            title="Criar conta"
            onPress={handleNewAccount}
            isLoading={isLoading}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};
