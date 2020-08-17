import Onboarder from "components/Onboarder.tsx";
// Set the key-value pairs for the different languages you want to support.
import React from "react";
const StepTwo: React.FC = ({ navigation }) => {
    const translations = {
        "pt-BR": {
            mainText: "... ou na sua distância até a oferta!",
            next: "AVANÇAR",
        },

        en: { mainText: "View an interactive map with offers!", next: "NEXT" },
    };

    return (
        <Onboarder
            navigation={navigation}
            imageSource={require("../../../assets/images/SliderMenu4x.png")}
            icon={"radar"}
            nextScreen="OnboardingFive"
            translations={translations}
        />
    );
};

export default StepTwo;
