import { Stack } from "expo-router";
import { Pressable, StatusBar, Text, View } from "react-native";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "@/components/customDrawerContent";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

const DrawerLayout = () => {
  return (
    <>
      <StatusBar backgroundColor="#ffffff" />
      <Drawer
        screenOptions={({ navigation }) => ({
          drawerStyle: {
            borderRightWidth: 0.2,
            borderColor: "#ffffff",
          },
          // Add custom header left (drawer toggle) button hamburger.svg
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 16 }}
            >
              {/* <MaterialIcons name="menu" size={24} color="#ffffff" /> */}
              <Image
                style={{ height: 20, width: 20 }}
                contentFit="contain"
                source={require("@/assets/images/hamburger.svg")}
              />
            </Pressable>
          ),
        })}
        drawerContent={CustomDrawerContent}
      >
        <Drawer.Screen
          name="home" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            // headerShown: false,
            title: "Home",
            headerBackground(props) {
              return (
                <View
                  style={{
                    backgroundColor: Colors.backgroundColor,
                    width: "100%",
                    height: "100%",
                    borderBottomWidth: 0.2,
                    borderColor: "#ffffff",
                  }}
                />
              );
            },
            headerTitleStyle: {
              color: "#ffffff",
            },
            drawerLabelStyle: {
              color: "#ffffff",
            },
            drawerIcon(props) {
              return (
                <>
                <Image
                style={{ height: 24, width: 24 }}
                contentFit="contain"
                source={require("@/assets/images/home.svg")}
              />
                </>
              );
            },
          }}
        />
        <Drawer.Screen
          name="liveStreams" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Live Tv",
            title: "Live Tv",
            headerBackground(props) {
              return (
                <View
                  style={{
                    backgroundColor: Colors.backgroundColor,
                    width: "100%",
                    height: "100%",
                    borderBottomWidth: 0.2,
                    borderColor: "#ffffff",
                  }}
                />
              );
            },
            headerTitleStyle: {
              color: "#ffffff",
            },
            drawerLabelStyle: {
              color: "#ffffff",
            },
            drawerIcon(props) {
              return (
                <>
                <Image
                style={{ height: 24, width: 24 }}
                contentFit="contain"
                source={require("@/assets/images/livetv.svg")}
              />
                </>
              );
            },
          }}
        />
        <Drawer.Screen
          name="books" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Books",
            title: "Books",
            headerBackground(props) {
              return (
                <View
                  style={{
                    backgroundColor: Colors.backgroundColor,
                    width: "100%",
                    height: "100%",
                    borderBottomWidth: 0.2,
                    borderColor: "#ffffff",
                  }}
                />
              );
            },
            headerTitleStyle: {
              color: "#ffffff",
            },
            drawerLabelStyle: {
              color: "#ffffff",
            },
            drawerIcon(props) {
              return (
                <>
                <Image
                style={{ height: 24, width: 24 }}
                contentFit="contain"
                source={require("@/assets/images/books.svg")}
              />
                </>
              );
            },
          }}
        />
        <Drawer.Screen
          name="musics" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Music",
            title: "Music",
            headerBackground(props) {
              return (
                <View
                  style={{
                    backgroundColor: Colors.backgroundColor,
                    width: "100%",
                    height: "100%",
                    borderBottomWidth: 0.2,
                    borderColor: "#ffffff",
                  }}
                />
              );
            },
            headerTitleStyle: {
              color: "#ffffff",
            },
            drawerLabelStyle: {
              color: "#ffffff",
            },
            drawerIcon(props) {
              return (
                <>
                <Image
                style={{ height: 24, width: 24 }}
                contentFit="contain"
                source={require("@/assets/images/music.svg")}
              />
                </>
              );
            },
          }}
        />
        <Drawer.Screen
          name="movies" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Movies",
            title: "Movies",
            headerBackground(props) {
              return (
                <View
                  style={{
                    backgroundColor: Colors.backgroundColor,
                    width: "100%",
                    height: "100%",
                    borderBottomWidth: 0.2,
                    borderColor: "#ffffff",
                  }}
                />
              );
            },
            headerTitleStyle: {
              color: "#ffffff",
            },
            drawerLabelStyle: {
              color: "#ffffff",
            },
            drawerIcon(props) {
              return (
                <>
                <Image
                style={{ height: 24, width: 24 }}
                contentFit="contain"
                source={require("@/assets/images/movies.svg")}
              />
                </>
              );
            },
          }}
        />
        <Drawer.Screen
          name="podcasts" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Podcasts",
            title: "Podcasts",
            headerBackground(props) {
              return (
                <View
                  style={{
                    backgroundColor: Colors.backgroundColor,
                    width: "100%",
                    height: "100%",
                    borderBottomWidth: 0.2,
                    borderColor: "#ffffff",
                  }}
                />
              );
            },
            headerTitleStyle: {
              color: "#ffffff",
            },
            drawerLabelStyle: {
              color: "#ffffff",
            },
            drawerIcon(props) {
              return (
                <>
                <Image
                style={{ height: 24, width: 24 }}
                contentFit="contain"
                source={require("@/assets/images/podcasts.svg")}
              />
                </>
              );
            },
          }}
        />
      </Drawer>
    </>
  );
};

export default DrawerLayout;
