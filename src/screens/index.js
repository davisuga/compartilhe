// import AuthLoading from "./AuthLoading";
import ConfNumber from "./Conf/ConfNumber";
import ConfCode from "./Conf/ConfCode";
import OnboardingOne from "./Onboarding/StepOne";
import OnboardingTwo from "./Onboarding/StepTwo";
import OnboardingThree from "./Onboarding/StepThree";
import OnboardingFour from "./Onboarding/StepFour";
import OnboardingFive from "./Onboarding/StepFive";

// import ConfMap from "./Conf/ConfMap";
// import ConfWho from "./Conf/ConfWho";
import RegRefugee from "./Reg/RegRefugee";
import RegRefugeeCont from "./Reg/RegRefugeeCont";
import MapScreen from "./MapScreen";
// import CustomDrawer from "../components/CustomDrawer";
import { createStackNavigator } from "react-navigation-stack";
// import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import { nullLiteral } from "@babel/types";
import RegRefugeeFamily from "./Reg/RegRefugeeFamily";
// import RegStepOne from "~/screens/Reg/RegStepOne";
// import UserProfile from "./Profile/UserProfile";
import SearchMarker from "./MarkerSearch";
// import MarkerPage from "./Marker/MarkerPage";
// import Welcome from "./Welcome";
// import OrgHub from "./OrgHub";
// import OrgLogin from "./OrgLogin";
// import OrgRegister from "./OrgRegister";
// import OrgConfirmNumber from "./OrgConfirmNumber";
import RefugeeLogin from "./RefugeeLogin";
import ContactUs from "./ContactUs";

const Stack = createStackNavigator({
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
  SearchMarker: {
    screen: SearchMarker,
    navigationOptions: {
      title: "SearchMarker",
      header: null,
    },
  },

  MapScreen: {
    screen: MapScreen,
    navigationOptions: {
      title: "MapScreen",
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
  RefugeeLogin: {
    screen: RefugeeLogin,
    navigationOptions: {
      title: "RefugeeLogin",
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
  RegistrationRefugeeFamily: {
    screen: RegRefugeeFamily,
    navigationOptions: {
      title: "RegistrationRefugeeFamily",
      header: null,
    },
  },
});

const Switch = createSwitchNavigator({ Stack });

const Routes = createAppContainer(Switch);

export default Routes;
