import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Pressable, ScrollView, View,Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface FilterTabNavTabNavProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

export const FilterTabNav: React.FC<FilterTabNavTabNavProps> = ({
  selectedTab,
  onSelectTab,
}) => {

  const tab_list = [
    {
      name: 'All',
    },
    {
      name: 'Action'
    },
    {
      name: 'Fantasy'
    },
    {
      name: "Adeventure"
    },
    {
      name: "Drama"
    },
    {
      name: "Mystery"
    },
  ];


  return (
    <>

      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <ScrollView bounces={false} horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center", width: '100%' }}>
            {tab_list.map((tab) => (
              <Pressable
                key={tab?.name}
                onPress={() => onSelectTab(tab?.name)}
                style={{
                  backgroundColor:
                    selectedTab === tab?.name ? "#682BD7" : Colors.backgroundColor,
                  paddingVertical: 7,
                  paddingHorizontal: 15,
                  borderRadius: 50,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 19.12,
                    fontWeight: "400",
                    color: "white",
                  }}
                >
                  {tab?.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
