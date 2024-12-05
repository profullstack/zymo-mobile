import React from 'react';
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MusicItem {
  songname: string;
  artist: string;
  album: string;
  url?: string;
  id?: string;
  musicbrainz?: {
    name?: string;
    disambiguation?: string;
    coverArt?: string;
  };
}

interface MusicCardProps {
  item: MusicItem;
}

export const MusicCard: React.FC<MusicCardProps> = ({ item }) => {
  console.log("item", item?.url);
  const handlePress = async () => {
    await AsyncStorage.setItem("musicToPlay", JSON.stringify(item));
    router.push(`/(screens)/(home)/musics/screens/${item?.id}`);
  };

  // Extract song name, removing any numbering or artist prefixes
  const cleanSongName = item.songname.replace(/^\(\d+\)\s*\[.*?\]\s*/, '');
  
  // Extract artist name, defaulting to the album if no specific artist
  const artistName = item.artist || 'Unknown Artist';

  return (
    <Pressable onPress={handlePress}>
      <View
        style={{
          backgroundColor: "#202020",
          width: "100%",
          height: 297.5,
          borderRadius: 10,
          marginBottom: 10,
          
        }}
      >
        <View>
          <Image
            style={{
              height: 184,
              width: "100%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={item?.musicbrainz?.coverArt ? item?.musicbrainz?.coverArt : require("@/assets/images/music.svg")} // Consider dynamic image source if available
          />
        </View>
        <View style={{
          flexDirection: "row", 
          gap: 20, 
          alignItems: "center",
          paddingHorizontal: 15,
          paddingTop: 10
        }}>
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 50,
            }}
            source={item?.musicbrainz?.coverArt ? item?.musicbrainz?.coverArt : require("@/assets/images/music.svg")}  // Consider dynamic image source if available
          />
          <View style={{ flexDirection: "column", gap: 5 }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 13,
                color: "white",
                textAlign: "left",
                maxWidth: 240,
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {cleanSongName}
            </Text>
            <Text
              style={{
                fontWeight: "200",
                fontSize: 13,
                color: "white",
                maxWidth: 240,
              }}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {artistName} - {item.album}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};