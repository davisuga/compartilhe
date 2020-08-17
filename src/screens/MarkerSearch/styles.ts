import { StyleSheet, Dimensions } from "react-native";
import { hp, wp } from "~/utils/screen-size";
import store from "~/store";
const { theme } = store.getState();

export const styles = StyleSheet.create({
  flutterFab: {
    backgroundColor: theme.primary || "#000",
    color: "#fff",
    position: "absolute",
    marginBottom: hp(3.5), //3.5
    marginLeft: wp(76.5),
    bottom: 0,
    zIndex: 100,
  },
});
