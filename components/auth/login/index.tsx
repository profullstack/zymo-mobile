import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FormInput } from "@/components/input";
import { useForm } from "react-hook-form";
import { validateEmail } from "@/utils/libs";
import { CustomButton } from "@/components/button";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slice/auth-slice";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(
    (state: any) => state.auth
  );
  const default_values = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: default_values,
  });

  const onNext = () => {
    //@ts-ignore
    router.push("/(screens)/(home)/home");
    console.log("first")
  
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     onNext();
  //   }, 3000);
  // }, []);

  const onSubmit = (data: any) => {
    const payload = {
      email: data?.email,
      password: data?.password,
    };
    //@ts-ignore
    dispatch(login({ data: payload, callback: onNext }));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2c3e50", "#4ca1af"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <View
          style={{
            flexDirection: "column",
            gap: 20,
          }}
        >
          <FormInput
            error={errors?.email?.message}
            label="Email"
            required={"Email is required"}
            validate={(value: string) => validateEmail(value ?? "")}
            placeholder="Enter your email"
            name="email"
            control={control}
            editable={true}
            input_width={"100%"}
          />

          <FormInput
            type="password"
            error={errors?.password?.message}
            label="Password"
            required={"Password is required"}
            placeholder="Enter your password"
            name="password"
            control={control}
            editable={true}
            input_width={"100%"}
          />
        </View>

        <CustomButton
          loading={loading}
          // button_color={Colors.primaryColor}
          disabled_color="#C2C0C0"
          disabled={isDirty === false || isValid === false}
          onPress={handleSubmit(onSubmit)}
          text_type={"regular"}
          text_style={{
            fontWeight: "400",
            fontSize: 14,
            lineHeight: 19.12,
            textAlign: "center",
          }}
          button_style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 48,
            display: "flex",
            borderWidth: 0,
            borderRadius: 8,
          }}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  formContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 32,
    paddingVertical: 48,
    borderRadius: 8,
    width: "80%",
    maxWidth: 400,
    flexDirection: "column",
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    marginTop: 24,
    borderRadius: 4,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "#f87171",
    fontSize: 14,
    marginTop: 8,
  },
});
