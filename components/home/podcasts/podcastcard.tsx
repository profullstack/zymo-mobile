import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Image } from "expo-image";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
//@ts-ignore
import { parseString } from "react-native-xml2js";
import * as RSSParser from "react-native-rss-parser";
import { router } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import { UIActivityIndicator } from "react-native-indicators";
import { useState } from "react";

type Podcast = {
  title: string;
  audioUrl: string;
  pubDate: string;
};

export const PodcastCard = (item: any) => {
  console.log("item", item);
  const [loading, setLoading] = useState(false);

  const handlePress = async (item: any) => {
    console.log("12");
    setLoading(true);
    console.log("1");
    const response = await fetch(item?.item.url);
    console.log("1");
    const text = await response.text();
    console.log("2");
    const parsed = await RSSParser.parse(text);
    console.log("3");
    const episodeData = parsed.items.map(
      (item: { title: any; enclosures: { url: any }[] }) => ({
        title: item.title,
        audioUrl: item.enclosures[0]?.url,
      })
    );

    console.log(episodeData, "episodeData");
    AsyncStorage.setItem("episodes", JSON.stringify(episodeData));
    router.push(`/(screens)/(home)/podcasts/screens/${item?.item.id}`);
    setLoading(false);
    // try {
    //   const response = await axios.get(item?.item.url);
    //   console.log("response", response);
    // } catch (error) {
    //   console.log("error", error);
    // }

    // parseString(response.data, (err: any, result: { rss: { channel: { item: any; }[]; }; }) => {
    //   console.log("3")
    //   if (err) {
    //     console.error('Error parsing XML:', err);
    //     console.log("4")
    //     return;
    //   }
    //   console.log("2")
    //   // Extract episodes from the parsed RSS feed
    //   const channelItems = result.rss.channel[0].item || [];
    //   console.log(JSON.stringify(channelItems),"channelItems")
    //   const podcastData = {
    //     title: channelItems?.title[0],
    //     audioUrl: channelItems?.enclosure[0]['$'].url,
    //     pubDate: channelItems?.pubDate[0]
    //   };

    //   console.log(podcastData,"podcastData");
    //   AsyncStorage.setItem("podcastToPlay", JSON.stringify(podcastData));

    // });
  };

  return (
    <Pressable onPress={() => handlePress(item)}>
      <Spinner
        size={"large"}
        overlayColor="rgba(0, 0, 0, 0.5)"
        visible={loading}
        customIndicator={<ActivityIndicator color="white" size="large" />}
      />
      <View
        style={{
          backgroundColor: "#202020",
          width: "100%",
          height: 337.5,
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
            contentFit="fill"
            source={
              item?.item?.image
                ? item?.item?.image
                : require("@/assets/images/podcasts.svg")
            }
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            paddingHorizontal: 15,
          }}
        >
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 50,
            }}
            // contentFit="contain"
            source={
              item?.item?.image
                ? item?.item?.image
                : require("@/assets/images/podcasts.svg")
            }
          />
          <View style={{ flexDirection: "column", gap: 10, padding: 5 }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 13,
                color: "white",
                maxWidth: 240,
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item?.item?.author ? item?.item?.author : "Unknown"}
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
              {item?.item.description ? item?.item.description : "Unknown"}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
