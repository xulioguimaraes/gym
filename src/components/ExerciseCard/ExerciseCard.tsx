import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ExercisesDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";

interface Props extends TouchableOpacityProps {
  data: ExercisesDTO;
}

export const ExerciseCard = ({ data, ...props }: Props) => {
  return (
    <>
      <TouchableOpacity {...props}>
        <HStack
          bg={"gray.500"}
          alignItems="center"
          p="2"
          pr={4}
          rounded="md"
          mb={3}
        >
          <Image
            source={{
              uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
            }}
            alt="imagem do exercicio"
            w={16}
            h={16}
            rounded="md"
            mr={4}
            resizeMode="cover"
          />
          <VStack flex={1}>
            <Heading fontSize={"lg"} color={"white"} fontFamily={"heading"}>
              {data.name}
            </Heading>

            <Text color={"gray.200"} fontSize="sm" numberOfLines={2}>
              {`${data.series} series x ${data.repetitions} repetições`}
            </Text>
          </VStack>
          <Icon as={Entypo} name="chevron-thin-right" color={"gray.300"} />
        </HStack>
      </TouchableOpacity>
    </>
  );
};
