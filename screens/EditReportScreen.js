import React, { useEffect, useState } from "react";
import {
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

const EditReportScreen = () => {
  const report = [
    { id: 1, name: "Violation Report 1", image: null },
    { id: 2, name: "Violation Report 2", image: null },
    { id: 3, name: "Violation Report 3", image: null },
    { id: 4, name: "Violation Report 4", image: null },
    { id: 5, name: "Violation Report 5", image: null },
  ];

  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const [program, setProgram] = useState(null);
  const [programs, setPrograms] = useState([
    { label: "Select Program", value: "" },
    { label: "BSIT", value: "bsit" },
    { label: "BSCS", value: "bscs" },
  ]);

  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [department, setDepartment] = useState(null);
  const [departments, setDepartments] = useState([
    { label: "Select Department", value: "" },
    { label: "Engineering Department", value: "Engineering Department" },
    { label: "Business & Economics", value: "Business & Economics" },
  ]);

  const [isYearLevel, setIsYearLevel] = useState(false);
  const [Year, setYear] = useState(null);
  const [Years, setYears] = useState([
    { label: "Select Year", value: "" },
    { label: "First Year", value: "First Year" },
    { label: "Second Year", value: "Second Year" },
    { label: "Third Year", value: "Third Year" },
    { label: "Fourt Year", value: "Fourth Year" },
  ]);

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

  // Inappropriate Civilian Attire Violation
  const [croptop, setCroptop] = useState(false);
  const [shorts, setShorts] = useState(false);
  const [miniSkirt, setMiniSkirt] = useState(false);
  const [leggings, setLeggings] = useState(false);
  const [tatteredJeans, setTatteredJeans] = useState(false);
  const [sandalsSlippers, setSandalsSlippers] = useState(false);

  // Hair Violation
  const [longHiar, setLongHiar] = useState(false);
  const [coloredHair, setColoredHair] = useState(false);
  const [improperHaircutHairStyle, setImproperHaircutHairStyle] =
    useState(false);

  // Incomplete Uniform for Criminology Violation
  const [lanyard, setLanyard] = useState(false);
  const [whistle, setWhistle] = useState(false);
  const [namePlate, setNamePlate] = useState(false);
  const [belt, setBelt] = useState(false);
  const [charol, setCharol] = useState(false);

  // Not Wearing Prescribed Uniform Violation
  const [noPatch, setNoPatch] = useState(false);
  const [noNecktie, setNoNecktie] = useState(false);
  const [blackOrOtherPants, setBlackOrOtherPants] = useState(false);
  const [coloredFootSocks, setColoredFootSocks] = useState(false);
  const [unofficialPeOrOrgShirt, setUnofficialPeOrOrgShirt] = useState(false);
  const [
    wearingPeUniformOtherThanPeClassOrTime,
    setWearingPeUniformOtherThanPeClassOrTime,
  ] = useState(false);
  const [
    wearingRubberShoesOtherThanPeClassOrTime,
    setWearingRubberShoesOtherThanPeClassOrTime,
  ] = useState(false);
  const [
    enteringTheCampusWithoutTheOfficialId,
    setEnteringTheCampusWithoutTheOfficialId,
  ] = useState(false);
  const [usingUnofficialId, setUsingUnofficialId] = useState(false);
  const [usingSomeonesId, setUsingSomeonesId] = useState(false);
  const [idTampering, setIdTampering] = useState(false);
  const [usingUnofficialIdLace, setUsingUnofficialIdLace] = useState(false);
  const [noIdLace, setNoIdLace] = useState(false);

  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setTime(selectedDate);
  };

  const handleReset = () => {
    setCroptop(false);
    setShorts(false);
    setMiniSkirt(false);
    setLeggings(false);
    setTatteredJeans(false);
    setSandalsSlippers(false);

    setLongHiar(false);
    setColoredHair(false);
    setImproperHaircutHairStyle(false);

    setLanyard(false);
    setWhistle(false);
    setNamePlate(false);
    setBelt(false);
    setCharol(false);

    setNoPatch(false);
    setNoNecktie(false);
    setBlackOrOtherPants(false);
    setColoredFootSocks(false);
    setUnofficialPeOrOrgShirt(false);
    setWearingPeUniformOtherThanPeClassOrTime(false);
    setWearingRubberShoesOtherThanPeClassOrTime(false);
    setEnteringTheCampusWithoutTheOfficialId(false);
    setUsingUnofficialId(false);
    setUsingSomeonesId(false);
    setIdTampering(false);
    setUsingUnofficialIdLace(false);
    setNoIdLace(false);
  };

  useEffect(() => {
    handleReset();
  }, [violation]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
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

            <View style={[styles.inputGroup, { zIndex: 1000 }]}>
              <Text style={styles.label}>Year</Text>
              <DropDownPicker
                open={isYearLevel}
                value={Year}
                items={Years}
                setOpen={setIsYearLevel}
                setValue={setYear}
                setItems={setYears}
                placeholder="Select Year"
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
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Student ID Number</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter Student ID Number"
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
                <TextInput style={styles.input} placeholder="Enter Location" />
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
                      checked={croptop}
                      onPress={() => setCroptop(!croptop)}
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Shorts"
                      checked={shorts}
                      onPress={() => setShorts(!shorts)}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Mini-Skirt"
                      checked={miniSkirt}
                      onPress={() => setMiniSkirt(!miniSkirt)}
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Leggings"
                      checked={leggings}
                      onPress={() => setLeggings(!leggings)}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Tattered Jeans"
                      checked={tatteredJeans}
                      onPress={() => setTatteredJeans(!tatteredJeans)}
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Sandals/Slippers"
                      checked={sandalsSlippers}
                      onPress={() => setSandalsSlippers(!sandalsSlippers)}
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
                      checked={longHiar}
                      onPress={() => setLongHiar(!longHiar)}
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Colored Haird"
                      checked={coloredHair}
                      onPress={() => setColoredHair(!coloredHair)}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Improper Haircut/HairStyle"
                      checked={improperHaircutHairStyle}
                      onPress={() =>
                        setImproperHaircutHairStyle(!improperHaircutHairStyle)
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
                      checked={lanyard}
                      onPress={() => setLanyard(!lanyard)}
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Whistle"
                      checked={whistle}
                      onPress={() => setWhistle(!whistle)}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Nameplate"
                      checked={namePlate}
                      onPress={() => setNamePlate(!namePlate)}
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Belt"
                      checked={belt}
                      onPress={() => setBelt(!belt)}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Charol"
                      checked={charol}
                      onPress={() => setCharol(!charol)}
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
                      checked={noPatch}
                      onPress={() => setNoPatch(!noPatch)}
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="No Necktie"
                      checked={noNecktie}
                      onPress={() => setNoNecktie(!noNecktie)}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Black or Other Pants"
                      checked={blackOrOtherPants}
                      onPress={() => setBlackOrOtherPants(!blackOrOtherPants)}
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Colored Footsocks"
                      checked={coloredFootSocks}
                      onPress={() => setColoredFootSocks(!coloredFootSocks)}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Unofficial PE or ORG Shirt"
                      checked={unofficialPeOrOrgShirt}
                      onPress={() =>
                        setUnofficialPeOrOrgShirt(!unofficialPeOrOrgShirt)
                      }
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Wearing PE Uniform, Other Than PE Class(IS) or Time(COLLEGE)"
                      checked={wearingPeUniformOtherThanPeClassOrTime}
                      onPress={() =>
                        setWearingPeUniformOtherThanPeClassOrTime(
                          !wearingPeUniformOtherThanPeClassOrTime
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
                      checked={wearingRubberShoesOtherThanPeClassOrTime}
                      onPress={() =>
                        setWearingRubberShoesOtherThanPeClassOrTime(
                          !wearingRubberShoesOtherThanPeClassOrTime
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
                      checked={enteringTheCampusWithoutTheOfficialId}
                      onPress={() =>
                        setEnteringTheCampusWithoutTheOfficialId(
                          !enteringTheCampusWithoutTheOfficialId
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
                      checked={usingUnofficialId}
                      onPress={() => setUsingUnofficialId(!usingUnofficialId)}
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Using Someone's ID"
                      checked={usingSomeonesId}
                      onPress={() => setUsingSomeonesId(!usingSomeonesId)}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="ID Tampering"
                      checked={idTampering}
                      onPress={() => setIdTampering(!idTampering)}
                    />
                  </View>

                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="No ID Lace"
                      checked={noIdLace}
                      onPress={() => setNoIdLace(!noIdLace)}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.inputGroupCheckBox, { flex: 1 }]}>
                    <CheckBox
                      checkedColor="#228b22"
                      title="Using Unofficial ID Lace"
                      checked={usingUnofficialIdLace}
                      onPress={() =>
                        setUsingUnofficialIdLace(!usingUnofficialIdLace)
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
              />
            </View>

            <Icon
              name="camera"
              size={45}
              color="gray"
              style={{ marginBottom: 10 }}
            />

            <View style={styles.btnContainer}>
              <Button
                title="Save"
                color="#228b22"
                onPress={() => navigation.navigate("Tabs Screen")}
              />
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
