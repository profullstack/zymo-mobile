import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { LiveTvCard } from "./livetvcard";
import { AntDesign } from "@expo/vector-icons";
import { FilterTabNav } from "./filterTabNav";
import { Colors } from "@/constants/Colors";
import { LargeLiveTvCard } from "./largeLiveTvCard";

export const LiveTvSection = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        flexDirection: "column",
        gap: 30,
     
      }}
    >
      <View style={{ flexDirection: "column", gap: 30 ,   padding:20,}}>
        <View style={{ marginVertical: 10 }}>
          <FilterTabNav
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
          />
        </View>

        <View>
          <FlashList
            data={[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
              36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            ]}
            renderItem={({ item }) => <LargeLiveTvCard />}
            estimatedItemSize={200}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </View>

        <View style={{ flexDirection: "column", gap: 20 }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              color: "white",
            }}
          >
            Action
          </Text>
          <FlashList
            data={[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
              36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            ]}
            renderItem={({ item }) => <LiveTvCard />}
            estimatedItemSize={200}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </View>

        <View style={{ flexDirection: "column", gap: 20 }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              color: "white",
            }}
          >
            Fantasy
          </Text>
          <FlashList
            data={[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
              36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            ]}
            renderItem={({ item }) => <LiveTvCard />}
            estimatedItemSize={200}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </View>


        <View style={{ flexDirection: "column", gap: 20 }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              color: "white",
            }}
          >
            Adeventure
          </Text>
          <FlashList
            data={[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
              36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            ]}
            renderItem={({ item }) => <LiveTvCard />}
            estimatedItemSize={200}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </View>


        <View style={{ flexDirection: "column", gap: 20 }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              color: "white",
            }}
          >
            Drama
          </Text>
          <FlashList
            data={[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
              36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            ]}
            renderItem={({ item }) => <LiveTvCard />}
            estimatedItemSize={200}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </View>

        <View style={{ flexDirection: "column", gap: 20 }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              color: "white",
            }}
          >
            Mystery
          </Text>
          <FlashList
            data={[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
              36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            ]}
            renderItem={({ item }) => <LiveTvCard />}
            estimatedItemSize={200}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </View>
      </View>
    </ScrollView>
  );
};
