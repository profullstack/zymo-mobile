import { memo, ReactNode, useState } from "react";
import { Controller } from "react-hook-form";
import { Dimensions, Pressable, Text, TextInput, View } from "react-native";
import EyeClosed from "phosphor-react-native/src/icons/EyeClosed";
import Eye from "phosphor-react-native/src/icons/Eye";
import WarningCircle from "phosphor-react-native/src/icons/WarningCircle";
import MapPinLine from "phosphor-react-native/src/icons/MapPinLine";
import MagnifyingGlass from "phosphor-react-native/src/icons/MagnifyingGlass";
import { Image } from "expo-image";


interface FormInputProps {
  flex_count?: any;
  showError?: boolean;
  input_width?: any;
  prefix?: ReactNode;
  suffix?: ReactNode;

  label?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  placeholder?: string;
  variant?: "outline" | "filled" | "underlined" | "unstyled" | "rounded";
  keyboardType?: any;
  width_padding?: any;
  multiline?: boolean;
  editable?: boolean;
  onChangeText?: (text: string) => void;
  control?: any;
  name: string;
  error?: any;
  required?: string;
  validate?: any;
  sub_label?: any;
  type?: string;

  min_length?: { value: number; message: string };
  max_length?: { value: number; message: string };
}


export const FormInput = memo(
  ({
    width_padding,
    label,
    min_length,
    max_length,
    placeholder,
    name,
    required,
    showError,
    control,
    multiline,
    editable,
    onChangeText,
    error,
    sub_label,
    keyboardType = "default",
    validate,
    type,
    input_width,
    flex_count,
  }: FormInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const { width: screenWidth } = Dimensions.get("window");
    const passwordIconWidth = 20;
    const errorIconWidth = 16;
    const iconMargin = 8;
    const paddingHorizontal = 20;
    const passwordWidthAdjustment = passwordIconWidth + iconMargin;
    const errorWidthAdjustment = errorIconWidth + iconMargin;
    const totalPadding = paddingHorizontal * 2;
    const availableWidth = screenWidth - totalPadding;
    const inputWidth = error
      ? availableWidth - errorWidthAdjustment
      : type === "password"
      ? availableWidth - passwordWidthAdjustment
      : availableWidth;

    return (
      <Controller
        control={control}
        rules={{
          required: required,
          minLength: min_length,
          maxLength: max_length,
          validate: validate,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ flexDirection: "column", gap: 5, flex: 0 }}>
            {label && (
              <View
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "300",
                    lineHeight: 16.39,
                    color: "white",
                  }}
                >
                  {label}
                </Text>
                {sub_label}
              </View>
            )}
            <View
              style={{
                backgroundColor: "white",
                flexDirection: "row",
                display: "flex",
                gap: 8,
                height: 54,
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical:2,
                borderRadius: 8,
                borderColor: error
                  ? "#ff0000"
                  : isFocused
                  ? "#838383"
                  : "transparent",
                borderWidth: 1,
              }}
            >
              <TextInput
                value={value}
                onChangeText={(e) => {
                  onChange(e);
                  if (onChangeText) {
                    onChangeText(e);
                  }
                }}
                onBlur={() => {
                  onBlur();
                  setIsFocused(false);
                }}
                onFocus={() => setIsFocused(true)}
                style={{
                  width: input_width
                    ? input_width
                    : inputWidth -
                      (width_padding ? width_padding : totalPadding),
                  height: "100%",
                  paddingHorizontal: 0,
                  borderRadius: 8,
                  borderColor: "transparent",
                  borderWidth: 0,
                  backgroundColor: "white",
                  color: "#838383",
                  fontFamily: "light",
                  fontWeight: "300",
                  fontSize: 12,
                  lineHeight: 16.39,
                }}
                secureTextEntry={
                  showPassword === false && type === "password" ? true : false
                }
                editable={editable ?? true}
                cursorColor={"#838383"}
                placeholder={placeholder}
                placeholderTextColor="lightgray"
                keyboardType={keyboardType}
                multiline={multiline}
              />

              {error && showError !== false ? (
                 <View style={{position:"absolute", right:20, flexDirection:"row", alignItems:"center",gap:5}}>
                 <WarningCircle size={16} color="#ff3b30" weight="regular" />

                 { type === "password" && <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={{ maxHeight: 48 }}
                >
                  {showPassword ? (
                    <Eye
                      size={28}
                      color="#838383"
                      weight="light"
                      style={{ maxHeight: 48 }}
                    />
                  ) : (
                    <EyeClosed
                      size={28}
                      color="#838383"
                      weight="light"
                      style={{ maxHeight: 48 }}
                    />
                  )}
                </Pressable>}
               </View>
              ) : type === "password" ? (
                <Pressable onPress={() => setShowPassword(!showPassword)}  hitSlop={{ top: 36, bottom: 36, left: 36, right: 36 }} style={{maxHeight: 48, marginLeft:-30}}>
                  {showPassword ? (
                    <Eye size={28} color="#838383" weight="light" style={{maxHeight: 48,}} />
                  ) : (
                    <EyeClosed size={28} color="#838383" weight="light" style={{maxHeight: 48,}} />
                  )}
                </Pressable>
              ) : null}
            </View>

            {error && showError !== false && (
              <Text
                style={{
                  fontWeight: "300",
                  fontSize: 12,
                  lineHeight: 16.39,
                  color: "white",
                }}
              >
                {error}
              </Text>
            )}
          </View>
        )}
        name={name}
      />
    );
  }
);

export const CommentFormInput = memo (({
  width_padding,
  label,
  min_length,
  max_length,
  placeholder,
  name,
  required,
  showError,
  control,
  multiline,
  editable,
  onChangeText,
  error,
  sub_label,
  keyboardType = "default",
  validate,
  type,
  input_width,
  flex_count,
} : FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { width: screenWidth } = Dimensions.get("window");
  const passwordIconWidth = 20;
  const errorIconWidth = 16;
  const iconMargin = 8;
  const paddingHorizontal = 20;
  const passwordWidthAdjustment = passwordIconWidth + iconMargin;
  const errorWidthAdjustment = errorIconWidth + iconMargin;
  const totalPadding = paddingHorizontal * 2;
  const availableWidth = screenWidth - totalPadding;
  const inputWidth = error
    ? availableWidth - errorWidthAdjustment
    : type === "password"
    ? availableWidth - passwordWidthAdjustment
    : availableWidth;

  return (
    <Controller
      control={control}
      rules={{
        required: required,
        minLength: min_length,
        maxLength: max_length,
        validate: validate,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={{ flexDirection: "column", gap: 5, flex: 0, backgroundColor: "#1E1E1E", }}>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              gap: 8,
              height: 54,
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 2,
            }}
          >
            <Image
            source={require("@/assets/images/mvi.svg")}
              style={{ height: 44, width: 44, borderRadius: 50 }}
            />
            <TextInput
              value={value}
              onChangeText={(e) => {
                onChange(e);
                if (onChangeText) {
                  onChangeText(e);
                }
              }}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
              style={{
                width: input_width
                  ? input_width
                  : inputWidth -
                    (width_padding ? width_padding : totalPadding),
                height: "100%",
                paddingHorizontal: 0,
                borderWidth: 0,
                backgroundColor: "#1E1E1E",
                color: "#838383",
                fontFamily: "light",
                fontWeight: "300",
                fontSize: 12,
                lineHeight: 16.39,
                borderColor: error
                ? "#303030"
                : isFocused
                ? "#838383"
                : "#303030",
              borderBottomWidth: 1,
           
              }}
              secureTextEntry={
                showPassword === false && type === "password" ? true : false
              }
              editable={editable ?? true}
              cursorColor={"#838383"}
              placeholder={placeholder}
              placeholderTextColor="#A8A8A8"
              keyboardType={keyboardType}
              multiline={multiline}
            />
          </View>
        </View>
      )}
      name={name}
    />
  );
});