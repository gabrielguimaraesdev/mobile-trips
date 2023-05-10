import {
  Box,
  Center,
  Checkbox,
  FormControl,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { dataUsers } from "../data";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, HeaderInfo, Input, Select } from "../components";
import { useForm, Controller } from "react-hook-form";

type FormDataProps = {
  description: string;
  value: string;
  paying: string;
  division: string[];
};

export function TravelCoastScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      paying: "",
      division: [],
    },
    // resolver: yupResolver(signUpSchema),
  });

  function handleSignUp(data: FormDataProps) {
    try {
      console.log("COAST ", data);
    } catch (error) {
      console.log("POST User", error);
    }
  }

  return (
    <ScrollView>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
      >
        <Center w="100%">
          <Box safeArea p="2" w="90%">
            <HeaderInfo
              title="Custo"
              subtitle="Adicione o que foi comprado e com quem vai dividir"
            />

            <VStack space={3} mt="5">
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    placeholder="Descrição"
                    errorMessage={errors.description?.message}
                    onChangeText={onChange}
                  />
                )}
              />

              <Controller
                name="value"
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    placeholder="Valor R$"
                    keyboardType="number-pad"
                    errorMessage={errors.description?.message}
                    onChangeText={onChange}
                  />
                )}
              />

              <Controller
                name="paying"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    placeholder="Pagante"
                    onValueChange={(itemValue: string) => {
                      onChange(itemValue);
                    }}
                    selectedValue={value}
                    options={dataUsers.map((data) => ({
                      label: data.fullName,
                      value: data.id,
                    }))}
                  />
                )}
              />

              <Controller
                control={control}
                name="division"
                render={({ field: { onChange } }) => (
                  <FormControl>
                    <FormControl.Label>Dividir com:</FormControl.Label>
                    <Checkbox.Group onChange={onChange}>
                      {dataUsers.map((user) => (
                        <Checkbox value={user.id}>
                          <Text my={2}>{user.fullName}</Text>
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </FormControl>
                )}
              />

              <Button title="Adicionar" onPress={handleSubmit(handleSignUp)} />
            </VStack>
          </Box>
        </Center>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}
