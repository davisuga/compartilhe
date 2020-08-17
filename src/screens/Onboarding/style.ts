import { StyleSheet } from "react-native";
import store from "~/store";
const { theme } = store.getState();
import { hp, wp } from "~/utils/screen-size";

export default StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    width: wp(100),
    height: hp(60),
  },
  descriptionText: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.fontColor,
    alignSelf: "center",
  },
  icon: {
    alignSelf: "center",
  },
  nextButton: {
    height: hp(14),
    justifyContent: "center",
  },
  nextText: {
    fontSize: 36,
    color: theme.fontColor,
    fontWeight: "bold",
  },
});
