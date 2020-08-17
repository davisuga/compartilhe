import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "./index.style";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const slideHeight = viewportHeight * 0.9;
const slideWidth = wp("90%");
const itemHorizontalMargin = wp("2%");

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
export const padBottom = viewportHeight * 0.11;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: padBottom, // needed for shadow
  },
  shadow: {
    position: "absolute",
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius,
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: "#222222",
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageContainerEven: {
    backgroundColor: "#222222",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: "black",
  },
  radiusMaskEven: {
    backgroundColor: colors.black,
  },
  textContainer: {
    justifyContent: "center",
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "black",
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  textContainerEven: {
    backgroundColor: colors.black,
  },
  title: {
    color: theme.fontColor,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  titleEven: {
    color: theme.fontColor,
  },
  subtitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 12,
    fontStyle: "italic",
  },
  subtitleEven: {
    color: "rgba(255, 255, 255, 0.7)",
  },
});
