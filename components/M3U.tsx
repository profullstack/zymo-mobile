import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  CheckBox,
  Linking,
  Picker,
} from "react-native";
import Spinner from "./Spinner"; // Ensure this component exists in your project
// import AffiliateLinks from "./AffiliateLinks"; // Ensure this component exists in your project
// import LiveSubNav from "./navbars/LiveSubNav"; // Ensure this component exists in your project
import VideoPlayer from "./VideoPlayer"; // Ensure this component exists in your project

const MyComponent = ({ m3us = [] }) => {
  const [channels, setChannels] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChannelListOpen, setIsChannelListOpen] = useState(false);
  const [mp4, setMp4] = useState(false);
  const [filteredChannels, setFilteredChannels] = useState([]);

  useEffect(() => {
    // Equivalent to Svelte's onMount
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Filter channels whenever channels, filterValue, or mp4 change
    let filtered = channels;

    if (filterValue) {
      filtered = filtered.filter((channel) =>
        channel.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (mp4) {
      filtered = filtered.filter((channel) => channel.isMp4);
    }

    setFilteredChannels(filtered);
  }, [channels, filterValue, mp4]);

  const fetchChannels = async (provider) => {
    setIsLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(
        `https://your-api.com/channels?provider=${provider}`
      );
      const data = await response.json();
      setChannels(data.channels);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderChange = async (value) => {
    if (value && value !== "-- Select Provider --") {
      setSelectedProvider(value);
      await fetchChannels(value);
    }
  };

  const selectChannel = (channel) => {
    setSelectedChannel(channel);
    setIsChannelListOpen(false);
  };

  return (
    <View style={styles.mainContent}>
      {/* <LiveSubNav />
      <AffiliateLinks /> */}

      <View style={styles.field}>
        <Text style={styles.boldText}>Filter:</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox value={mp4} onValueChange={setMp4} />
          <Text>TV Shows and Movies only</Text>
        </View>
      </View>

      <View style={styles.providerContainer}>
        <Picker
          selectedValue={selectedProvider}
          style={styles.picker}
          onValueChange={handleProviderChange}
        >
          <Picker.Item label="-- Select Provider --" value={null} />
          {m3us.map((provider) => (
            <Picker.Item
              label={provider.name}
              value={provider.id}
              key={provider.id}
            />
          ))}
        </Picker>
        {isLoading && <ActivityIndicator color="#672ad6" />}
      </View>

      {selectedProvider && (
        <Text style={styles.h4}>
          <Text
            style={styles.linkText}
            onPress={() =>
              Linking.openURL(`/live/stream/${selectedProvider}/epg`)
            }
          >
            View EPG
          </Text>
        </Text>
      )}

      <Text style={styles.h4}>Select a Channel</Text>

      <View style={styles.filterContainer}>
        <TextInput
          style={styles.filterInput}
          placeholder="Type to filter channels..."
          value={filterValue}
          onChangeText={(text) => {
            setFilterValue(text);
            setIsChannelListOpen(true);
          }}
          onFocus={() => setIsChannelListOpen(true)}
          onBlur={() => setIsChannelListOpen(false)}
        />
        {isChannelListOpen && (
          <FlatList
            data={filteredChannels}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectChannel(item)}>
                <Text style={styles.channelItem}>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={styles.channelList}
          />
        )}
      </View>

      {selectedChannel && (
        <>
          <Text style={styles.h2}>{selectedChannel.name}</Text>
          <VideoPlayer channel={selectedChannel} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    padding: 16,
  },
  field: {
    marginVertical: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  providerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    height: 50,
    flex: 1,
  },
  h4: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  filterContainer: {
    position: "relative",
    zIndex: 2,
  },
  filterInput: {
    marginBottom: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
  },
  channelList: {
    position: "absolute",
    width: "100%",
    maxHeight: 300,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  channelItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default MyComponent;
