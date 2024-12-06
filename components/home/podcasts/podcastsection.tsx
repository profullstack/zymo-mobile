import { View, Text, Pressable, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { LargePodcastCard } from "./largePodcastCard";
import { AntDesign } from "@expo/vector-icons";
import { FilterTabNav } from "./filterTabNav";
import { Colors } from "@/constants/Colors";
import { PodcastCard } from "./podcastcard";
import { getPodcast, setPodcastData } from "@/redux/slice/home-slice";
import { useDispatch, useSelector } from "react-redux";
import { SearchInput } from "@/components/input";

export const PodcastSection = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("All");
  const { podcasts_data, fetching_podcasts_data } = useSelector((state: any) => state.home);


  const handleUpdateSearch = (text: string) => {
    const payload = {
      search: text,
    }
    //@ts-ignore
    dispatch(getPodcast(payload));
  }

  const handleBlur = () => {
    dispatch(setPodcastData(null));
  }

  const ListLoader = () => (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: 200 
    }}>
      <ActivityIndicator 
        size="large" 
      />
    </View>
  );

  if (!podcasts_data) {
    return (
      <View style={{ 
        flex: 1, 
        alignItems: "center", 
        backgroundColor: Colors.backgroundColor 
      }}>
        <View style={{ marginVertical: 10 }}>
          <SearchInput 
            placeholder="Search for Podcasts" 
            updateSearch={handleUpdateSearch} 
            handleBlur={handleBlur} 
          />
        </View>
        {fetching_podcasts_data ? (
          <ActivityIndicator 
            size="large" 
          />
        ) : (
          <Text style={{ 
            fontSize: 18, 
            fontWeight: "bold", 
            color: "white" 
          }}>
            Search for Podcasts
          </Text>
        )}
      </View>
    );
  }

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
          <SearchInput 
            placeholder="Search for music" 
            updateSearch={handleUpdateSearch} 
            handleBlur={handleBlur} 
          />
        </View>
        <View style={{ flexDirection: "column", gap: 20 }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              color: "white",
              textAlign: "center",
            }}
          >
            Podcasts
          </Text>
          <FlashList
            data={podcasts_data}
            renderItem={({ item }:any) => <PodcastCard item={item} />}
            estimatedItemSize={200}
            ItemSeparatorComponent={() => <View style={{ width: 20, height: 20 }} />}
            ListEmptyComponent={fetching_podcasts_data ? ListLoader : null}
            refreshing={fetching_podcasts_data}
            onRefresh={() => {}}
          />
        </View>

        {/* <View style={{ flexDirection: "column", gap: 20 }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              color: "white",
            }}
          >
            Music
          </Text>
          <FlashList
            data={[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
              36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            ]}
            renderItem={({ item }) => <PodcastCard />}
            estimatedItemSize={200}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </View> */}

        {/* <View style={{ flexDirection: "column", gap: 20 }}>
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
            renderItem={({ item }) => <MusicCard />}
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
            renderItem={({ item }) => <MusicCard />}
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
            renderItem={({ item }) => <MusicCard />}
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
            renderItem={({ item }) => <MusicCard />}
            estimatedItemSize={200}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </View> */}
      </View>
    </ScrollView>
  );
};
