import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import { FAB } from "react-native-paper";
import { useSafeArea } from "react-native-safe-area-context";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;
import store from "~/store";
const { theme } = store.getState();

const hp = (percentage) => {
  return (screenHeight / 100) * percentage;
};

const wp = (percentage) => {
  return (screenWidth / 100) * percentage;
};

export default function ContactUs({ navigation }) {
  const insets = useSafeArea();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, alignItems: "center" },
      ]}
    >
      <ScrollView>
        <TouchableOpacity
          style={styles.button}
          small
          icon="menu"
          onPress={() => navigation.navigate("MapScreen")}
          color="#fff"
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={theme.primary}
          />
        </TouchableOpacity>

        <Text style={styles.titleText}>Contacto</Text>
        <Text style={styles.emailText}>Problemas técnicos</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL("mailto:tecnologia@compartilhe.today")}
        >
          <Text style={styles.buttonText}>tecnologia@compartilhe.today</Text>
        </TouchableOpacity>

        <Text style={styles.emailText}>ONG</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL("mailto:ong@compartilhe.today")}
        >
          <Text style={styles.buttonText}>ong@compartilhe.today</Text>
        </TouchableOpacity>

        <Text style={styles.emailText}>Refugiado</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL("mailto:refugiado@compartilhe.today")}
        >
          <Text style={styles.buttonText}>refugiado@compartilhe.today</Text>
        </TouchableOpacity>

        <Text style={styles.emailText}>Voluntario</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL("mailto:voluntario@compartilhe.today")}
        >
          <Text style={styles.buttonText}>voluntario@compartilhe.today</Text>
        </TouchableOpacity>

        <Text style={styles.emailText}>Donante</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL("mailto:doador@compartilhe.today")}
        >
          <Text style={styles.buttonText}>donante@compartilhe.today</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
