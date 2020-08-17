import React, { useState } from "react";
import { StyleSheet, Image, Text, TextInput, Dimensions } from "react-native";
import ButtonConfCode from "../../../components/ButtonConfCode";
import ButtonConfNotSend from "../../../components/ButtonConfNotSend";

import { SafeAreaView } from "react-native";
import { fetchData, storeData, unstring } from "../../../storage";
import { Button } from "react-native-paper";

import { hp, wp } from "~/utils/screen-size";
import store from "~/store";
const { theme } = store.getState();

export default ({ navigation }) => {
  const [inputCode, setInputCode] = useState("");
  const [failedWarn, setFailedWarn] = useState(false);

  const checkCode = async () => {
    console.log("checkcode");
    const numberInputCode: number = JSON.parse(inputCode);
    let codeRaw = await fetchData("code");
    let code: number = JSON.parse(codeRaw) || 1;

    console.log("codigo dentro do fetch ta:", code.toString());
    console.log(`foi inserido: ${inputCode.toString()}`);

    if (code != numberInputCode) {
      setFailedWarn(true);
    } else if (code == numberInputCode) {
      console.log("loggando usuário...");
      storeData("logged", true);
      console.log(`Navegando para mapscreen...`);
      navigation.navigate("MapScreen");
    } else {
      setFailedWarn(true);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../assets/images/compartilhe.png")}
        resizeMode="contain"
        style={styles.LogoSavi}
      />
      <Text style={{ color: theme.fontColor }}>Insira el código</Text>
      <TextInput
        multiline
        value={inputCode}
        style={styles.CodeInput}
        onChangeText={(code) => setInputCode(code)}
        keyboardType="numeric"
      />
      <Text style={{ color: "red" }}>
        {failedWarn ? "Código incorrecto :/" : ""}
      </Text>
      <Button
        color="white"
        style={styles.continueButton}
        onPress={() => checkCode()}
      >
        Confirmar
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  plus: {
    color: "#fff",
    fontSize: 20,
    textAlignVertical: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: theme.background,
  },
  LogoSavi: {
    width: wp(80),
    height: hp(30),
    alignSelf: "center",
    justifyContent: "flex-start",
    marginTop: hp(10),
  },
  DescSavi: {
    color: "#fff",
    alignSelf: "flex-start",
    paddingRight: hp(7),
    paddingLeft: hp(7),
    fontSize: 24,
    textAlign: "center",
  },
  CodeInput: {
    marginTop: hp(3),
    width: wp(80),
    height: hp(7),
    color: "#fff",
    fontSize: 30,
    alignSelf: "center",
    backgroundColor: theme.background,
    textAlign: "center",
    borderRadius: 5,
    fontWeight: "bold",
    borderWidth: 2,
    borderColor: theme.primary,
  },
  DescNumber: {
    color: "#fff",
    alignSelf: "center",
    marginBottom: hp(2),
    fontSize: 20,
    textAlign: "center",
    marginTop: hp(7),
  },
  continueButton: {
    justifyContent: "center",
    width: wp(40),
    height: hp(6),
    alignSelf: "center",
    marginTop: hp(5),
    backgroundColor: theme.primary,
  },
  confNotSendButton: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: hp(3),
  },
  DescTerms: {
    color: "#fff",
    paddingRight: wp(5),
    paddingLeft: wp(5),
    fontSize: 16,
    textAlign: "center",
    marginBottom: hp(2),
  },
});
