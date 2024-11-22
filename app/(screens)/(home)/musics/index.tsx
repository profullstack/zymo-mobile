import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { MusicSection } from "@/components/home/musics/musicsection";

const index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MusicSection />
    </SafeAreaView>
  );
};

export default index;
