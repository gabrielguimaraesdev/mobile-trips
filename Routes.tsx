import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { MaterialIcons } from "@expo/vector-icons";
import { Icon, IconButton } from "native-base";

import SignUpScreen from "./screens/SignUp";
import HomeScreen from "./screens/Home";
import TravelsScreen from "./screens/Travels";
import UsersScreen from "./screens/Users";
import { TravelCoastScreen } from "./screens/TravelCoast";
import TravelFormScreen from "./screens/TravelForm";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function PrincipalNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Travels">
      <Drawer.Screen
        name="TravelsNavigator"
        component={TravelsNavigator}
        options={({ navigation }) => ({
          headerRight: () => {
            return (
              <IconButton
                onPress={() => navigation.navigate("Home")}
                icon={<Icon as={MaterialIcons} name="logout" />}
                borderRadius="full"
              />
            );
          },
        })}
      />
    </Drawer.Navigator>
  );
}

function TravelsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Travels"
        component={TravelsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Users" component={UsersScreen} />
      <Stack.Screen name="TravelCoast" component={TravelCoastScreen} />
      <Stack.Screen name="TravelForm" component={TravelFormScreen} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen
          name="StackComponent"
          component={PrincipalNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
