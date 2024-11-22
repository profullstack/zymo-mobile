import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { PodcastSection } from "@/components/home/podcasts/podcastsection";

const index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PodcastSection />
    </SafeAreaView>
  );
};

export default index;
