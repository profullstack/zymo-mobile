import { useEvent ,useEventListener} from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Button, Text, ActivityIndicator } from "react-native";
import { useState, useRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LiveStreamPlayer = () => {
interface LiveStream {
  url: string;
  // add other properties if needed
}

const [liveStream, setLiveStream] = useState<LiveStream>({ url: "" });
const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLiveStream = async () => {
      const storedLiveStream = await AsyncStorage.getItem("liveStreamToPlay");
      if (storedLiveStream) setLiveStream(JSON.parse(storedLiveStream));
    };
    fetchLiveStream();
  }, []);


  const player = useVideoPlayer(liveStream?.url, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  useEventListener(player, 'statusChange', ({ status, error }) => {
    if (status === 'loading'){
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    console.log('Player status changed: ', status);
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls
        contentFit="contain"
        
      />
       {isLoading && (
        <ActivityIndicator
          size="large"
          color="white"
          style={styles.loader}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    padding: 0,
    alignItems: "center",
    paddingHorizontal: 0,
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 10,
  },
  controlsContainer: {
    // padding: 10,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
});
