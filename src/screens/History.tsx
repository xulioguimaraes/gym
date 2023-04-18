import { Heading, SectionList, Text, VStack, useToast } from "native-base";
import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard/HistoryCard";
import { useCallback, useState } from "react";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useFocusEffect } from "@react-navigation/native";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

export const History = () => {
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const fecthHistory = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/history");
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possivel carregar historico.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.600",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fecthHistory();
    }, [])
  );
  return (
    <VStack flex={1}>
      <ScreenHeader title="Historico de exercicios" />
      <SectionList
        px="6"
        sections={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <HistoryCard data={item} />}
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
