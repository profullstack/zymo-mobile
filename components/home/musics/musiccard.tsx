import React from 'react';
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
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