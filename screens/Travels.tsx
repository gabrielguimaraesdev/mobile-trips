import {
  Box,
  Center,
  FlatList,
  Icon,
  IconButton,
  Pressable,
} from "native-base";
import { CardTravel } from "../components";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import api from "../services";

type DataProps = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  travelers: string[];
  image: string;
};

export default function TravelsScreen({ navigation }: any) {
  const [data, setData] = useState<DataProps[]>([]);

  useEffect(() => {
    const initialData = async () => {
      try {
        const res: any = await api.get("trips");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    initialData();
  }, []);

  return (
    <Box alignItems="center" py={4} w="full">
      <Center>
        <IconButton
          variant="solid"
          onPress={() => navigation.navigate("TravelForm")}
          icon={<Icon as={MaterialIcons} name="add" />}
          borderRadius="full"
        />
      </Center>
      <FlatList
        numColumns={1}
        data={data}
        renderItem={({ item }) => {
          return (
            <Pressable
              p={4}
              onPress={() => navigation.navigate("Users", { id: item.id })}
            >
              <CardTravel
                title={item.name}
                subtitle={"Not suported"}
                description={item.description}
                travelers={item.travelers}
                image={
                  "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                }
              />
            </Pressable>
          );
        }}
      />
    </Box>
  );
}
