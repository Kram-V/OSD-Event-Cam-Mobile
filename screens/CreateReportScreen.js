import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CreateReportScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CREATE REPORT SCREEN</Text>
    </View>
  );
};

export default CreateReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
  },
});
