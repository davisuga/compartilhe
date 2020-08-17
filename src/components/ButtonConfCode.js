import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import store from "~/store";
const { theme } = store.getState();
export default class ButtonConfCode extends Component {
  render() {
    return (
      <TouchableOpacity
        {...this.props}
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}
      >
        <Text style={styles.caption}>Confirmar</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    borderRadius: 5,
  },
  caption: {
    color: "#fff",
    fontSize: 20,
  },
});
