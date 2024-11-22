import { Image } from "expo-image";
import { Text, View } from "react-native";

export const PodcastCard = () => {
  return (
    <View>
      <View
        style={{
          backgroundColor: "#202020",
          width: 310.11,
          height: 277.5,
          borderRadius: 10,
          flexDirection: "column",
          // // justifyContent: "center",
          // alignItems: "center",
          gap: 20,
        }}
      >
        <View
          style={
            {
              // flex: 0,
              // flexDirection: "column",
              // // justifyContent: "center",
              // alignItems: "center",
            }
          }
        >
          <Image
            style={{
              height: 184,
              width: "100%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            // contentFit="contain"
            source={require("@/assets/images/mv.png")}
          />
        </View>
        <View style={{flexDirection: "row", gap: 20, alignItems: "center",paddingHorizontal:15 }}>
        <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 50,
            }}
            // contentFit="contain"
            source={require("@/assets/images/mv.png")}
          />
          <View style={{ flexDirection: "column", gap: 10 ,padding:5}}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 13,
                color: "white",
                textAlign: "left",
              }}
            >
              Star Wars
            </Text>
            <Text
              style={{
                fontWeight: "200",
                fontSize: 13,
                color: "white",
              }}
            >
              Fantasy, Action, Dram
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
