import { MaterialIcons } from "@expo/vector-icons";
import {
  CheckIcon,
  FormControl,
  ISelectProps,
  Icon,
  Select as NativeBaseSelect,
} from "native-base";

type Props = ISelectProps & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  options: {
    label: string;
    value: string;
  }[];
};

export function Select({
  errorMessage = null,
  isInvalid,
  options,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid}>
      <FormControl.Label>{rest.placeholder}</FormControl.Label>
      <NativeBaseSelect
        accessibilityLabel={rest.placeholder}
        placeholder={rest.placeholder}
        dropdownOpenIcon={
          <Icon name="arrow-drop-up" as={MaterialIcons} size={6} />
        }
        dropdownCloseIcon={
          <Icon name="arrow-drop-down" as={MaterialIcons} size={6} />
        }
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        h={16}
        mt={1}
        {...rest}
      >
        {options.map((opt) => (
          <NativeBaseSelect.Item
            key={opt.value}
            label={opt.label}
            value={opt.value}
          />
        ))}
      </NativeBaseSelect>
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
