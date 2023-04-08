import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { ExercisesDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";
import { AppNavigatorRouterProps } from "@routes/app.routes";

interface IRoutesParams {
  exerciseId: string;
}

export const Exercise = () => {
  const navigation = useNavigation<AppNavigatorRouterProps>();
  const toast = useToast();
  const routes = useRoute();

  const [exercise, setExercise] = useState<ExercisesDTO>({} as ExercisesDTO);
  const [isLoading, setIsLoading] = useState(true);
  const [sendingRegister, setSendingRegister] = useState(false);
  const { exerciseId } = routes.params as IRoutesParams;
  const hanleGoBack = () => {
    navigation.goBack();
  };

  const fetchExerciseDatails = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Não foi possivel carregar.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.600",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExerciseHistoryRegister = async () => {
    setSendingRegister(true);
    try {
      await api.post(`/history`, {
        exercise_id: exerciseId,
      });
      toast.show({
        title: "Registrado no seu historico",
        placement: "top",
        bgColor: "green.600",
      });

      navigation.navigate("history");
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Não foi possivel registrar.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.600",
      });
    } finally {
      setSendingRegister(false);
    }
  };

  useEffect(() => {
    fetchExerciseDatails();
  }, [exerciseId]);
  return (
    <VStack flex={1}>
      <VStack px={8} pt={12} bg="gray.600">
        <TouchableOpacity onPress={hanleGoBack}>
          <Icon as={Feather} name="arrow-left" color={"green.500"} size={6} />
        </TouchableOpacity>
        {!isLoading && (
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
              {exercise.name}
            </Heading>

            <HStack alignItems={"center"}>
              <BodySvg />
              <Text color={"gray.100"} textTransform="capitalize" ml={1}>
                {exercise.group}
              </Text>
            </HStack>
          </HStack>
        )}
      </VStack>
      <ScrollView>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <VStack p={8}>
            <Box rounded={"lg"} mb={3} overflow={"hidden"}>
              <Image
                w={"full"}
                h="80"
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt="eercicio"
                resizeMode="cover"
              />
            </Box>

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
                    {exercise.series} Series
                  </Text>
                </HStack>
                <HStack>
                  <RepetitionSvg />
                  <Text ml={2} color="gray.200">
                    {exercise.repetitions} Repetições
                  </Text>
                </HStack>
              </HStack>
              <Button
                isLoading={sendingRegister}
                title="Marca como realizado"
                onPress={handleExerciseHistoryRegister}
              />
            </Box>
          </VStack>
        )}
      </ScrollView>
    </VStack>
  );
};
