import gfClient from "./grafetch";
import { header } from "../../creds.json";
endpoint = "https://parseapi.back4app.com/graphql";
client = new gfClient(endpoint, header);
export default client;
