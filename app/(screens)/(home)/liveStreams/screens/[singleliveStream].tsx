import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { SingleLiveStream } from "@/components/home/livestreams/singleLivestream";

const singleliveStream = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SingleLiveStream />
    </SafeAreaView>
  );
};

export default singleliveStream;
