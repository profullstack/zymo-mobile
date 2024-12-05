import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState, useRef, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Pressable, Text, View } from "react-native";
import { Audio } from "expo-av";
import { MusicCard } from "./musiccard";
import { FlashList } from "@shopify/flash-list";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MusicPlayer = () => {
  const { musics_data, fetching_musics_data } = useSelector((state: any) => state.home);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [music, setMusic] = useState<any>(null);

  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const fetchMusic = async () => {
      const music = await AsyncStorage.getItem("musicToPlay");
      if (music) {
        setMusic(JSON.parse(music));
      }
    }

    fetchMusic();
  }, []);

  const circleSize = 12;
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const onPlaybackStatusUpdate = async (status: any) => {
    if (status.isLoaded && status.isPlaying) {
      const progressPercentage = status.positionMillis / status.durationMillis;
      setProgress(progressPercentage);
      setCurrentTime(status.positionMillis);
      setTotalDuration(status.durationMillis);
    }
  
    if (status.didJustFinish === true) {
      // Reset player when song ends
      await resetPlayer();
    }
  };

  const resetPlayer = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
    }
    setSound(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setProgress(0);
    soundRef.current = null;
  };

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        // Pause the current sound
        if (soundRef.current) {
          await soundRef.current.pauseAsync();
          setIsPlaying(false);
        }
      } else {
        if (!soundRef.current) {
          // Load and play new sound
          const { sound, status } = await Audio.Sound.createAsync(
            {
              uri: music?.url,
            },
            {
              shouldPlay: true,
              isLooping: false,
            },
            onPlaybackStatusUpdate
          );
          
          soundRef.current = sound;
          setSound(sound);
        } else {
          // Resume from paused position
          await soundRef.current.playFromPositionAsync(currentTime);
        }
        
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error in play/pause:", error);
    }
  };

  // Clean up sound when component unmounts
  useEffect(() => {
    return () => {
      const unloadSound = async () => {
        if (soundRef.current) {
          await soundRef.current.unloadAsync();
        }
      };
      unloadSound();
    };
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 0, height: "100%", backgroundColor: "#141414" }}>
      {/* Rest of the UI remains the same as in the original code */}
      <View
        style={{
          padding: 20,
          borderWidth: 1,
          borderColor: "#141414",
          borderRadius: 8,
          width: "100%",
          height: 389,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={music?.musicbrainz?.coverArt ? music?.musicbrainz?.coverArt : require("@/assets/images/music.svg")}
          style={{ height: 200, width: 200 }}
          contentFit="contain"
        />
      </View>

      <View style={{ paddingHorizontal:20 }}>
        <Text style={{ fontWeight: "700", fontSize: 16, color: "white" }}>{music?.songname.replace(/^\(\d+\)\s*\[.*?\]\s*/, '')}</Text>
        <Text style={{ fontWeight: "400", fontSize: 12, color: "white" }}>
         {music?.artist || 'Unknown Artist'} - {music?.album}
        </Text>
      </View>

      <View style={{ marginTop: 10 ,paddingHorizontal:20 }}>
        <View
          style={{
            width: "100%",
            marginTop: 10,
            height: 3,
            backgroundColor: "gray",
            borderRadius: 5,
          }}
        >
          <View
            style={[styles.progressbar, { width: `${progress * 100}%` }]}
          />
          <View
            style={[
              {
                position: "absolute",
                top: -5,
                width: circleSize,
                height: circleSize,
                borderRadius: circleSize / 2,
                backgroundColor: "white",
              },
              {
                left: `${progress * 100}%`,
                marginLeft: -circleSize / 2,
              },
            ]}
          />
        </View>
        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>
            {formatTime(currentTime)}
          </Text>

          <Text style={{ color: "white", fontSize: 15 }}>
            {formatTime(totalDuration)}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 17,
          paddingHorizontal:20

        }}
      >
        <Pressable>
          <FontAwesome name="arrows" size={30} color="#03C03C" />
        </Pressable>
        <Pressable>
          <Ionicons name="play-skip-back" size={30} color="white" />
        </Pressable>
        <Pressable onPress={handlePlayPause}>
          {isPlaying ? (
            <AntDesign name="pausecircle" size={60} color="white" />
          ) : (
            <Pressable
              onPress={handlePlayPause}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Entypo name="controller-play" size={26} color="black" />
            </Pressable>
          )}
        </Pressable>
        <Pressable>
          <Ionicons name="play-skip-forward" size={30} color="white" />
        </Pressable>
        <Pressable>
          <Feather name="repeat" size={30} color="#03C03C" />
        </Pressable>
      </View>

      {/* <View style={{ marginTop: 10 ,paddingHorizontal:20,flexDirection: "column", gap: 20  }}>
        <Text style={{ fontWeight: "700", fontSize: 16, color: "white" }}>Next in queue</Text>

        <FlashList
            data={[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
            ]}
            renderItem={({ item }) => <MusicCard />}
            estimatedItemSize={200}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  progressbar: {
    height: "100%",
    backgroundColor: "white",
  },
});