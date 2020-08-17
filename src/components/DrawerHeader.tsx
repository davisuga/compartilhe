import React from "react";
import { View, Image, Dimensions } from "react-native";
import { FAB } from "react-native-paper";
import { DrawerActions } from "react-navigation-drawer";
import { useSafeArea } from "react-native-safe-area-context";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const hp = percentage => {
    return (screenHeight / 100) * percentage;
};

const wp = percentage => {
    return (screenWidth / 100) * percentage;
};

export default function components(navigation) {
    const insets = useSafeArea();

    return (
        <View
            style={{
                alignSelf: "flex-start",
                position: "absolute",
                top: insets.top,
                margin: hp(1.5),
                zIndex: 1
            }}
        >
            <FAB
                style={{
                    backgroundColor: "#ff7043"
                }}
                small
                icon="menu"
                onPress={() =>
                    navigation.navigation.dispatch(DrawerActions.openDrawer())
                }
                color="#fff"
            />
        </View>
    );
}
