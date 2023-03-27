import { Heading, SectionList, Text, VStack } from "native-base";
import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard/HistoryCard";
import { useState } from "react";

export const History = () => {
  const [exercises, setExercises] = useState([
    { title: "26.08.2022", data: ["Puxada frontal", "Remanda unilateral"] },
    { title: "25.08.2022", data: ["Puxada frontal"] },
  ]);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Historico de exercicios" />
      <SectionList
        px="6"
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={() => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading
            color={"gray.200"}
            mt={10}
            mb={3}
            fontSize="md"
            fontFamily={"heading"}
          >
            {section.title}
          </Heading>
        )}
        contentContainerStyle={[].length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <Text color={"gray.100"} textAlign="center">
            Não a exercicios registrados ainda.{"\n"} Vamos fazer treinar hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
};
