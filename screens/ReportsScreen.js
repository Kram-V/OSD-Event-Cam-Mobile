import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const ReportsScreen = ({ isCreatedSuccess, setIsCreatedSuccess }) => {
  const navigation = useNavigation();

  const [reports, setReports] = useState([]);

  const getReports = () => {
    axios
      .get(`http://10.0.2.2:8000/api/mobile-reports`)
      .then((res) => {
        setReports(res.data.reports);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getReports();
  }, []);

  useEffect(() => {
    if (isCreatedSuccess) {
      getReports();
      setIsCreatedSuccess(false);
    }
  }, [isCreatedSuccess]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>File Reports</Text>

        <ScrollView style={styles.scrollView}>
          {reports.map((report) => (
            <View key={report.id} style={styles.card}>
              <Text style={styles.reportText}>{report.violation_name}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Edit Report", { reportId: report.id })
                }
                style={styles.iconButton}
              >
                <Image
                  source={require("../assets/edit.png")}
                  style={styles.iconImage}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Image
                  source={require("../assets/upload.png")}
                  style={styles.iconImage}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 25,
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif",
  },
  text: {
    fontSize: 30,
  },

  scrollView: {
    width: "100%",
    marginTop: 25,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d3d9e3",
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 5,
  },
  reportText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  iconButton: {
    marginHorizontal: 5,
  },
  icon: {
    fontSize: 18,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
});
