import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { hp, wp } from "~/utils/screen-size";
import store from "~/store";
const { theme } = store.getState();

const styles = StyleSheet.create({
    bottomView: {
        marginBottom: hp(20),
    },
    button: {
        marginHorizontal: wp(7),
        marginVertical: hp(2),
        backgroundColor: theme.background,
        color: theme.primary,
    },
    email: {
        marginTop: hp(1),
        marginHorizontal: wp(0),
        backgroundColor: theme.background,
        color: theme.primary,
    },
    emailContainer: {
        borderBottomColor: theme.primary,
        borderBottomWidth: 2,
        borderRadius: 10,
        marginHorizontal: wp(7),
    },
    title: {
        fontSize: RFPercentage(6),
        lineHeight: RFPercentage(6),
        marginLeft: wp(7),
        marginRight: wp(7),
        color: "#fff",
        textAlign: "left",
        marginTop: hp(10),
    },
    subtitle: {
        fontSize: RFPercentage(3),
        lineHeight: RFPercentage(3),
        marginLeft: wp(7),
        marginRight: wp(7),
        color: "#fff",
        textAlign: "left",
        marginTop: hp(1),
    },
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    liftedContainer: {
        flex: 1,
        backgroundColor: theme.background,
    },
});

export default styles;
