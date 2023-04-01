import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { UserPhoto } from "@components/UserPhoto";

import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";

import defaultUserPhoto from "@assets/userPhotoDefault.png";

export const HomeHeader = () => {
  const { user, signOut } = useAuth();
  return (
    <HStack bg={"gray.600"} pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={user.avatar ? { uri: user.avatar } : defaultUserPhoto}
        size={16}
        alt="Photo user"
        mr={"4"}
      />
      <VStack flex={1}>
        <Text color={"gray.100"} fontSize="md">
          Ola,{" "}
        </Text>
        <Heading color={"gray.100"} fontSize="md" fontFamily={"heading"}>
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} size={7} name="logout" color={"gray.200"} />
      </TouchableOpacity>
    </HStack>
  );
};
