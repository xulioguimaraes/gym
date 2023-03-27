import { IPressableProps, Pressable, Text } from "native-base";
interface Props extends IPressableProps {
  name: string;
  isActive: boolean;
}

export const Group = ({ name, isActive, ...props }: Props) => {
  return (
    <Pressable
      mr={3}
      w={24}
      h={10}
      isPressed={isActive}
      bg={"gray.600"}
      rounded={"md"}
      justifyContent="center"
      alignItems={"center"}
      overflow="hidden"
      {...props}
      _pressed={{
        borderColor: "green.500",
        borderWidth: "1",
      }}
    >
      <Text
        fontWeight={"bold"}
        textTransform="uppercase"
        color={isActive ? "green.500" : "gray.200"}
        fontSize="xs"
      >
        {name}
      </Text>
    </Pressable>
  );
};
