import { router, Stack } from "expo-router";
import { Pressable, StatusBar, Text, View } from "react-native";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "@/components/customDrawerContent";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useDispatch, useSelector } from "react-redux";
import { setMusicData } from "@/redux/slice/home-slice";
import CaretLeft from "phosphor-react-native/src/icons/CaretLeft";

const DrawerLayout = () => {
  const dispatch = useDispatch();
  return (
    <>
      <StatusBar backgroundColor="#ffffff" />
      <Drawer
        screenOptions={({ navigation }) => ({
          drawerStyle: {
            borderRightWidth: 0.2,
            borderColor: "#ffffff",
          },
          //i dont want to show the default drawer headerleft icon
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 14,marginTop:-23 }}>
              <CaretLeft size={24} color="white" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{ marginRight: 16 }}
          >
            {/* <MaterialIcons name="menu" size={24} color="#ffffff" /> */}
            <Image
              style={{ height: 20, width: 20 }}
              contentFit="contain"
              source={require("@/assets/images/hamburger.svg")}
            />
          </Pressable>
          )
        })}
        drawerContent={CustomDrawerContent}
      >
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
        {/* <Drawer.Screen
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
        /> */}
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
