import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const MovieInfoComponent = ({ title, creator, views, likes, shares, saves } :any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.creator}>by {creator}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <FontAwesome name="eye" size={18} color="#fff" />
          <Text style={styles.statText}>{views}</Text>
        </View>
        <View style={styles.statItem}>
          <FontAwesome name="thumbs-up" size={18} color="#fff" />
          <Text style={styles.statText}>{likes}</Text>
        </View>
        <TouchableOpacity style={styles.statItem}>
          <FontAwesome name="share" size={18} color="#fff" />
          <Text style={styles.statText}>{shares}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statItem}>
          <FontAwesome name="save" size={18} color="#fff" />
          <Text style={styles.statText}>{saves}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202020',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  creator: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
  },
});
