import Parse from "parse/react-native"
import {jskey} from "../../creds.json"
Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = "https://parseapi.back4app.com/";
Parse.initialize("47RAnYvxm7rWLUTUZYHt9SItJjd9FnmWj5ZK5g92", jskey);
let install = new Parse.Installation();
const ref=Parse.Object.extend("Refugee")