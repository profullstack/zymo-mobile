import React, { FC } from "react";
import {
  Pressable,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextStyle,
  Platform
} from "react-native";
import {
  UIActivityIndicator,
} from 'react-native-indicators';
import { LinearGradient } from 'expo-linear-gradient';

interface CustomButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  text_type: string;
  text_style: TextStyle;
  button_style: any;
  disabled_color?: string;
  button_color?: string;
  loading?: boolean;
}

export const CustomButton: FC<CustomButtonProps> = ({
  onPress,
  disabled,
  children,
  button_style,
  text_style,
  text_type,
  disabled_color,
  button_color,
  loading
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      hitSlop={{ top: 36, bottom: 36, left: 36, right: 36 }}
    >
      <LinearGradient
        colors={[button_color || '#4ca1af', '#2c3e50']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[button_style, { opacity: disabled ? 1 : 1 }]}
      >
        {loading ? (
          <UIActivityIndicator color="white" size={16} />
        ) : (
          <Text style={text_style}>{children}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
};