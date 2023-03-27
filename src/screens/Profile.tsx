import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  useToast,
  VStack,
} from "native-base";
import { UserPhoto } from "@components/UserPhoto";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import * as ImagePiker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
const PHOTO_SIZE = 32;
type IFilesitem = FileSystem.FileInfo;

export const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const toast = useToast();
  const [userPhoto, setUserPhoto] = useState(
    "https://avatars.githubusercontent.com/u/82290444?v=4"
  );

  const handleUserPhotoSelect = async () => {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePiker.launchImageLibraryAsync({
        mediaTypes: ImagePiker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        allowsMultipleSelection: false,
      });
      if (photoSelected.canceled) return;
      if (photoSelected.assets[0].uri) {
        const photoInfo: any = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );
        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          toast.show({
            title: "Essa imagem é muito grande... Escolha uma de até 5MB",
            bgColor: "red.500",
          });
          return;
        }
        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  };
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded={"full"}
              startColor="gray.600"
              endColor={"gray.400"}
            />
          ) : (
            <UserPhoto
              source={{
                uri: userPhoto,
              }}
              size={PHOTO_SIZE}
              alt="Photo user"
            />
          )}
          <TouchableOpacity>
            <Text
              onPress={handleUserPhotoSelect}
              color={"green.500"}
              fontWeight="bold"
              fontSize={"md"}
              mt={2}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input bg={"gray.600"} placeholder="Nome" />
          <Input bg={"gray.600"} isDisabled placeholder="E-mail" />
        </Center>
        <VStack px={10} mt={12} mb={8}>
          <Heading
            color={"gray.200"}
            fontSize="md"
            mb={2}
            fontFamily={"heading"}
          >
            Alterar senha
          </Heading>

          <Input bg={"gray.600"} secureTextEntry placeholder="Senha antiga" />
          <Input bg={"gray.600"} secureTextEntry placeholder="Nova senha" />
          <Input
            bg={"gray.600"}
            secureTextEntry
            placeholder="Confirmar senha"
          />
          <Button title="Atualizar" mt="4" />
        </VStack>
      </ScrollView>
    </VStack>
  );
};
