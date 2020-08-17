import React, { useEffect } from "react";
import { Appbar, TextInput, FAB } from "react-native-paper";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
// import { Container } from './styles';
import { fetchData, storeData } from "../../../storage";

export default function UserProfile({ navigation }) {
  const username = useSelector((state) => state.user.name);
  useEffect(() => {
    fetchData("memberDetails").then((memberDetails) => {
      const { name, age } = JSON.parse(memberDetails)[0];
    });

    return () => {
      console.log("");
    };
  }, []);
  return (
    <View style={styles.container}>
      <Appbar style={{ height: hp("8%"), justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require("../../../assets/images/icon.png")}
            resizeMode="contain"
            resizeMethod="auto"
            style={{
              height: hp("4%"),
              alignSelf: "flex-end",
              width: hp("4%"),
              alignSelf: "center",
              marginLeft: wp("3%"),
            }}
          />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/images/icon.png")}
          resizeMode="contain"
          resizeMethod="auto"
          style={{
            height: hp("10%"),
            alignSelf: "flex-end",
            width: hp("10%"),
            alignSelf: "center",
          }}
        />
        <Appbar.Action icon="more-vert" onPress={() => {}} color="#fff" />
      </Appbar>
      <View style={{ height: hp("92%") }}>
        <TextInput
          label="Nome"
          value={username}
          style={styles.textInputProfile}
          mode="outlined"
          theme={{ colors: { placeholder: "#888", text: "#aaa" } }}
        />
        <FAB
          style={styles.fab}
          icon="edit"
          onPress={() => console.log("Pressed")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242f3e",
  },
  textInputProfile: {
    backgroundColor: "#242f3e",
    width: wp("90%"),
    alignSelf: "center",
    marginTop: hp("2%"),
  },
  fab: {
    position: "absolute",
    right: wp("4%"),
    bottom: hp("6%"),
    backgroundColor: "#ff7043",
  },
});
