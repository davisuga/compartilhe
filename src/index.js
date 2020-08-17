import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Routes from "./screens";
import { SafeAreaView } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import startNotifier from "./services/refresher";
import store from "~/store";
const { theme } = store.getState();
startNotifier();
const appTheme = {
  ...DefaultTheme,
  dark: true,
  mode: "adaptive",
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.primary,
    accent: theme.primary,
    background: "#00001d",
    text: "#fff",
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
