import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default class ButtonConfNotSend extends Component {
    render() {
        return (
            <TouchableOpacity
                style={[styles.container, this.props.style]}
                onPress={this.props.onPress}
            >
                <Text style={styles.caption}>
                    No recibí el código de verificación
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(52, 52, 52, 0.0)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 16,
        paddingLeft: 16,
        borderRadius: 5
    },
    caption: {
        color: "#000",
        fontSize: 16
    }
});
