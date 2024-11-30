import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { SingleMusic } from "@/components/home/musics/singlemusic";

const singlemusic = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SingleMusic />
    </SafeAreaView>
  );
};

export default singlemusic;
