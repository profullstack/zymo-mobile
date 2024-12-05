import { View, Text, Pressable, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { MusicCard } from "./musiccard";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { SearchInput } from "@/components/input";
import { getMusic, setMusicData } from "@/redux/slice/home-slice";
import { useDispatch, useSelector } from "react-redux";

export const MusicSection = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("All");

  const { musics_data, fetching_musics_data } = useSelector((state: any) => state.home);

  const handleUpdateSearch = (text: string) => {
    const payload = {
      search: text,
    }
    //@ts-ignore
    dispatch(getMusic(payload));
  }

  const handleBlur = () => {
    dispatch(setMusicData(null));
  }

  const transformMusicData = (musicData: any) => {
    const flattenedItems: any = [];
  
    Object.keys(musicData).forEach(albumKey => {
      const albumData = musicData[albumKey];
      
      Object.keys(albumData).forEach(cdKey => {
        const cdItems = albumData[cdKey];
        
        cdItems.forEach((item: any) => {
          flattenedItems.push({
            ...item,
            artist: albumKey,
            album: cdKey
          });
        });
      });
    });
  
    return flattenedItems;
  };

  // Loader component for FlashList
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

  if (!musics_data) {
    return (
      <View style={{ 
        flex: 1, 
        alignItems: "center", 
        backgroundColor: Colors.backgroundColor 
      }}>
        <View style={{ marginVertical: 10 }}>
          <SearchInput 
            placeholder="Search for music" 
            updateSearch={handleUpdateSearch} 
            handleBlur={handleBlur} 
          />
        </View>
        {fetching_musics_data ? (
          <ActivityIndicator 
            size="large" 
          />
        ) : (
          <Text style={{ 
            fontSize: 18, 
            fontWeight: "bold", 
            color: "white" 
          }}>
            Search for music
          </Text>
        )}
      </View>
    );
  }

  const processedData = transformMusicData(musics_data);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        flexDirection: "column",
        gap: 30,   
      }}
    >
      <View style={{ flexDirection: "column", gap: 30, padding: 20 }}>
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
            }}
          >
            Music
          </Text>
          <FlashList
            data={processedData}
            renderItem={({ item }:any) => <MusicCard item={item} />}
            estimatedItemSize={200}
            ItemSeparatorComponent={() => <View style={{ width: 20, height: 20 }} />}
            ListEmptyComponent={fetching_musics_data ? ListLoader : null}
            refreshing={fetching_musics_data}
            onRefresh={() => {}}
          />
        </View>
      </View>
    </ScrollView>
  );
};