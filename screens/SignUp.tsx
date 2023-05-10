import { Box, Center, ScrollView, VStack, View, useToast } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, HeaderInfo, Input } from "../components";
import api from "../services";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  password: yup.string().required("Informe a senha").min(6, "Mínimo 6 dígitos"),
  password_confirm: yup
    .string()
    .required("Informe a confirmação da senha")
    .oneOf([yup.ref("password"), ""], "A confirmação de senha não é igual"),
});

export default function SignUpScreen({ navigation }: any) {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  function handleSignUp(data: FormDataProps) {
    try {
      api.post("/users", data);
      toast.show({
        title: `${data.name} salvo com sucesso`,
        placement: "top",
      });
      navigation.navigate("Home");
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
                name="email"
                control={control}
                render={({ field: { onChange } }) => (
                  <Input
                    placeholder="E-mail"
                    errorMessage={errors.email?.message}
                    onChangeText={onChange}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange } }) => (
                  <Input
                    placeholder="Senha"
                    errorMessage={errors.password?.message}
                    onChangeText={onChange}
                    secureTextEntry
                  />
                )}
              />
              <Controller
                name="password_confirm"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange } }) => (
                  <Input
                    placeholder="Confirme a senha"
                    errorMessage={errors.password_confirm?.message}
                    onChangeText={onChange}
                    secureTextEntry
                  />
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
