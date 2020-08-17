import React, { useEffect, useCallback, useRef } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { fetchData, unstring } from "../../storage";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00001d",
    },
});
export default ({ navigation }) => {
    const componentIsMounted = useRef(true);
    useEffect(() => {
        if (componentIsMounted) {
            verifyLogin();
        }
        return () => {
            componentIsMounted.current = false;
        };
    }, []);
    const verifyLogin = useCallback(async () => {
        let isLogged = await fetchData("logged");
        let loginType = await fetchData("loginType");
        loginType = unstring(loginType);
        if (isLogged == "true" && loginType == "refugee") {
            console.log("navegando para mapscreen...");

            navigation.navigate("MapScreen");
        }
    });

    return (
        <View style={styles.container}>
            <View>
                <ActivityIndicator />
            </View>
        </View>
    );
};
