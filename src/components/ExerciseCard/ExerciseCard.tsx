import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";

interface Props extends TouchableOpacityProps {}

export const ExerciseCard = ({ ...props }: Props) => {
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
              uri: "https://blog.lionfitness.com.br/wp-content/uploads/2018/10/Blog-9-1.jpg",
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
              Remada unilateral
            </Heading>

            <Text color={"gray.200"} fontSize="sm" numberOfLines={2}>
              3 series x 12 repetições
            </Text>
          </VStack>
          <Icon as={Entypo} name="chevron-thin-right" color={"gray.300"} />
        </HStack>
      </TouchableOpacity>
    </>
  );
};
