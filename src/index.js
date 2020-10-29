import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Routes from "./screens";
import { SafeAreaView } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import startNotifier from "./services/refresher";
import store from "~/store";
import * as Font from "expo-font";

const { theme } = store.getState();
startNotifier();

Font.loadAsync({
    "axiforma-bold": require("~/assets/fonts/axiforma-bold.otf"),
}).then();
const appTheme = {
    ...DefaultTheme,
    dark: true,
    mode: "adaptive",
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: theme.primary,
        accent: theme.primary,
        background: theme.background,
        text: theme.primary,
    },
};

const App = () => (
    <ReduxProvider store={store}>
        <SafeAreaProvider>
            <PaperProvider
                theme={appTheme}
                settings={{
                    icon: (props) => <MaterialCommunityIcons {...props} />,
                }}
            >
                <Routes />
            </PaperProvider>
        </SafeAreaProvider>
    </ReduxProvider>
);

export default App;
