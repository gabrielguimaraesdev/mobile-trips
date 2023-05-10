import { Box, Center, HStack, Text, VStack } from "native-base";
import { Button, HeaderInfo, Input } from "../components";
import { Controller, useForm } from "react-hook-form";

type FormDataProps = {
  email: string;
  password: string;
};

export default function HomeScreen({ navigation }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSignIn(data: FormDataProps) {
    console.log("Form data -> ", data);
    navigation.navigate("StackComponent");
  }

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%">
        <HeaderInfo title="Travels App" subtitle="Faça login para continuar" />

        <VStack space={3} mt="5">
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
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                errorMessage={errors.password?.message}
                onChangeText={onChange}
                secureTextEntry
              />
            )}
          />

          <Text>Esqueci minha senha</Text>

          <Button mt="2" title="Entrar" onPress={handleSubmit(handleSignIn)} />
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600">
              Sou um novo usuário.{" "}
            </Text>
            <Text onPress={() => navigation.navigate("SignUp")}>Cadastrar</Text>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
