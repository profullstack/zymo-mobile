import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar, useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Colors } from "@/constants/Colors";

const CustomLayout = ({ children }: any) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.backgroundColor} />
      {children}
    </>
  );
};

const InitialLayout = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundColor} />

      <Stack>
        <Stack.Screen
          name="(screens)/(auth)/login"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(screens)/(home)"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
};

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <CustomLayout>
          <InitialLayout />
        </CustomLayout>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
