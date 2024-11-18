import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { HomeScreen } from "@/components/home/dashboard/homescreen";

const index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen/>
    </SafeAreaView>
  );
};

export default index;
