import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


export const MovieCommentComponent = ({ username, comment, timestamp, likes, replies }:any) => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.header}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
      <Text style={styles.comment}>{comment}</Text>
      <View style={styles.interactions}>
        <TouchableOpacity style={styles.interactionItem}>
          <FontAwesome name="thumbs-up" size={18} color="#fff" />
          <Text style={styles.interactionText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionItem}>
          <FontAwesome name="comment" size={18} color="#fff" />
          <Text style={styles.interactionText}>{replies}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionItem}>
          <FontAwesome name="reply" size={18} color="#fff" />
          <Text style={styles.interactionText}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    padding: 16,
  },
  commentContainer: {
    backgroundColor: '#171717',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  timestamp: {
    fontSize: 14,
    color: '#aaa',
  },
  comment: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
  },
  interactions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  interactionText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
  },
});
