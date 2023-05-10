import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
} from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
  isInvalid?: boolean;
};

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid}>
      <FormControl.Label>{rest.placeholder}</FormControl.Label>
      <NativeBaseInput
        fontSize="md"
        h={16}
        isInvalid={invalid}
        _focus={{
          borderWidth: 2,
          borderColor: "green.500",
        }}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
