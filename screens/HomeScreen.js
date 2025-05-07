import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeScreen = ({ isCreatedSuccess, setIsCreatedSuccess }) => {
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);

  const getStats = () => {
    axios
      .get("http://10.0.2.2:8000/api/mobile-stats")
      .then((res) => {
        setStats(res.data.total_non_admin_users);
      })
      .catch((e) => console.log(e));
  };

  const getReports = () => {
    axios
      .get("http://10.0.2.2:8000/api/mobile-reports")
      .then((res) => {
        setReports(res.data.reports);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getStats();
    getReports();
  }, []);

  useEffect(() => {
    if (isCreatedSuccess) {
      getReports();
      setIsCreatedSuccess(false);
    }
  }, [isCreatedSuccess]);

  return (
    <View style={styles.container}>
      <View style={styles.totalStudentReports}>
        <View>
          <Icon
            name="bar-chart"
            size={30}
            color="#E55353"
            style={{ marginBottom: 10 }}
          />

          <Text>Total Student Reports</Text>
        </View>

        <Text style={styles.totalNumber}>{reports.length}</Text>
      </View>

      <View style={styles.totalPendingReports}>
        <View>
          <Icon
            name="hourglass-half"
            size={30}
            color="#F9B115"
            style={{ marginBottom: 10 }}
          />

          <Text>Total Pending Reports</Text>
        </View>

        <Text style={styles.totalNumber}>25</Text>
      </View>

      <View style={styles.totalResolvedReports}>
        <View>
          <Icon
            name="check-circle"
            size={34}
            color="#1B9E3E"
            style={{ marginBottom: 10 }}
          />

          <Text>Total Resolved Reports</Text>
        </View>

        <Text style={styles.totalNumber}>25</Text>
      </View>

      <View style={styles.totalStaffUsers}>
        <View>
          <Icon
            name="users"
            size={30}
            color="#3399FF"
            style={{ marginBottom: 10 }}
          />

          <Text>Total Staff Users</Text>
        </View>

        <Text style={styles.totalNumber}>{stats}</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },

  text: {
    fontSize: 30,
  },

  totalStudentReports: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    borderRadius: 20,
    elevation: 4,
    backgroundColor: "#fff",
    borderLeftWidth: 3,
    borderLeftColor: "#E55353",
    marginBottom: 20,
  },

  totalPendingReports: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    borderRadius: 20,
    elevation: 4,
    backgroundColor: "#fff",
    borderLeftWidth: 3,
    borderLeftColor: "#F9B115",
    marginBottom: 20,
  },

  totalResolvedReports: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    borderRadius: 20,
    elevation: 4,
    backgroundColor: "#fff",
    borderLeftWidth: 3,
    borderLeftColor: "#1B9E3E",
    marginBottom: 20,
  },

  totalStaffUsers: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    borderRadius: 20,
    elevation: 4,
    backgroundColor: "#fff",
    borderLeftWidth: 3,
    borderLeftColor: "#3399FF",
    marginBottom: 20,
  },

  totalNumber: {
    fontSize: 40,
    color: "#d3d3d3",
    fontWeight: 600,
  },
});
