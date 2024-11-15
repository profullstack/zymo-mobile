import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Drawer } from "expo-router/drawer";

const DrawerLayout = () => {
  return (
    <>
      <StatusBar backgroundColor="#ffffff" />
      <Drawer>
        <Drawer.Screen
          name="dashboard" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "Home",
          }}
        />
      </Drawer>
    </>
  );
};

export default DrawerLayout;
