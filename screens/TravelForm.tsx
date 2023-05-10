import {
  Box,
  Center,
  FormControl,
  ScrollView,
  VStack,
  useToast,
  Checkbox,
  Text,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, HeaderInfo, Input } from "../components";
import api from "../services";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { dataUsers } from "../data";

type FormDataProps = {
  name: string;
  description: string;
  travelers: string[];
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome"),
});

export default function TravelFormScreen({ navigation }: any) {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      description: "",
      travelers: [],
    },
    resolver: yupResolver(signUpSchema),
  });

  function handleSignUp(data: FormDataProps) {
    try {
      api.post("/trips", data);
      toast.show({
        title: `${data.name} salvo com sucesso`,
        placement: "top",
      });
      navigation.navigate("Travels");
    } catch (error) {
      console.log("POST User", error);
      toast.show({
        title: "Erro ao salvar",
        placement: "top",
      });
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
              title="Cadastro"
              subtitle="Crie a sua conta para acessar"
            />

            <VStack space={3} mt="5">
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    placeholder="Nome"
                    errorMessage={errors.name?.message}
                    onChangeText={onChange}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange } }) => (
                  <Input placeholder="Descrição" onChangeText={onChange} />
                )}
              />
              <Controller
                control={control}
                name="travelers"
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

              <Button title="Cadastrar" onPress={handleSubmit(handleSignUp)} />
            </VStack>
          </Box>
        </Center>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}
