import { View } from "react-native";
import { LiveStreamPlayer } from "./livestreamplayer";

export const SingleLiveStream = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
     <LiveStreamPlayer />
    </View>
  );
};
