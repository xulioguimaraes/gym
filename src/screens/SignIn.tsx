import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import Background from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export const SignIn = () => {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

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
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="E-mail"
          />
          <Input placeholder="Senha" secureTextEntry />

          <Button title="Acessar" />
        </Center>
        <Center mt={16}>
          <Text color={"gray.100"} fontSize="sm" mb={"3"} fontFamily={"body"}>
            Ainda não tem acesso?
          </Text>
          <Button
            variant={"outline"}
            title="Criar conta"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};
