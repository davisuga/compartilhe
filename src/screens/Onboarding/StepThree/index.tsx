import Onboarder from "components/Onboarder.tsx";
// Set the key-value pairs for the different languages you want to support.
import React from "react";
const StepThree: React.FC = ({ navigation }) => {
    const translations = {
        "pt-BR": {
            mainText: "Filtre ofertas baseado na sua necessidade!",
            next: "AVANÇAR",
        },

        en: { mainText: "Filter offers based on your need!!", next: "NEXT" },
    };

    return (
        <Onboarder
            navigation={navigation}
            imageSource={require("../../../assets/images/NeedSelector4x.png")}
            icon={"filter"}
            nextScreen="OnboardingFour"
            translations={translations}
        />
    );
};

export default StepThree;
