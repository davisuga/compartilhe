import React, { useEffect } from "react";
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from "react-native";
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
export const AuthLoadingScreen = (props) => {
    useEffect(() => {
        _bootstrapAsync();
    }, []);
    // Fetch the token from storage then navigate to our appropriate place
    const _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem("logged");
        console.log("userToken at AuthLoading: ", userToken);
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        props.navigation.navigate(userToken ? "LoggedFlow" : "AuthFlow");
    };

    // Render any loading content that you like here
    return (
        <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    );
};
export default AuthLoadingScreen;
