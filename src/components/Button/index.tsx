import { IButtonProps, Button as NativeBaseButton, Text } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
}

export const Button = ({ title, variant, ...props }: ButtonProps) => {
  return (
    <NativeBaseButton
      _pressed={{
        bg: variant === "outline" ? "gray.500" : "green.500",
      }}
      rounded={"sm"}
      w="full"
      {...props}
      bg={variant === "outline" ? "transparent" : "green.700"}
      h="14"
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor={"green.500"}
    >
      <Text
        fontFamily={"heading"}
        color={variant === "outline" ? "green.500" : "white"}
        fontSize="sm"
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
};
