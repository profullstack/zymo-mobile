import { Image } from "expo-image";
import { Text, View } from "react-native";

export const LargeMusicCard = () => {
  return (
    <View>
      <View
        style={{
          backgroundColor: "#202020",
          width: 325.11,
          height: 450.5,
          borderRadius: 10,
          borderWidth:1,
          borderColor:"white",
          padding: 20,
          flexDirection: "column",
          // // justifyContent: "center",
          // alignItems: "center",
          gap: 20,
        }}
      >
        <View
          style={{
            flex: 0,
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ height: 230, width: 230 }}
            contentFit="contain"
            source={require("@/assets/images/mv.png")}
          />
        </View>
        <View style={{flexDirection: "column", gap: 10}}>

        <Text
          style={{
            fontWeight: "700",
            fontSize: 25,
            // lineHeight: 29.62,
            color: "white",
            textAlign: "center",
          }}
        >
          Star Wars
        </Text>
        <Text
          style={{
            fontWeight: "400",
            fontSize: 22,
            // lineHeight: 26.66,
            color: "white",
            textAlign: "center",
          }}
        >
          Fantasy, Action, Dram
        </Text>
        <Text
          style={{
            fontWeight: "300",
            fontSize: 13,
            // lineHeight: 26.66,
            color: "white",
            textAlign: "center",
          }}
        >
         15K Views .1 week ago
        </Text>
        </View>

      </View>
    </View>
  );
};
