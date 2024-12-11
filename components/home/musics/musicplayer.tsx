import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState, useRef, useEffect } from "react";
import { ScrollView, StyleSheet, Pressable, Text, View ,Alert} from "react-native";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

export const MusicPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [music, setMusic] = useState<any>(null);
  const [isRepeating, setIsRepeating] = useState(false);

  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const fetchMusic = async () => {
      const storedMusic = await AsyncStorage.getItem("musicToPlay");
      if (storedMusic) setMusic(JSON.parse(storedMusic));
    };
    fetchMusic();
  }, []);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const onPlaybackStatusUpdate = (status: any) => {
    console.log("first", status)
    if (status.isLoaded && status.isPlaying) {
      setProgress(status.positionMillis / status.durationMillis);
      setCurrentTime(status.positionMillis);
      setTotalDuration(status.durationMillis? status.durationMillis : 0);
    }

    if (status.didJustFinish) {
      if (isRepeating) {
        soundRef.current?.replayAsync();
      } else {
        resetPlayer();
      }
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

  function getProxyUrl(song: { user: any; pass: any; url: any }) {
    if (song.user && song.pass) {
      return `https://zymo.tv/proxy?user=${song.user}&pass=${
        song.pass
      }&url=${encodeURIComponent(song.url)}`;
    }
    return song.url;
  }

  const handlePlayPause = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      if (isPlaying) {
        await soundRef.current?.pauseAsync();
        setIsPlaying(false);
      } else {
        if (!soundRef.current) {
          const audioUrl = getProxyUrl(music);
          console.log(audioUrl, "audioUrl");
          const { sound } = await Audio.Sound.createAsync(
            {
              uri: audioUrl,
            },
            { shouldPlay: true },
            onPlaybackStatusUpdate
          );
          soundRef.current = sound;
          setSound(sound);
        } else {
          await soundRef.current.playFromPositionAsync(currentTime);
        }
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error in play/pause:", error);
    }
  };

  const handleSkipBack = async () => {
    if (soundRef.current) {
      const newPosition = Math.max(currentTime - 10000, 0); // Skip back 10 seconds
      await soundRef.current.setPositionAsync(newPosition);
    }
  };

  const handleSkipForward = async () => {
    if (soundRef.current) {
      const newPosition = Math.min(currentTime + 10000, totalDuration); // Skip forward 10 seconds
      await soundRef.current.setPositionAsync(newPosition);
    }
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image
          source={
            music?.musicbrainz?.coverArt || require("@/assets/images/music.svg")
          }
          style={styles.image}
          contentFit="contain"
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.songTitle}>
          {music?.songname?.replace(/^(\d+)\s*\[.*?\]\s*/, "") ||
            "Unknown Song"}
        </Text>
        <Text style={styles.artistAlbum}>{`${
          music?.artist || "Unknown Artist"
        } - ${music?.album || "Unknown Album"}`}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <Pressable onPress={handleSkipBack}>
          <Ionicons name="play-skip-back" size={25} color="white" />
        </Pressable>
        <Pressable onPress={handlePlayPause}>
          {isPlaying ? (
            <AntDesign name="pausecircle" size={45} color="white" />
          ) : (
            <Entypo name="controller-play" size={45} color="white" />
          )}
        </Pressable>
        <Pressable onPress={handleSkipForward}>
          <Ionicons name="play-skip-forward" size={25} color="white" />
        </Pressable>
        <Pressable onPress={toggleRepeat}>
          <Feather
            name="repeat"
            size={25}
            color={isRepeating ? "#03C03C" : "white"}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: "100%",
    backgroundColor: "#141414",
  },
  imageContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
  },
  image: { height: 200, width: 200 },
  detailsContainer: { paddingHorizontal: 20 },
  songTitle: { fontSize: 16, fontWeight: "700", color: "white" },
  artistAlbum: { fontSize: 12, fontWeight: "400", color: "white" },
  progressContainer: { paddingHorizontal: 20, marginTop: 25 },
  progressBarBackground: {
    height: 3,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "white",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  timeText: { fontSize: 15, color: "white" },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 25,
  },
});
