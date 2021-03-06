import React from "react";
import { Text, View, StyleSheet } from "react-native";
// import { Container } from './styles';
import { RFPercentage } from "react-native-responsive-fontsize";
import store from "~/store";
const { theme } = store.getState();
import { hp, wp } from "~/utils/screen-size";
import { TextInput } from "react-native-paper";

interface IProps {
  value: string;
  helperText: string;
  onChangeText: Function;
}

export default function components({
  value,
  helperText,
  onChangeText,
}: IProps) {
  return (
    <>
      <Text style={styles.helperText}>{helperText}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          mode="flat"
          placeholderTextColor="#ffffff"
          style={styles.input}
          placeholder={helperText}
          value={value}
          accessibilityStates
          onChangeText={(typedText) => onChangeText(typedText)}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    color: theme.primary,
    fontSize: RFPercentage(2.5),
    borderColor: "#fff",
    backgroundColor: "#0000",
  },

  inputContainer: {
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 5,
  },
  helperText: {
    fontWeight: "bold",
  },
});
