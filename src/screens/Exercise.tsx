import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";

export const Exercise = () => {
  const navigation = useNavigation();

  const hanleGoBack = () => {
    navigation.goBack();
  };
  return (
    <VStack flex={1}>
      <VStack px={8} pt={12} bg="gray.600">
        <TouchableOpacity onPress={hanleGoBack}>
          <Icon as={Feather} name="arrow-left" color={"green.500"} size={6} />
        </TouchableOpacity>
        <HStack
          justifyContent={"space-between"}
          mt="4"
          mb={8}
          alignItems="center"
        >
          <Heading
            color={"gray.100"}
            fontSize="lg"
            flexShrink={1}
            fontFamily={"heading"}
          >
            Puxada frontal
          </Heading>

          <HStack alignItems={"center"}>
            <BodySvg />
            <Text color={"gray.100"} textTransform="capitalize" ml={1}>
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack p={8}>
          <Image
            w={"full"}
            h="80"
            source={{
              uri: "https://www.hipertrofia.org/blog/wp-content/uploads/2014/11/remada-curvada-1.jpg",
            }}
            alt="eercicio"
            resizeMode="cover"
            rounded={"lg"}
            mb={3}
          />

          <Box bg={"gray.600"} rounded="lg" pb={4} px={4}>
            <HStack
              alignItems={"center"}
              mb={6}
              mt={6}
              justifyContent="space-around"
            >
              <HStack>
                <SeriesSvg />
                <Text ml={2} color="gray.200">
                  3 Series
                </Text>
              </HStack>
              <HStack>
                <RepetitionSvg />
                <Text ml={2} color="gray.200">
                  12 Repetições
                </Text>
              </HStack>
            </HStack>
            <Button title="Marca como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
};
