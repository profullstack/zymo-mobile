import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Button, Text } from "react-native";

export const MoviePlayer = () => {
  const videoSource =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
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

    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 0,
    alignItems: "center",
    paddingHorizontal: 0,
  },
  video: {
    width: '100%',
    aspectRatio: 16/9,
  },
  controlsContainer: {
    // padding: 10,
  },
});
