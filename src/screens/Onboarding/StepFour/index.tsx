import React from "react";
import { View, Image, Text } from "react-native";
import { TouchableRipple, FAB } from "react-native-paper";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import style from "../style";
import { useSafeArea } from "react-native-safe-area-context";
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
    <View
      style={[style.container, { paddingTop: top, justifyContent: "flex-end" }]}
    >
      <TouchableRipple
        style={style.nextButton}
        onPress={() => {
          navigation.navigate("OnboardingFive");
        }}
      >
        <Text style={style.nextText}>{i18n.t("next")}</Text>
      </TouchableRipple>
      <Image
        resizeMode="cover"
        style={style.image}
        source={require("../../../assets/images/Onboarding4.png")}
      />
    </View>
  );
};

export default StepOne;
