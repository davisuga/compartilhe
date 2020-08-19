import { StyleSheet } from "react-native";
import store from "~/store";
const { theme } = store.getState();
import { hp, wp } from "~/utils/screen-size";
import * as Font from "expo-font";
const fetchFonts = () => {
  return Font.loadAsync({
    "axiforma-bold": require("~/assets/fonts/axiforma-bold.otf"),
  });
};
fetchFonts();
export default StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    width: wp(100),
    height: hp(95),
    position: "absolute",
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
    height: hp(7),
    justifyContent: "center",
    marginBottom: hp(7),
    marginHorizontal: hp(7),
    backgroundColor: theme.background,
    borderRadius: 50,
    zIndex: 100,
    alignItems: "center",
    minWidth: wp(70),
  },
  nextText: {
    fontSize: 30,
    color: theme.primary,
    margin: 5,
    fontFamily: "axiforma-bold",
  },
});
