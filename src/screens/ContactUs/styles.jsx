import { StyleSheet, Dimensions } from "react-native";
import store from "../../store";
const { theme } = store.getState();
import { hp, wp } from "~/utils/screen-size.ts";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    flex: 1,
  },
  titleText: {
    margin: hp(2),
    fontWeight: "bold",
    fontSize: 60,
    color: "#ffffff",
  },
  emailText: {
    marginTop: hp(2),
    fontWeight: "bold",
    fontSize: 25,
    color: "#ffffff",
  },
  button: {
    height: hp(6),
    width: wp(85),
    marginTop: hp(1),
    justifyContent: "center",
    alignItems: `flex-start`,
    backgroundColor: theme.background,
  },
  buttonText: {
    color: theme.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default styles;
