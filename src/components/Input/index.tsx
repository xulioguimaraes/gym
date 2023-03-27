import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
} from "native-base";

interface Props extends IInputProps {
  errorMessage?: string | null;
}
export const Input = ({ errorMessage = null, isInvalid, ...props }: Props) => {
  const invalid = !!errorMessage || isInvalid;
  return (
    <>
      <FormControl isInvalid={invalid} mb={4}>
        <NativeBaseInput
          bg={"gray.700"}
          h="14"
          px="4"
          borderWidth={0}
          fontSize={"md"}
          color="white"
          fontFamily={"body"}
          isInvalid={invalid}
          placeholderTextColor="gray.300"
          _invalid={{
            borderWidth: "1",
            borderColor: "red.600",
          }}
          _focus={{
            bg: "gray.700",
            borderWidth: "1px",
            borderColor: "green.500",
          }}
          {...props}
        />
        <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
      </FormControl>
    </>
  );
};
