import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const colors = {
  black: "#000000",
  gray: "#888888",
  background1: "#222222",
  background2: "#222222",
};

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollview: {
    flex: 1,
  },
  exampleContainer: {
    backgroundColor: "#222222",
    flex: 1,
    alignContent: "space-between",
  },
  exampleContainerDark: {
    backgroundColor: colors.black,
  },
  exampleContainerLight: {
    backgroundcolor: theme.fontColor,
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleDark: {
    color: colors.black,
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 13,
    fontStyle: "italic",
    textAlign: "center",
  },
  slider: {
    marginTop: hp(4),
    overflow: "visible", // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 0, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});
