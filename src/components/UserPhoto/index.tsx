import { IImageProps, Image } from "native-base";
interface Props extends IImageProps {
  size: number;
}

export const UserPhoto = ({ size, ...props }: Props) => {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={"2"}
      borderColor="gray.400"
      {...props}
    />
  );
};
