import App from "./src";
import Reactotron, {
  networking,
  openInEditor,
  trackGlobalErrors,
  asyncStorage,
} from "reactotron-react-native";

Reactotron.configure({ host: "192.168.15.25" })
  .useReactNative()
  .use(asyncStorage())
  .use(networking())
  .use(openInEditor())
  .use(trackGlobalErrors())
  .connect();
export default App;
