import React from "react";
import { View, Image, Text } from "react-native";
import { Button, FAB, TouchableRipple } from "react-native-paper";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import style from "../style";
import { useSafeArea } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  "pt-BR": { searchOffers: "Pesquise ofertas", next: "avançar" },

  en: { searchOffers: "Search offers", next: "NEXT" },
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const StepOne: React.FC = ({ navigation }) => {
  const { top } = useSafeArea();
  return (
    <LinearGradient
      colors={["#21B685", "#C9D143"]}
      style={{
        paddingTop: top,
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View />
      <Image source={require("../../../assets/images/logo_white.png")} />
      <TouchableRipple
        style={style.nextButton}
        onPress={() => {
          navigation.navigate("OnboardingOne");
        }}
      >
        <Text style={style.nextText}>{i18n.t("next")}</Text>
      </TouchableRipple>
    </LinearGradient>
  );
};

export default StepOne;
