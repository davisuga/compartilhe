import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Svg, { Ellipse } from "react-native-svg";

function OrgConfirmCode() {
  const [codeInput, setCodeInput] = useState(0);
  const [failedTry, setFailedTry] = useState(false);

  confirm = async () => {
    const code = await fetchData("code");
    const loginType = await fetchData("loginType");
    if (code === codeInput) {
      this.props.navigate("OrgHub");
    } else if ((code = !codeInput)) {
      setFailedTry(true);
    }
  };
  resend = () => {
    console.log("reenviando email...");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/icon.png")}
        resizeMode="contain"
        style={styles.image}
        imageStyle={styles.image_imageStyle}
      />
      <Text style={styles.qualEoSeuEmail}>
        Te enviamos um código no email, digite ele abaixo para confirmar!
      </Text>
      <Text style={{ color: "red" }}>
        {failedTry ? "Código incorreto :/" : ""}
      </Text>

      <View style={styles.rect}>
        <TextInput
          placeholder=""
          value={codeInput}
          onChange={(code) => setCodeInput(code)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.buttonStack}>
        <TouchableOpacity style={styles.button} onPress={resend()} />
        <Text style={styles.naoRecebi}>Não recebi :/</Text>
      </View>
      <View style={styles.iconStack}>
        <Icon name="chevron-small-right" style={styles.icon} />
        <Svg viewBox="0 0 74.00 74.00" style={styles.ellipse}>
          <Ellipse
            strokeWidth={2}
            fill="rgba(0,0,0,0)"
            stroke="rgba(255,255,255,1)"
            cx={37}
            cy={37}
            rx={36}
            ry={36}
          />
        </Svg>
        <TouchableOpacity onPress={() => confirm()} style={styles.button2} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,100,0,1)",
  },
  image: {
    width: 227,
    height: 75,
    marginTop: 65,
    marginLeft: 68,
  },
  qualEoSeuEmail: {
    width: 285,
    height: 169,
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    fontFamily: "roboto-regular",
    textAlign: "left",
    marginTop: 60,
    alignSelf: "center",
  },
  rect: {
    width: 295,
    height: 69,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 0,
    marginTop: 9,
    marginLeft: 34,
  },
  textInput: {
    width: 295,
    height: 48,
    color: "#121212",
    fontSize: 30,
    fontFamily: "roboto-regular",
    marginTop: 10,
  },
  button: {
    top: 0,
    left: 0,
    width: 168,
    height: 36,
    position: "absolute",
    borderRadius: 3,
    borderColor: "#000000",
    borderWidth: 0,
  },
  naoRecebi: {
    top: 4,
    left: 4,
    width: 171,
    height: 37,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 25,
    fontFamily: "roboto-regular",
  },
  buttonStack: {
    width: 175,
    height: 41,
    marginTop: 19,
    marginLeft: 34,
  },
  icon: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 74,
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 74,
    height: 74,
    position: "absolute",
  },
  button2: {
    top: 0,
    left: 0,
    width: 74,
    height: 74,
    position: "absolute",
  },
  iconStack: {
    width: 74,
    height: 74,
    marginTop: 209,
    marginLeft: 279,
  },
});

export default OrgConfirmCode;
