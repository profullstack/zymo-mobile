import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = 'large', 
  color = "#2c3e50",
  fullScreen = false 
}) => {
  return (
    <ActivityIndicator 
      size={size} 
      color={color} 
      style={fullScreen ? styles.fullScreen : styles.inline} 
    />
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColor
  },
  inline: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});