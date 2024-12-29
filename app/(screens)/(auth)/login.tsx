import { View, Text } from "react-native";
import React from "react";
import { LoginScreen } from "@/components/auth/login";

const login = () => {
  return (
    <View style={{ flex: 1 }}>
      <LoginScreen/>
    </View>
  );
};

export default login;
