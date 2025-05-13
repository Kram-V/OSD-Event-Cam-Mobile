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
  ActivityIndicator,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { CheckBox } from "react-native-elements";
import axios from "axios";

const report = [
  { id: 1, name: "Violation Report 1", image: null },
  { id: 2, name: "Violation Report 2", image: null },
  { id: 3, name: "Violation Report 3", image: null },
  { id: 4, name: "Violation Report 4", image: null },
  { id: 5, name: "Violation Report 5", image: null },
];

const EditReportScreen = ({ setIsCreatedSuccess }) => {
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [department, setDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);

  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const [program, setProgram] = useState(null);
  const [programs, setPrograms] = useState([]);

  const [isYearOpen, setIsYearOpen] = useState(false);
  const [year, setYear] = useState(null);
  const [years, setYears] = useState([
    { label: "Select Year", value: "" },
    {
      label: "First Year",
      value: "First Year",
    },
    { label: "Second Year", value: "Second Year" },
    {
      label: "Third Year",
      value: "Third Year",
    },
    {
      label: "Fourth Year",
      value: "Fourth Year",
    },
  ]);

  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [grade, setGrade] = useState(null);
  const [grades, setGrades] = useState([
    { label: "Select Grade", value: "" },
    {
      label: "Grade 11",
      value: "Grade 11",
    },
    { label: "Grade 12", value: "Grade 12" },
  ]);

  const [isEducationLevelOpen, setIsEducationLevelOpen] = useState(false);
  const [educationLevel, setEducationLevel] = useState(null);
  const [educationLevels, setEducationLevels] = useState([
    { label: "Select Education Level", value: "" },
    { label: "College", value: "College" },
    {
      label: "Integrated School",
      value: "Integrated School",
    },
  ]);

  const [section, setSection] = useState("");

  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");

  const [guardianName, setGuardianName] = useState("");
  const [guardianPhoneNumber, setguardianPhoneNumber] = useState("");

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

  const [isLoading, setIsLoading] = useState(false);

  const [isEditable, setIsEditable] = useState(false);

  const [errors, setErrors] = useState(null);

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
    setEducationLevel(null);
    setDepartment(null);
    setProgram(null);
    setYear(null);
    setGrade(null);
    setSection("");
    setStudentName("");
    setStudentId("");
    setGuardianName("");
    setguardianPhoneNumber("");
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
    return;

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

    const data =
      educationLevel === "College"
        ? {
            education_level_name: educationLevel,
            department,
            program,
            year,
            section,
            student_name: studentName,
            student_id: studentId,
            guardian_name: guardianName,
            guardian_phone_number: guardianPhoneNumber,
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
          }
        : {
            education_level_name: educationLevel,
            department,
            program,
            grade,
            section,
            student_name: studentName,
            student_id: studentId,
            guardian_name: guardianName,
            guardian_phone_number: guardianPhoneNumber,
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
          };

    setIsLoading(true);
    axios
      .post("http://10.0.2.2:8000/api/mobile-reports", data)
      .then((res) => {
        handleReset();
        handleResetViolation();
        Alert.alert(
          "Success",
          "Report Created Successfully!",
          [{ text: "OK" }],
          { cancelable: false }
        );

        setIsCreatedSuccess(true);
        setErrors(null);
        setIsEditable(false);
      })
      .catch((e) => {
        setErrors(null);
        Alert.alert(
          "Error",
          "Make sure all fields are validated",
          [{ text: "OK" }],
          { cancelable: false }
        );

        console.log(e);

        setErrors(e.response.data.errors);
      })
      .finally(() => setIsLoading(false));
  };

  const getDepartments = (educationLevel) => {
    axios
      .get(`http://10.0.2.2:8000/api/mobile-departments`, {
        params: {
          educationLevel,
        },
      })
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
    if (educationLevel) {
      getDepartments(educationLevel);
    }
  }, [educationLevel]);

  useEffect(() => {
    if (department) {
      getPrograms(department);
    }
  }, [department]);

  useEffect(() => {
    setGrade(null);
    setYear(null);
  }, [educationLevel]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Icon
          name="qrcode"
          size={25}
          color="gray"
          style={{ position: "absolute", right: 20, top: 20 }}
        />
        {/* <Icon
          name="camera"
          size={20}
          color="gray"
          style={{ position: "absolute", right: 52, top: 23 }}
        /> */}

        {!isEditable ? (
          <Icon
            name="edit"
            size={25}
            color="gray"
            style={{ position: "absolute", right: 48, top: 20 }}
            onPress={() => setIsEditable(true)}
          />
        ) : (
          <Icon
            name="lock"
            size={25}
            color="gray"
            style={{ position: "absolute", right: 52, top: 20 }}
            onPress={() => setIsEditable(false)}
          />
        )}

        <View style={styles.content}>
          <View style={styles.violationHeaderContainer}>
            <View style={styles.violationImageContainer}>
              <Image
                source={require("../assets/new-era.jpeg")}
                style={styles.image}
              />

              <Text style={styles.violationText}>Violation Form</Text>
            </View>

            <View style={[styles.inputGroup, { zIndex: 1100 }]}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Education Level </Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>

              <DropDownPicker
                open={isEducationLevelOpen}
                value={educationLevel}
                items={educationLevels}
                setOpen={setIsEducationLevelOpen}
                setValue={setEducationLevel}
                setItems={setEducationLevels}
                placeholder="Select Education Level"
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

              {errors &&
                errors["education_level_name"] &&
                errors["education_level_name"][0] && (
                  <Text style={{ color: "red", fontSize: 14 }}>
                    {errors["education_level_name"][0]}
                  </Text>
                )}
            </View>

            <View style={[styles.inputGroup, { zIndex: 1000 }]}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Department </Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>

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

              {errors && errors["department"] && errors["department"][0] && (
                <Text style={{ color: "red", fontSize: 14 }}>
                  {errors["department"][0]}
                </Text>
              )}
            </View>

            <View style={[styles.inputGroup, { zIndex: 900 }]}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Program </Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>

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

              {errors && errors["program"] && errors["program"][0] && (
                <Text style={{ color: "red", fontSize: 14 }}>
                  {errors["program"][0]}
                </Text>
              )}
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {educationLevel === "College" ? (
                <View
                  style={[
                    styles.inputGroup,
                    { flex: 1, marginRight: 8, zIndex: 800 },
                  ]}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.label}>Year </Text>
                    <Text style={{ color: "red" }}>*</Text>
                  </View>

                  <DropDownPicker
                    open={isYearOpen}
                    value={year}
                    items={years}
                    setOpen={setIsYearOpen}
                    setValue={setYear}
                    setItems={setYears}
                    placeholder="Select Year"
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

                  {errors && errors["year"] && errors["year"][0] && (
                    <Text style={{ color: "red", fontSize: 14 }}>
                      {errors["year"][0]}
                    </Text>
                  )}
                </View>
              ) : (
                <View
                  style={[
                    styles.inputGroup,
                    { flex: 1, marginRight: 8, zIndex: 800 },
                  ]}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.label}>Grade </Text>
                    <Text style={{ color: "red" }}>*</Text>
                  </View>

                  <DropDownPicker
                    open={isGradeOpen}
                    value={grade}
                    items={grades}
                    setOpen={setIsGradeOpen}
                    setValue={setGrade}
                    setItems={setGrades}
                    placeholder="Select Grade"
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

                  {errors && errors["grade"] && errors["grade"][0] && (
                    <Text style={{ color: "red", fontSize: 14 }}>
                      {errors["grade"][0]}
                    </Text>
                  )}
                </View>
              )}

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.label}>Section </Text>
                  <Text style={{ color: "red" }}>*</Text>
                </View>

                <TextInput
                  style={[
                    styles.input,
                    !isEditable ? { backgroundColor: "#f0f0f0" } : null,
                  ]}
                  placeholder="Enter Section"
                  value={section}
                  onChangeText={(text) => setSection(text)}
                  editable={isEditable}
                />

                {errors && errors["section"] && errors["section"][0] && (
                  <Text style={{ color: "red", fontSize: 14 }}>
                    {errors["section"][0]}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Student Name</Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  !isEditable ? { backgroundColor: "#f0f0f0" } : null,
                ]}
                placeholder="Enter Student Name "
                value={studentName}
                onChangeText={(text) => setStudentName(text)}
                editable={isEditable}
              />

              {errors &&
                errors["student_name"] &&
                errors["student_name"][0] && (
                  <Text style={{ color: "red", fontSize: 14 }}>
                    {errors["student_name"][0]}
                  </Text>
                )}
            </View>

            <View style={styles.inputGroup}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Student ID Number </Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  !isEditable ? { backgroundColor: "#f0f0f0" } : null,
                ]}
                placeholder="Enter Student ID Number"
                value={studentId}
                onChangeText={(text) => setStudentId(text)}
                editable={isEditable}
              />

              {errors && errors["student_id"] && errors["student_id"][0] && (
                <Text style={{ color: "red", fontSize: 14 }}>
                  {errors["student_id"][0]}
                </Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Guardian Name </Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  !isEditable ? { backgroundColor: "#f0f0f0" } : null,
                ]}
                placeholder="Enter Guardian Name"
                value={guardianName}
                onChangeText={(text) => setGuardianName(text)}
                editable={isEditable}
              />

              {errors &&
                errors["guardian_name"] &&
                errors["guardian_name"][0] && (
                  <Text style={{ color: "red", fontSize: 14 }}>
                    {errors["guardian_name"][0]}
                  </Text>
                )}
            </View>

            <View style={styles.inputGroup}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Guardian Phone Number </Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  !isEditable ? { backgroundColor: "#f0f0f0" } : null,
                ]}
                placeholder="Enter Guardian Phone Number"
                value={guardianPhoneNumber}
                onChangeText={(text) => setguardianPhoneNumber(text)}
                editable={isEditable}
              />

              {errors &&
                errors["guardian_phone_number"] &&
                errors["guardian_phone_number"][0] && (
                  <Text style={{ color: "red", fontSize: 14 }}>
                    {errors["guardian_phone_number"][0]}
                  </Text>
                )}
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.label}>Time </Text>
                  <Text style={{ color: "red" }}>*</Text>
                </View>

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

                {errors && errors["time"] && errors["time"][0] && (
                  <Text style={{ color: "red", fontSize: 14 }}>
                    {errors["time"][0]}
                  </Text>
                )}

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
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.label}>Location </Text>
                  <Text style={{ color: "red" }}>*</Text>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Enter Location"
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                />

                {errors && errors["location"] && errors["location"][0] && (
                  <Text style={{ color: "red", fontSize: 14 }}>
                    {errors["location"][0]}
                  </Text>
                )}
              </View>
            </View>

            <View style={[styles.inputGroup, { zIndex: 1000 }]}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Violations </Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>

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

              {errors &&
                errors["violation_name"] &&
                errors["violation_name"][0] && (
                  <Text style={{ color: "red", fontSize: 14 }}>
                    {errors["violation_name"][0]}
                  </Text>
                )}
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

            <View style={styles.imageContainer}>
              {report?.image ? (
                <Image source={report.image} style={styles.image} />
              ) : (
                <Text style={styles.noImageText}>No image available</Text>
              )}
            </View>

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

            <Icon
              name="camera"
              size={45}
              color="gray"
              style={{ marginBottom: 10 }}
            />

            <View style={styles.btnContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#228b22" />
              ) : (
                <Button title="Update" color="#228b22" onPress={handleSubmit} />
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditReportScreen;

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

  imageContainer: {
    width: 275,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
});
