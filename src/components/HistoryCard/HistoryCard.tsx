import { HistoryDTO } from "@dtos/HistoryDTO";
import { Heading, HStack, Text, VStack } from "native-base";
interface Props {
  data: HistoryDTO;
}

export const HistoryCard = ({ data }: Props) => {
  return (
    <>
      <HStack
        w="full"
        px={5}
        py="4"
        mb={2}
        bg="gray.600"
        rounded={"md"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <VStack mr={5}>
          <Heading
            textTransform={"capitalize"}
            color="white"
            fontSize={"md"}
            noOfLines={1}
            fontFamily={"heading"}
          >
            {data.group}
          </Heading>
          <Text color={"gray.100"} noOfLines={1} fontSize="lg">
            {data.name}
          </Text>
        </VStack>

        <Text color={"gray.300"} fontSize="md">
          {data.hour}
        </Text>
      </HStack>
    </>
  );
};
