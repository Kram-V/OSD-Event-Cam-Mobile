import React from "react";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.loginHeaderContainer}>
          <View style={styles.loginImageContainer}>
            <Image
              source={require("../assets/new-era.jpeg")}
              style={styles.image}
            />

            <Text style={styles.loginText}>Sign Up</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} placeholder="Enter your username" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="Enter your email" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.btnContainer}>
            <Button title="Sign Up" color="#228b22" />
          </View>

          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signUpTextLink}>
              Have an account? Sign in now!
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 70,
  },

  content: {
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    padding: 20,
  },
  image: {
    borderRadius: 100,
    width: 80,
    height: 80,
  },
  loginText: {
    fontSize: 25,
    fontWeight: 600,
  },
  loginHeaderContainer: {
    alignItems: "center",
    width: "100%",
  },
  loginImageContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    gap: 5,
  },
  inputGroup: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },
  btnContainer: {
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
  },
  signUpTextLink: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
