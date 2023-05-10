import { IButtonProps, Button as NativeBaseButton, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <NativeBaseButton h={16} {...rest}>
      <Text color="white" fontSize="md">
        {title}
      </Text>
    </NativeBaseButton>
  );
}
