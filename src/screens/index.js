// import AuthLoading from "./AuthLoading";
import ConfNumber from "./Conf/ConfNumber";
import ConfCode from "./Conf/ConfCode";
import OnboardingOne from "./Onboarding/StepOne";
import OnboardingZero from "./Onboarding/StepZero";

import OnboardingTwo from "./Onboarding/StepTwo";
import OnboardingThree from "./Onboarding/StepThree";
import OnboardingFour from "./Onboarding/StepFour";
import OnboardingFive from "./Onboarding/StepFive";

import RegRefugee from "./Reg/RegRefugee";
import RegRefugeeCont from "./Reg/RegRefugeeCont";
import MapScreen from "./MapScreen";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import RegRefugeeFamily from "./Reg/RegRefugeeFamily";
import SearchMarker from "./MarkerSearch";
import RefugeeLogin from "./RefugeeLogin";
import ContactUs from "./ContactUs";

import AuthLoadingScreen from "./AuthLoading";

const AuthStack = createStackNavigator({
    OnboardingZero: {
        screen: OnboardingZero,
        navigationOptions: {
            title: "OnboardingZero",
            header: null,
        },
    },

    OnboardingOne: {
        screen: OnboardingOne,
        navigationOptions: {
            title: "OnboardingOne",
            header: null,
        },
    },
    OnboardingTwo: {
        screen: OnboardingTwo,
        navigationOptions: {
            title: "OnboardingTwo",
            header: null,
        },
    },
    OnboardingThree: {
        screen: OnboardingThree,
        navigationOptions: {
            title: "OnboardingThree",
            header: null,
        },
    },
    OnboardingFour: {
        screen: OnboardingFour,
        navigationOptions: {
            title: "OnboardingFour",
            header: null,
        },
    },
    OnboardingFive: {
        screen: OnboardingFive,
        navigationOptions: {
            title: "OnboardingFive",
            header: null,
        },
    },
    RefugeeLogin: {
        screen: RefugeeLogin,
        navigationOptions: {
            title: "RefugeeLogin",
            header: null,
        },
    },
    ConfirmationNumber: {
        screen: ConfNumber,
        navigationOptions: {
            title: "ConfirmationNumber",
            header: null,
        },
    },
    ConfirmationCode: {
        screen: ConfCode,
        navigationOptions: {
            title: "ConfirmationCode",
            header: null,
        },
    },
    RegistrationRefugee: {
        screen: RegRefugee,
        navigationOptions: {
            title: "RegistrationRefugee",
            header: null,
        },
    },
});

const Stack = createStackNavigator({
    MapScreen: {
        screen: MapScreen,
        navigationOptions: {
            title: "MapScreen",
            header: null,
        },
    },
    SearchMarker: {
        screen: SearchMarker,
        navigationOptions: {
            title: "SearchMarker",
            header: null,
        },
    },
    ContactUs: {
        screen: ContactUs,
        navigationOptions: {
            title: "ContactUs",
            header: null,
        },
    },

    RegistrationRefugeeFamily: {
        screen: RegRefugeeFamily,
        navigationOptions: {
            title: "RegistrationRefugeeFamily",
            header: null,
        },
    },
});

const Switch = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,

    AuthFlow: AuthStack,
    LoggedFlow: Stack,
});

const Routes = createAppContainer(Switch);

export default Routes;
