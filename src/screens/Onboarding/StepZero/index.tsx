import React from "react";
import { View, Image, Text } from "react-native";
import { Button, FAB, TouchableRipple } from "react-native-paper";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import style from "../style";
import { useSafeArea } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { hp, wp } from "~/utils/screen-size";

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
    const compartilheLogo = require("../../../assets/images/logo_white.png");
    const alphaLogo = require("../../../assets/images/alpha.png");
    const cumminsLogo = require("../../../assets/images/cummins.png");

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
            <Image source={compartilheLogo} />
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    backgroundColor: "#f00",
                    maxHeight: 0,
                }}
            >
                <Image
                    style={{ height: 100, marginRight: 5, maxWidth: wp(60) }}
                    resizeMode="contain"
                    source={alphaLogo}
                />
                <Image
                    style={{ height: 70 }}
                    resizeMode="contain"
                    source={cumminsLogo}
                />
            </View>
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
