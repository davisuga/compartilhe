import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",

        height: 50,
        flexDirection: "row",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        flex: 1,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: { flex: 1, flexGrow: 7 },
});
