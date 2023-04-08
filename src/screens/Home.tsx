import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import {
  Center,
  FlatList,
  Heading,
  HStack,
  IPressableProps,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useCallback, useEffect, useState } from "react";
import { ExerciseCard } from "@components/ExerciseCard/ExerciseCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRouterProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExercisesDTO } from "@dtos/ExerciseDTO";
import { AxiosResponse } from "axios";
import { Loading } from "@components/Loading";

export const Home = () => {
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExercisesDTO[]>(
    [] as ExercisesDTO[]
  );
  const [groupSelected, setGroupSelected] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<AppNavigatorRouterProps>();
  const toast = useToast();
  const handleOpenExerciseDetails = (id: string) => {
    navigation.navigate("exercise", {
      exerciseId: id,
    });
  };

  const fetchGroups = async () => {
    try {
      const response = await api.get("/groups");
      const { data }: { data: string[] } = response;
      setGroupSelected(data[0]);
      setGroups(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possivel carregar os grupos.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.600",
      });
    }
  };

  const fecthExerciseByGroup = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possivel carregar os exercicios.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.600",
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fecthExerciseByGroup();
    }, [groupSelected])
  );
  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            onPress={() => setGroupSelected(item)}
            name={item}
            isActive={groupSelected === item}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent={"space-between"} mb={5}>
            <Heading color={"gray.200"} fontSize="md">
              Exercicios
            </Heading>
            <Text color={"gray.200"} fontSize={"sm"}>
              {exercises.length}
            </Text>
          </HStack>
          <FlatList
            data={exercises}
            showsHorizontalScrollIndicator={false}
            _contentContainerStyle={{ pb: 10 }}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
            keyExtractor={({ id }) => id}
          />
        </VStack>
      )}
    </VStack>
  );
};
