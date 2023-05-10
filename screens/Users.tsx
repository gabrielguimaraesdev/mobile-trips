import { useEffect, useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  IconButton,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { createShortname } from "../utils";
import api from "../services";

type DataProps = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  travelers: {
    name: string;
    email: string;
  };
};

export default function UsersScreen({ navigation, route }: any) {
  const [data, setData] = useState<DataProps[]>([]);

  useEffect(() => {
    const initialData = async () => {
      try {
        const res: any = await api.get(`trips/${route.params?.id}`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    initialData();
  }, []);

  return (
    <>
      <Center>
        <IconButton
          variant="solid"
          onPress={() => navigation.navigate("TravelCoast")}
          icon={<Icon as={MaterialIcons} name="add" />}
          borderRadius="full"
        />
      </Center>
      <Box
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
        safeAreaTop
        w="100%"
      >
        <Heading p="4" pb="3">
          Equipe Viajante - {data[0]?.name}
        </Heading>
      </Box>
      <ListView data={data[0]?.travelers} />
    </>
  );
}

function ListView({ data }: any) {
  console.log("log data", data);

  const [listData, setListData] = useState(data);

  useEffect(() => {
    setListData(data);
  }, [data]);

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, rowKey: any) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item: any) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey: any) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item, index }: any) => (
    <Box>
      <Pressable
        onPress={() => console.log("You touched me", item)}
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
      >
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <Avatar
              size="48px"
              source={{
                // uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                uri: item.image,
              }}
            >
              {createShortname(item.name)}
            </Avatar>
            <VStack>
              <Text
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                bold
              >
                {item.name}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {item.email}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="xs"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              alignSelf="flex-start"
            >
              {item.timeStamp}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data: { item: { key: any } }, rowMap: any) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon
            as={<Entypo name="dots-three-horizontal" />}
            size="xs"
            color="coolGray.800"
          />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            More
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
  console.log("listData", listData);

  return (
    <Box bg="white">
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </Box>
  );
}
