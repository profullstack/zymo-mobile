import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Select,
  TextInput,
  TouchableOpacity,
  FlatList,
  Spinner,
  StyleSheet,
} from "react-native";

const LiveSubNav = () => <Text>LiveSubNav</Text>;
const AffliateLinks = () => <Text>AffliateLinks</Text>;

const channels = [
  // Example data
  { id: 1, name: "Channel 1" },
  { id: 2, name: "Channel 2" },
];

const m3us = [
  // Example data
  { id: 1, name: "Provider 1" },
  { id: 2, name: "Provider 2" },
];

function App() {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChannelListOpen, setChannelListOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    if (selectedProvider) {
      fetchChannels(selectedProvider);
    }
  }, [selectedProvider]);

  async function handleProviderChange(event) {
    const provider = event.nativeEvent.value;
    if (provider && provider !== "-- Select Provider --") {
      setSelectedProvider(provider);
      setIsLoading(true); // Simulating loading
    }
  }

  const closeChannelList = () => {
    setChannelListOpen(false);
  };

  return (
    <View style={styles.container}>
      <LiveSubNav />
      <AffliateLinks />
      <View style={styles.filterContainer}>
        <Text>Filter:</Text>
        <View style={styles.filterInputContainer}>
          <TextInput
            placeholder="Type to filter channels..."
            value={filterValue}
            onChangeText={setFilterValue}
            onEndEditing={() => setChannelListOpen(true)}
            onFocus={() => setChannelListOpen(true)}
          />
          {isLoading && <Spinner color="#672ad6" />}
        </View>
      </View>
      {selectedProvider && (
        <Text style={styles.link}>
          <TouchableOpacity onPress={() => console.log("EGP")}>
            View EGP
          </TouchableOpacity>
        </Text>
      )}
      <Text>Select a Channel</Text>
      <TextInput
        placeholder="Type to filter channels..."
        value={filterValue}
        onChangeText={setFilterValue}
        onFocus={() => setChannelListOpen(true)}
        onBlur={() => closeChannelList()}
      />
      {isChannelListOpen && (
        <FlatList
          data={filteredChannels(filterValue, channels).map(
            (channel) => channel.name
          )}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => console.log(`Selected: ${item}`)}>
              <Text style={styles.channelItem}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `channel-${index}`}
        />
      )}
      {selectedChannel && (
        <View>
          <Text>{selectedChannel.name}</Text>
          {/* VideoPlayer component would go here */}
        </View>
      )}
    </View>
  );
}

function filteredChannels(filterValue, channels) {
  if (!filterValue) return channels;
  return channels.filter((channel) =>
    channel.name.toLowerCase().includes(filterValue.toLowerCase())
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  filterContainer: {
    marginBottom: 15,
  },
  filterInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxHeight: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  link: {
    marginTop: 20,
  },
  channelItem: {
    padding: 8,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    cursor: "pointer",
  },
});

export default App;
