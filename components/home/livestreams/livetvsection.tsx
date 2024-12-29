import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useMemo } from "react";
import { LiveTvCard } from "./livetvcard";
import { Colors } from "@/constants/Colors";
import { Dropdown } from "react-native-element-dropdown";
import { SearchInput } from "@/components/input";
import { useDispatch, useSelector } from "react-redux";
import { getLivestreams, setLivestreamsData } from "@/redux/slice/home-slice";
import { FlashList } from "@shopify/flash-list";

const data = [
  { label: "gomommy.pro", value: "gomommy.pro" },
  { label: "xtremity.tv (movies)", value: "xtremity.tv (movies)" },
  { label: "xtremity.tv (tv)", value: "xtremity.tv (tv)" },
  { label: "myox.me", value: "myox.me" },
  { label: "necroiptv.com", value: "necroiptv.com" },
  { label: "xtremity.tv (live)", value: "xtremity.tv (live)" },
];

export const LiveTvSection = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();

  const { livestreams_data, fetching_livestreams_data } = useSelector(
    (state: any) => state.home
  );

  const filteredData = useMemo(() => {
    if (!livestreams_data) return [];
    
    const validData = livestreams_data.filter(
      (stream: any) => stream?.provider && Array.isArray(stream?.channels)
    );
  
    if (!value) return validData;
  
    return validData.filter(
      (stream: any) => stream?.provider?.name === value
    );
  }, [livestreams_data, value]);

  const handleUpdateSearch = (text: string) => {
    const payload = {
      search: text,
    };

    //@ts-ignore
    dispatch(getLivestreams(payload));
    setValue(null);
  };

  const handleBlur = () => {
    dispatch(setLivestreamsData(null));
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[styles.label, isFocus && { color: Colors.backgroundColor }]}
        >
          Filter: TV Shows and Movies only
        </Text>
      );
    }
    return null;
  };

  const renderContent = () => {
    if (fetching_livestreams_data) {
      return <ActivityIndicator size="large" color="white" />;
    }

    if (!filteredData?.length) {
      return (
        <Text style={styles.noDataText}>
          No channels found for the selected provider
        </Text>
      );
    }

    return (
      <ScrollView style={styles.scrollView}>
        {filteredData.map((stream: any, index: number) => (
          <View key={index} style={styles.channelContainer}>
            <Text style={styles.providerName}>{stream?.provider?.name}</Text>
            <FlashList
              style={{ borderWidth: 1, borderColor: "red" }}
              data={stream?.channels}
              renderItem={({ item }) => <LiveTvCard item={item} />}
              estimatedItemSize={100}
              ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
            />
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput
          placeholder="Search for live"
          updateSearch={handleUpdateSearch}
          handleBlur={handleBlur}
        />
      </View>

      <View>
        {livestreams_data && (
          <View>
            {renderLabel()}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "white" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select Channel" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item: any) => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        )}
      </View>
      <View style={{ flex: 1 }}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 20,
    gap: 30,
  },
  searchContainer: {
    marginVertical: 0,
    paddingHorizontal: 0,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  channelContainer: {
    marginBottom: 20,
  },
  providerName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noDataText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: "white",
    color: "white",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
