import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const Spinner = ({ color = 'white' }) => {
  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }
    )
  ).start();

  // Second interpolate beginning and end values (0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
        <View style={[styles.circle, { borderColor: color }]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  spinner: {
    width: '100%',
    height: '100%',
  },
  circle: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: 'transparent',
    borderTopColor: 'white',
  },
});

export default Spinner; 