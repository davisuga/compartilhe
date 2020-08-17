import React from "react";
import { View, Image, Text } from "react-native";
import { Button, FAB } from "react-native-paper";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { useSafeArea } from "react-native-safe-area-context";
// Set the key-value pairs for the different languages you want to support.

// Set the locale once at the beginning of your app.

import { StyleSheet } from "react-native";
import store from "~/store";
const { theme } = store.getState();
import { hp, wp } from "~/utils/screen-size";

const style = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    width: wp(100),
    height: hp(60),
  },
  mainText: {
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

const Step: React.FC = ({
  navigation,
  imageSource,
  icon,
  nextScreen,
  translations,
}) => {
  i18n.translations = translations;
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
  const { top } = useSafeArea();
  return (
    <View style={[style.container, { paddingTop: top }]}>
      <Image resizeMode="contain" style={style.image} source={imageSource} />

      <Text style={style.mainText}>{i18n.t("mainText")}</Text>
      <FAB color="white" style={style.icon} icon={icon}></FAB>
      <Button
        style={style.nextButton}
        onPress={() => {
          navigation.navigate(nextScreen);
        }}
        mode="contained"
      >
        <Text style={style.nextText}>{i18n.t("next")}</Text>
      </Button>
    </View>
  );
};

export default Step;
