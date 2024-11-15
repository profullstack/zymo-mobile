import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { router, Stack, } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar, useColorScheme } from "react-native";


const CustomLayout = ({ children }: any) => {
  return (
    <>
      <StatusBar backgroundColor="#ffffff" />
      {children}
    </>
  );
};

const InitialLayout = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Stack>
        <Stack.Screen
          name="(screens)/(auth)/login"
          options={{ headerShown: false }}
        />
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
        <CustomLayout>
          <InitialLayout />
        </CustomLayout>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
