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
import * as yup from "yup";
import * as ImagePiker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
const PHOTO_SIZE = 32;
import defaultUserPhoto from "@assets/userPhotoDefault.png";

type FormDataProps = {
  name: string;
  password: string;
  old_password: string;
  confirm_password: string;
  email: string;
};

const schemaProfile = yup.object({
  name: yup.string().required("Informe seu nome."),
  password: yup
    .string()
    .min(6, "A senha deve ter ao menos 6 digitos.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password")], "A confirmação de senha não confere.")
    .when("password", {
      is: (Field: any) => Field,
      then: (schema) =>
        schema
          .transform((value) => (!!value ? value : null))
          .required("Informe a confirmação da senha"),
    }),
});

export const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toast = useToast();

  const { user, updateUserProfile } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(schemaProfile),
  });

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

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        const userPhotoUploadForm = new FormData();

        userPhotoUploadForm.append("avatar", photoFile);

        const userUpdatedResponse = await api.patch(
          "/users/avatar",
          userPhotoUploadForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const userUpdated = user;

        userUpdated.avatar = userUpdatedResponse.data.avatar;
        updateUserProfile(userUpdated);

        toast.show({
          title: "Foto atualizada",
          placement: "top",
          bgColor: "green.600",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  };

  const handleProfileUpdate = async (data: FormDataProps) => {
    try {
      setIsUpdating(true);

      const userUpdate = user;
      userUpdate.name = data.name;
      await updateUserProfile(userUpdate);

      await api.put("/users", data);

      toast.show({
        title: "Perfil atualizado com sucesso",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possivel atulizar dados.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.600",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const uri = `${api.defaults.baseURL}/avatar/${user.avatar}`;
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
              source={
                user.avatar
                  ? {
                      uri,
                    }
                  : defaultUserPhoto
              }
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

          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                bg={"gray.600"}
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                bg={"gray.600"}
                isDisabled
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
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
          <Controller
            name="old_password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                bg={"gray.600"}
                secureTextEntry
                placeholder="Senha antiga"
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                bg={"gray.600"}
                secureTextEntry
                placeholder="Nova senha"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            name="confirm_password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                bg={"gray.600"}
                secureTextEntry
                placeholder="Confirmar senha"
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt="4"
            isLoading={isUpdating}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
};
