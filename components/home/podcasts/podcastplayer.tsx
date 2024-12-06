import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState, useRef, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Pressable, Text, View } from "react-native";
import { Audio } from "expo-av";
import {} from "./podcastcard";
import { FlashList } from "@shopify/flash-list";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PodcastPlayer = () => {
  const { podcasts_data, fetching_podcasts_data } = useSelector(
    (state: any) => state.home
  );
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [podcast, setPodcast] = useState<any>(null);
  interface Episode {
    audioUrl: string;
    title: string;
  }
  
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [urlPlaying, setUrlPlaying] = useState("");
  const [currentEpisode, setCurrentEpisode] = useState(null);

  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const fetchMusic = async () => {
      const data = await AsyncStorage.getItem("episodes");
      if (data) {
        setEpisodes(JSON.parse(data));
      }
    };

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

  const handlePlayPause = async (audioUrl: any) => {
    setUrlPlaying(audioUrl)
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
              uri:audioUrl,
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

  const togglePlayback = async (audioUrl:any) => {
    setUrlPlaying(audioUrl)
    try {
      if (sound && currentEpisode === audioUrl) {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
      } else {
        if (sound) {
          await sound.unloadAsync(); // Stop the previous sound
        }
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);
        setCurrentEpisode(audioUrl);
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  // const playAudio = async (audioUrl: any) => {
  //   try {
  //     if (sound) {
  //       await sound.unloadAsync(); // Stop the previous sound
  //     }
  //     const { sound: newSound } = await Audio.Sound.createAsync(
  //       { uri: audioUrl },
  //       { shouldPlay: true }
  //     );
  //     setSound(newSound);
  //   } catch (error) {
  //     console.error("Error playing audio:", error);
  //   }
  // };

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
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Podcast Episodes</Text>
        <FlatList
          data={episodes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.episodeItem}
              // onPress={() => playAudio(item.audioUrl)}
            >
              <Pressable onPress={() => togglePlayback(item.audioUrl)}>
                {isPlaying && urlPlaying === item.audioUrl ? (
                  <AntDesign name="pausecircle" size={60} color="white" />
                ) : (
                  <Pressable
                    onPress={() => togglePlayback(item.audioUrl)}
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
              <Text style={styles.episodeTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          // estimatedItemSize={200}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  progressbar: {
    height: "100%",
    backgroundColor: "white",
  },
  container: {
    flex: 0,
    padding: 16,
    backgroundColor: "black",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  episodeItem: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#4ca1af",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection:"row",
    alignItems:"center",
    gap:15
  },
  episodeTitle: {
    fontSize: 16,
    color: "white",
    maxWidth:200
  },
});
