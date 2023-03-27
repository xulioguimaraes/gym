import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import {
  Center,
  FlatList,
  Heading,
  HStack,
  IPressableProps,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { ExerciseCard } from "@components/ExerciseCard/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRouterProps } from "@routes/app.routes";

export const Home = () => {
  const [groups, setGroups] = useState([
    "costa",
    "bicipes",
    "ombro",
    "perna",
    "braço",
  ]);
  const [exercises, setExercises] = useState([
    "Remada",
    "Leg",
    "Puxada",
    "Extenção",
    "Agachamento",
  ]);
  const [groupSelected, setGroupSelected] = useState("costa");

  const navigation = useNavigation<AppNavigatorRouterProps>();

  const handleOpenExerciseDetails = () => {
    navigation.navigate("exercise");
  };
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
          renderItem={(item) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          keyExtractor={(item) => item}
        />
      </VStack>
    </VStack>
  );
};
