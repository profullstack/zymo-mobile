import { View, Text, Pressable } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { LiveTvCard } from "./livetvcard";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

export const LiveTvSection = () => {
  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontWeight: "700",
          fontSize: 30,
          lineHeight: 44.43,
          color: "white",
          marginBottom: 20,
        }}
      >
      Live Tv
      </Text>

      <FlashList
        data={[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
          38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        ]}
        renderItem={({ item }) => <LiveTvCard />}
        estimatedItemSize={200}
        horizontal
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
      />

<Pressable style={{ flexDirection: "row", alignItems: "center",gap:7}} onPress={() => {
        router.push("/liveStreams")
      }}>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 44.43,
            color: "white",
          }}
        >
          SEE ALL
        </Text>
        <AntDesign name="right" size={24} color="white" />
      </Pressable>
    </View>
  );
};
