import { Image } from "expo-image";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const LiveTvCard = ({ item }: any) => {
  console.log("item", item);
  const handlePress = async () => {
    await AsyncStorage.setItem("liveStreamToPlay", JSON.stringify(item));
    router.push(`/(screens)/(home)/liveStreams/screens/${JSON.stringify(item?.id)}`);
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        marginVertical: 30,
      }}
    >
      <FontAwesome5 name="play-circle" size={20} color={Colors?.primaryColor} />
      <Text style={{ color: "white", fontSize: 18, maxWidth: 280 }}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );
};
