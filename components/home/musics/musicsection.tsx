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
    const groupedMusicData: { [artist: string]: { [album: string]: any[] } } = {};
  
    Object.keys(musicData).forEach(albumKey => {
      const albumData = musicData[albumKey];
      
      // Ensure the artist exists in the grouped data
      if (!groupedMusicData[albumKey]) {
        groupedMusicData[albumKey] = {};
      }
      
      Object.keys(albumData).forEach(cdKey => {
        // Ensure the album exists for this artist
        if (!groupedMusicData[albumKey][cdKey]) {
          groupedMusicData[albumKey][cdKey] = [];
        }
        
        // Add songs to the specific album for this artist
        const cdItems = albumData[cdKey];
        cdItems.forEach((item: any) => {
          groupedMusicData[albumKey][cdKey].push({
            ...item,
            artist: albumKey,
            album: cdKey
          });
        });
      });
    });
  
    return groupedMusicData;
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
              textAlign: "center",
            }}
          >
            Music
          </Text>
          {Object.entries(processedData).map(([artist, albums]) => (
            <View key={artist}>
              <Text style={{ 
                color: 'white', 
                fontSize: 18, 
                fontWeight: 'bold', 
                marginBottom: 10 
              }}>
                {artist}
              </Text>
              {Object.entries(albums).map(([album, songs]) => (
                <View key={album} style={{ marginBottom: 20 }}>
                  <Text style={{ 
                    color: 'white', 
                    fontSize: 16, 
                    marginBottom: 10 
                  }}>
                    {album}
                  </Text>
                  <FlashList
                    horizontal
                    data={songs}
                    renderItem={({ item }:any) => <MusicCard item={item} />}
                    estimatedItemSize={200}
                    ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                    ListEmptyComponent={fetching_musics_data ? ListLoader : null}
                    refreshing={fetching_musics_data}
                    onRefresh={() => {}}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};