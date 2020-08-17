import { StyleSheet } from "react-native";
import store from "~/store";
const { theme } = store.getState();
import { hp, wp } from "~/utils/screen-size";
export const getCardStyle = (height: any) => {
  const cardStyle = StyleSheet.create({
    card: {
      color: "#fff",
      position: "absolute",
      width: wp(96),
      alignSelf: "center",
      bottom: wp(2),
      zIndex: 100,
      elevation: 15,
    },
  });
  return cardStyle;
};

const styles = StyleSheet.create({
  modalButton: {
    color: theme.fontColor,
    fontWeight: "bold",
    height: 50,
    justifyContent: "space-around",
    borderWidth: 1.5,
    borderColor: theme.primary,
    backgroundColor: theme.background,
  },
  card: {
    color: "#fff",
    position: "absolute",
    width: wp(96),
    alignSelf: "center",
    bottom: wp(2),
    zIndex: 100,
    elevation: 15,
  },
  baseFab: {
    backgroundColor: theme.primary,
    color: "#fff",
  },
  distanceFab: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    backgroundColor: theme.primary,
    marginLeft: hp(1.5),
  },
  searchFab: {
    backgroundColor: theme.primary,
    color: "#fff",
    //height: hp(6),
    //width: wp(30),
    //borderRadius: wp(25),
    alignSelf: "center",
    position: "absolute",
    margin: hp(3.5),
    bottom: 0,
  },
  myFamilyFab: {
    backgroundColor: theme.primary,
    color: "#fff",
    position: "absolute",
    marginBottom: hp(3.5), //3.5
    marginLeft: wp(3.5),
    bottom: 0,
  },
  accountFab: {
    backgroundColor: theme.primary,
    color: "#fff",
    position: "absolute",
    marginBottom: hp(3.5), //3.5
    marginLeft: wp(81.5),
    bottom: 0,
  },
  exitFab: {
    backgroundColor: theme.primary,
    color: "#fff",
    position: "absolute",
    marginBottom: hp(3.5), //3.5
    marginLeft: wp(81.5),
    bottom: 0,
  },
  fabText: {
    height: hp(6),
    width: wp(30),
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
  },
  surface: {
    alignSelf: "center",
    position: "absolute",
    margin: hp(2),
    bottom: 0,
    borderRadius: wp(25),
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  filterButton: {
    marginTop: hp(2),
    borderWidth: 1.5,
    borderColor: theme.primary,
    backgroundColor: theme.background,
  },
  filterButtonText: {
    color: theme.primary,
  },
  filterButtonActive: {
    marginTop: hp(2),
    borderWidth: 1.5,
    borderColor: theme.primary,
    backgroundColor: theme.primary,
  },
  filterButtonTextActive: {
    color: theme.background,
  },
  filterTabActive: {
    height: hp(30),
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: theme.background,
  },
  filterTab: {
    height: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: theme.background,
  },
  buttonText: {
    color: theme.primary,
    margin: 10,
  },
});

export default styles;
