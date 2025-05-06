import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { CheckBox } from "react-native-elements";
import axios from "axios";

const CreateReportScreen = () => {
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [department, setDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);

  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const [program, setProgram] = useState(null);
  const [programs, setPrograms] = useState([]);

  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");

  const [location, setLocation] = useState("");

  const [isViolationOpen, setIsViolationOpen] = useState(false);
  const [violation, setViolation] = useState(null);
  const [violations, setViolations] = useState([
    { label: "Select Violation", value: "" },
    {
      label: "Inappropriate Civilian Attire",
      value: "Inappropriate Civilian Attire",
    },
    { label: "Hair Violation", value: "Hair Violation" },
    {
      label: "Incomplete Uniform for Criminology",
      value: "Incomplete Uniform for Criminology",
    },
    {
      label: "Not Wearing Prescribed Uniform",
      value: "Not Wearing Prescribed Uniform",
    },
    {
      label: "Other Violations",
      value: "Other Violations",
    },
  ]);
  const [otherViolationName, setOtherViolationName] = useState("");
  const [explainSpecify, setExplainSpecify] = useState("");

  const [otherRemarks, setOtherRemarks] = useState("");

  // Inappropriate Civilian Attire Violation
  const [
    inappropriateCivilianAttireViolations,
    setInappropriateCivilianAttireViolations,
  ] = useState({
    Croptop: false,
    Shorts: false,
    "Mini-Skirt": false,
    Leggings: false,
    "Tattered Jeans": false,
    "Sandals/Slippers": false,
  });

  const toggleInappropriateCivilianAttireViolations = (name) => {
    setInappropriateCivilianAttireViolations((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const getSelectedInappropriateCivilianAttireViolations = () => {
    return Object.entries(inappropriateCivilianAttireViolations)
      .filter(([_, isChecked]) => isChecked)
      .map(([violation]) => violation);
  };

  // Hair Violation
  const [hairViolations, setHairViolation] = useState({
    "Long Hair": false,
    "Colored Hair": false,
    "Improper Haircut/Hairstyle": false,
  });

  const toggleHairViolations = (name) => {
    setHairViolation((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const getSelectedHairViolations = () => {
    return Object.entries(hairViolations)
      .filter(([_, isChecked]) => isChecked)
      .map(([violation]) => violation);
  };

  // Incomplete Uniform for Criminology Violation
  const [
    incompleteUniformForCriminologyViolations,
    setIncompleteUniformForCriminologyViolations,
  ] = useState({
    Lanyard: false,
    Whistle: false,
    Nameplate: false,
    Belt: false,
    Charol: false,
  });

  const toggleIncompleteUniformForCriminologyViolations = (name) => {
    setIncompleteUniformForCriminologyViolations((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const getSelectedIncompleteUniformForCriminologyViolations = () => {
    return Object.entries(incompleteUniformForCriminologyViolations)
      .filter(([_, isChecked]) => isChecked)
      .map(([violation]) => violation);
  };

  // Not Wearing Prescribed Uniform Violation
  const [
    notWearingPrescribedUniformViolations,
    setNotWearingPrescribedUniformViolations,
  ] = useState({
    "No Patch": false,
    "No Necktie": false,
    "Black Or Other Pants": false,
    "Colored Footsocks": false,
    "Unofficial PE or ORG Shirt": false,
    "Wearing PE Uniform, Other Than PE Class(IS) or Time(College)": false,
    "Wearing Rubber Shoes, Other Than PE Class(IS) or Time(College)": false,
    "Entering The Campus Without The Official ID": false,
    "Using Unofficial ID": false,
    "Using Someone's ID": false,
    "ID Tampering": false,
    "Using Unofficial ID Lace": false,
    "No ID Lace": false,
  });

  const toggleNotWearingPrescribedUniformViolations = (name) => {
    setNotWearingPrescribedUniformViolations((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const getSelectedNotWearingPrescribedUniformViolations = () => {
    return Object.entries(notWearingPrescribedUniformViolations)
      .filter(([_, isChecked]) => isChecked)
      .map(([violation]) => violation);
  };

  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setTime(selectedDate);
  };

  const handleReset = () => {
    setDepartment(null);
    setProgram(null);
    setStudentName("");
    setStudentId("");
    setTime(new Date());
    setLocation("");
    setViolation(null);
    setOtherRemarks("");
  };

  const handleResetViolation = () => {
    setInappropriateCivilianAttireViolations({
      Croptop: false,
      Shorts: false,
      "Mini-Skirt": false,
      Leggings: false,
      "Tattered Jeans": false,
      "Sandals/Slippers": false,
    });

    setHairViolation({
      "Long Hair": false,
      "Colored Hair": false,
      "Improper Haircut/Hairstyle": false,
    });

    setIncompleteUniformForCriminologyViolations({
      Lanyard: false,
      Whistle: false,
      Nameplate: false,
      Belt: false,
      Charol: false,
    });

    setNotWearingPrescribedUniformViolations({
      "No Patch": false,
      "No Necktie": false,
      "Black Or Other Pants": false,
      "Colored Footsocks": false,
      "Unofficial PE or ORG Shirt": false,
      "Wearing PE Uniform, Other Than PE Class(IS) or Time(College)": false,
      "Wearing Rubber Shoes, Other Than PE Class(IS) or Time(College)": false,
      "Entering The Campus Without The Official ID": false,
      "Using Unofficial ID": false,
      "Using Someone's ID": false,
      "ID Tampering": false,
      "Using Unofficial ID Lace": false,
      "No ID Lace": false,
    });
  };

  const handleSubmit = () => {
    let selectedViolations = null;
    let violationName = null;
    let otherExplainSpecify = null;

    const utcDate = new Date(time);
    const localTime = utcDate.toLocaleString("en-PH", {
      timeZone: "Asia/Manila",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    if (violation === "Inappropriate Civilian Attire") {
      selectedViolations = getSelectedInappropriateCivilianAttireViolations();
    }

    if (violation === "Hair Violation") {
      selectedViolations = getSelectedHairViolations();
    }

    if (violation === "Incomplete Uniform for Criminology") {
      selectedViolations =
        getSelectedIncompleteUniformForCriminologyViolations();
    }

    if (violation === "Not Wearing Prescribed Uniform") {
      selectedViolations = getSelectedNotWearingPrescribedUniformViolations();
    }

    if (violation === "Other Violations") {
      violationName = otherViolationName;
      otherExplainSpecify = explainSpecify;
    }

    axios
      .post("http://10.0.2.2:8000/api/mobile-reports", {
        department_id: department,
        program_id: program,
        student_name: studentName,
        student_id: studentId,
        time: localTime,
        location,
        violation_name: violation,
        violations:
          !selectedViolations || selectedViolations.length == 0
            ? null
            : JSON.stringify(selectedViolations),
        other_violation_name: violationName,
        explain_specify: otherExplainSpecify,
        other_remarks: otherRemarks,
      })
      .then((res) => {
        handleReset();
        handleResetViolation();
        Alert.alert(
          "Success",
          "Report submitted successfully!",
          [{ text: "OK" }],
          { cancelable: false }
        );
      })
      .catch((res) => {
        Alert.alert(
          "Error",
          "Failed to submit the report. Please try again.",
          [{ text: "OK" }],
          { cancelable: false }
        );
      });
  };

  const getDepartments = () => {
    axios
      .get("http://10.0.2.2:8000/api/mobile-departments")
      .then((res) => {
        const mappedDeparments = res.data.departments.map((department) => {
          return {
            label: department.name,
            value: department.id,
          };
        });

        setDepartments(mappedDeparments);
      })
      .catch((e) => console.log(e));
  };

  const getPrograms = (departmentId) => {
    axios
      .get(`http://10.0.2.2:8000/api/mobile-programs/${departmentId}`)
      .then((res) => {
        const mappedPrograms = res.data.programs.map((program) => {
          return {
            label: program.name,
            value: program.id,
          };
        });

        setPrograms(mappedPrograms);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    handleResetViolation();
  }, [violation]);

  useEffect(() => {
    getDepartments();
  }, []);

  useEffect(() => {
    getPrograms(department);
  }, [department]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Icon
          name="qrcode"
          size={35}
          color="gray"
          style={{ marginBottom: 10, position: "absolute", right: 20, top: 10 }}
        />
        <Icon
          name="camera"
          size={30}
          color="gray"
          style={{ marginBottom: 10, position: "absolute", right: 60, top: 12 }}
        />

        <View style={styles.content}>
          <View style={styles.violationHeaderContainer}>
            <View style={styles.violationImageContainer}>
              <Image
                source={require("../assets/new-era.jpeg")}
                style={styles.image}
              />

              <Text style={styles.violationText}>Violation Form</Text>
            </View>

            <View style={[styles.inputGroup, { zIndex: 1000 }]}>
              <Text style={styles.label}>Department</Text>

              <DropDownPicker
                open={isDepartmentOpen}
                value={department}
                items={departments}
                setOpen={setIsDepartmentOpen}
                setValue={setDepartment}
                setItems={setDepartments}
                placeholder="Select Department"
                listMode="SCROLLVIEW"
                style={{
                  borderColor: "#ccc",
                  height: 48,
                  paddingHorizontal: 12,
                }}
                textStyle={{ fontSize: 13 }}
                dropDownContainerStyle={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 6,
                  backgroundColor: "#fff",
                }}
              />
            </View>

            <View style={[styles.inputGroup, { zIndex: 900 }]}>
              <Text style={styles.label}>Program</Text>

              <DropDownPicker
                open={isProgramOpen}
                value={program}
                items={programs}
                setOpen={setIsProgramOpen}
                setValue={setProgram}
                setItems={setPrograms}
                placeholder="Select Program"
                listMode="SCROLLVIEW"
                style={{
                  borderColor: "#ccc",
                  height: 48,
                  paddingHorizontal: 12,
                }}
                textStyle={{ fontSize: 13 }}
                dropDownContainerStyle={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 6,
                  backgroundColor: "#fff",
                }}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Student Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Student Name "
                value={studentName}
                onChangeText={(text) => setStudentName(text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Student ID Number</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter Student ID Number"
                value={studentId}
                onChangeText={(text) => setStudentId(text)}
              />
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Time</Text>

                <Pressable onPress={() => setShowPicker(true)}>
                  <TextInput
                    style={styles.input}
                    placeholder="Select time"
                    value={time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    editable={false}
                    pointerEvents="none"
                  />
                </Pressable>

                {showPicker && (
                  <DateTimePicker
                    value={time}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Location</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Location"
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                />
              </View>
            </View>

            <View style={[styles.inputGroup, { zIndex: 1000 }]}>
              <Text style={styles.label}>Violations</Text>

              <DropDownPicker
                open={isViolationOpen}
                value={violation}
                items={violations}
                setOpen={setIsViolationOpen}
                setValue={setViolation}
                setItems={setViolations}
                placeholder="Select Violation"
                listMode="SCROLLVIEW"
                dropDownDirection="AUTO"
                style={{
                  borderColor: "#ccc",
                  height: 48,
                  paddingHorizontal: 12,
                }}
                textStyle={{ fontSize: 13 }}
                dropDownContainerStyle={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 6,
                  backgroundColor: "#fff",
                  maxHeight: 400,
                }}
              />
            </View>

            {violation === "Inappropriate Civilian Attire" && (
              <>
                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Croptop"
                      checked={inappropriateCivilianAttireViolations.Croptop}
                      onPress={() =>
                        toggleInappropriateCivilianAttireViolations("Croptop")
                      }
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Shorts"
                      checked={inappropriateCivilianAttireViolations.Shorts}
                      onPress={() =>
                        toggleInappropriateCivilianAttireViolations("Shorts")
                      }
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Mini-Skirt"
                      checked={
                        inappropriateCivilianAttireViolations["Mini-Skirt"]
                      }
                      onPress={() =>
                        toggleInappropriateCivilianAttireViolations(
                          "Mini-Skirt"
                        )
                      }
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Leggings"
                      checked={inappropriateCivilianAttireViolations.Leggings}
                      onPress={() =>
                        toggleInappropriateCivilianAttireViolations("Leggings")
                      }
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Tattered Jeans"
                      checked={
                        inappropriateCivilianAttireViolations["Tattered Jeans"]
                      }
                      onPress={() =>
                        toggleInappropriateCivilianAttireViolations(
                          "Tattered Jeans"
                        )
                      }
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Sandals/Slippers"
                      checked={
                        inappropriateCivilianAttireViolations[
                          "Sandals/Slippers"
                        ]
                      }
                      onPress={() =>
                        toggleInappropriateCivilianAttireViolations(
                          "Sandals/Slippers"
                        )
                      }
                    />
                  </View>
                </View>
              </>
            )}

            {violation === "Hair Violation" && (
              <>
                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Long Hair"
                      checked={hairViolations["Long Hair"]}
                      onPress={() => toggleHairViolations("Long Hair")}
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Colored Hair"
                      checked={hairViolations["Colored Hair"]}
                      onPress={() => toggleHairViolations("Colored Hair")}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Improper Haircut/Hairstyle"
                      checked={hairViolations["Improper Haircut/Hairstyle"]}
                      onPress={() =>
                        toggleHairViolations("Improper Haircut/Hairstyle")
                      }
                    />
                  </View>
                </View>
              </>
            )}

            {violation === "Incomplete Uniform for Criminology" && (
              <>
                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Lanyard"
                      checked={
                        incompleteUniformForCriminologyViolations.Lanyard
                      }
                      onPress={() =>
                        toggleIncompleteUniformForCriminologyViolations(
                          "Lanyard"
                        )
                      }
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Whistle"
                      checked={
                        incompleteUniformForCriminologyViolations.Whistle
                      }
                      onPress={() =>
                        toggleIncompleteUniformForCriminologyViolations(
                          "Whistle"
                        )
                      }
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Nameplate"
                      checked={
                        incompleteUniformForCriminologyViolations.Nameplate
                      }
                      onPress={() =>
                        toggleIncompleteUniformForCriminologyViolations(
                          "Nameplate"
                        )
                      }
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Belt"
                      checked={incompleteUniformForCriminologyViolations.Belt}
                      onPress={() =>
                        toggleIncompleteUniformForCriminologyViolations("Belt")
                      }
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Charol"
                      checked={incompleteUniformForCriminologyViolations.Charol}
                      onPress={() =>
                        toggleIncompleteUniformForCriminologyViolations(
                          "Charol"
                        )
                      }
                    />
                  </View>
                </View>
              </>
            )}

            {violation === "Not Wearing Prescribed Uniform" && (
              <>
                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="No Patch"
                      checked={
                        notWearingPrescribedUniformViolations["No Patch"]
                      }
                      onPress={() =>
                        toggleNotWearingPrescribedUniformViolations("No Patch")
                      }
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="No Necktie"
                      checked={
                        notWearingPrescribedUniformViolations["No Necktie"]
                      }
                      onPress={() =>
                        toggleNotWearingPrescribedUniformViolations(
                          "No Necktie"
                        )
                      }
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Black or Other Pants"
                      checked={
                        notWearingPrescribedUniformViolations[
                          "Black or Other Pants"
                        ]
                      }
                      onPress={() =>
                        toggleNotWearingPrescribedUniformViolations(
                          "Black or Other Pants"
                        )
                      }
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Colored Footsocks"
                      checked={
                        notWearingPrescribedUniformViolations[
                          "Colored Footsocks"
                        ]
                      }
                      onPress={() =>
                        toggleNotWearingPrescribedUniformViolations(
                          "Colored Footsocks"
                        )
                      }
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Unofficial PE or ORG Shirt"
                      checked={
                        notWearingPrescribedUniformViolations[
                          "Unofficial PE or ORG Shirt"
                        ]
                      }
                      onPress={() =>
                        toggleNotWearingPrescribedUniformViolations(
                          "Unofficial PE or ORG Shirt"
                        )
                      }
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Wearing PE Uniform, Other Than PE Class(IS) or Time(COLLEGE)"
                      checked={
                        notWearingPrescribedUniformViolations[
                          "Wearing PE Uniform, Other Than PE Class(IS) or Time(COLLEGE)"
                        ]
                      }
                      onPress={() =>
                        toggleNotWearingPrescribedUniformViolations(
                          "Wearing PE Uniform, Other Than PE Class(IS) or Time(COLLEGE)"
                        )
                      }
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Wearing Rubber Shoes, Other Than PE Class(IS) or Time(COLLEGE)"
                      checked={
                        notWearingPrescribedUniformViolations[
                          "Wearing Rubber Shoes, Other Than PE Class(IS) or Time(COLLEGE)"
                        ]
                      }
                      onPress={() =>
                        toggleNotWearingPrescribedUniformViolations(
                          "Wearing Rubber Shoes, Other Than PE Class(IS) or Time(COLLEGE)"
                        )
                      }
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Entering The Campus Without The Official ID"
                      checked={
                        notWearingPrescribedUniformViolations[
                          "Entering The Campus Without The Official ID"
                        ]
                      }
                      onPress={() =>
                        toggleNotWearingPrescribedUniformViolations(
                          "Entering The Campus Without The Official ID"
                        )
                      }
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Using Unofficial ID"
                      checked={
                        notWearingPrescribedUniformViolations[
                          "Using Unofficial ID"
                        ]
                      }
                      onPress={() =>
                        toggleNotWearingPrescribedUniformViolations(
                          "Using Unofficial ID"
                        )
                      }
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Using Someone's ID"
                      checked={
                        notWearingPrescribedUniformViolations[
                          "Using Someone's ID"
                        ]
                      }
                      onPress={() =>
                        toggleNotWearingPrescribedUniformViolations(
                          "Using Someone's ID"
                        )
                      }
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="ID Tampering"
                      checked={
                        notWearingPrescribedUniformViolations["ID Tampering"]
                      }
                      onPress={() =>
                        toggleNotWearingPrescribedUniformViolations(
                          "ID Tampering"
                        )
                      }
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="No ID Lace"
                      checked={
                        notWearingPrescribedUniformViolations["No ID Lace"]
                      }
                      onPress={() =>
                        toggleNotWearingPrescribedUniformViolations(
                          "No ID Lace"
                        )
                      }
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Using Unofficial ID Lace"
                      checked={
                        notWearingPrescribedUniformViolations[
                          "Using Unofficial ID Lace"
                        ]
                      }
                      onPress={() =>
                        toggleNotWearingPrescribedUniformViolations(
                          "Using Unofficial ID Lace"
                        )
                      }
                    />
                  </View>
                </View>
              </>
            )}

            {violation === "Other Violations" && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Other Violation Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Other Violation"
                    autoCapitalize="none"
                    value={otherViolationName}
                    onChangeText={(text) => setOtherViolationName(text)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Please Explain or Specify</Text>
                  <TextInput
                    style={[
                      styles.input,
                      { height: 100, textAlignVertical: "top" },
                    ]}
                    placeholder="Explain or Specify Here..."
                    multiline={true}
                    numberOfLines={4}
                    value={explainSpecify}
                    onChangeText={(text) => setExplainSpecify(text)}
                  />
                </View>
              </>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Other Remarks</Text>
              <TextInput
                style={[
                  styles.input,
                  { height: 100, textAlignVertical: "top" },
                ]}
                placeholder="Enter Remarks Here..."
                multiline={true}
                numberOfLines={4}
                value={otherRemarks}
                onChangeText={(text) => setOtherRemarks(text)}
              />
            </View>

            <View style={styles.btnContainer}>
              <Button title="Submit" color="#228b22" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 20,
    position: "relative",
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
  violationText: {
    fontSize: 25,
    fontWeight: 600,
    marginBottom: 20,
  },
  violationHeaderContainer: {
    alignItems: "center",
    width: "100%",
  },
  violationImageContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    gap: 5,
  },
  inputGroup: {
    marginBottom: 20,
    width: "100%",
  },
  inputGroupCheckBox: {
    marginBottom: 10,
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
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
