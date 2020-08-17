import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import axios from "axios";
import { axheaders } from "../../creds.js";
import { Notifications } from "expo";
import { storeData, fetchData } from "~/storage";
import _ from "lodash";
interface ISearchParams {
  url: string;
  payload: {
    returnOnlyID: boolean;

    position: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    };
    filter: {
      food: boolean;
      documentation: boolean;
      education: boolean;
      shelter: boolean;
      health: boolean;
      clothes: boolean;
      job: boolean;
      acessibility: boolean;
      nursery: boolean;
    };
    searchDistanceRadius: number;
  };
  axheaders: {
    headers: {
      "X-Parse-Application-Id": string;
      "X-Parse-Master-Key": string;
      "X-Parse-Client-Key": string;
    };
  };
}

const readOffers = async (
  searchParams: ISearchParams
): Promise<string[] | undefined> => {
  if (searchParams.payload.position != undefined) {
    const res = await axios.post(
      searchParams.url,
      searchParams.payload,
      searchParams.axheaders
    );
    return res.data.result;
  } else {
    return undefined;
  }
};

const getSearchParams = async (): Promise<ISearchParams> => {
  const latitudeRaw = await fetchData("latitude");
  const latitude: number = JSON.parse(latitudeRaw || "23");
  const longitudeRaw = await fetchData("longitude");
  const longitude: number = JSON.parse(longitudeRaw || "23");
  const searchDistanceRadiusRaw = await fetchData("searchDistanceRadius");
  const searchDistanceRadius: number = JSON.parse(
    searchDistanceRadiusRaw || "100"
  );
  const url = "https://parseapi.back4app.com/functions/get_offer_points";
  const position = {
    latitude,
    longitude,
    latitudeDelta: 0.0043,
    longitudeDelta: 0.0034,
  };
  const filter = {
    food: false,
    documentation: false,
    education: false,
    shelter: false,
    health: false,
    clothes: false,
    job: false,
    acessibility: false,
    nursery: false,
  };
  const searchParams: ISearchParams = {
    url,
    payload: {
      returnOnlyID: true,
      position,
      filter,
      searchDistanceRadius,
    },
    axheaders: {
      headers: axheaders,
    },
  };
  return searchParams;
};

const verifyNewResult = async (
  receivedData: string[]
): Promise<string[] | undefined> => {
  let resultToKeep = receivedData;
  const oldResultRaw = await fetchData("oldResult");
  oldResultRaw ? console.log("old not null") : console.log("old null");
  if (receivedData && oldResultRaw) {
    resultToKeep = _.difference(JSON.parse(oldResultRaw), receivedData);
    console.log("diferenca: ", resultToKeep);
    return resultToKeep;
  }
  console.log("guardando ", JSON.stringify(resultToKeep));
  storeData("oldResult", JSON.stringify(resultToKeep));
  return undefined;
};

const readOffersAndNotify = async () => {
  const searchParams = await getSearchParams();
  try {
    const receivedNewData = await readOffers(searchParams);
    console.log("recebido ", typeof receivedNewData, " de readoffers.");
    if (receivedNewData) {
      const newResult = await verifyNewResult(receivedNewData);
      newResult && newResult.length
        ? Notifications.presentLocalNotificationAsync({
            title: `Hay ${newResult.length} nuevas ofertas`,
          })
        : null;
    }

    receivedNewData
      ? console.log(BackgroundFetch.Result.NewData)
      : console.log(BackgroundFetch.Result.NoData);
  } catch (error) {
    console.log("erro while trying to fetch new offers:");
    console.log(error);
    return BackgroundFetch.Result.Failed;
  }
};

export default async () => {
  TaskManager.defineTask("refugee", () => {});
  TaskManager.defineTask("REFRESH_OFFERS", () => {
    readOffersAndNotify();
  });
  await readOffersAndNotify();

  BackgroundFetch.registerTaskAsync("REFRESH_OFFERS");
};
