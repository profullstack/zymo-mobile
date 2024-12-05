import { router, Stack } from "expo-router";
import CaretLeft from "phosphor-react-native/src/bold/CaretLeft";
import { Pressable } from "react-native";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="screens/[singlemusic]"
        options={{
          headerShown: false,

        }}
      />
    </Stack>
  );
};

export default Layout;
