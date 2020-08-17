import React, { useState, useMemo } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Searchbar, Card, FAB } from "react-native-paper";
import { useSafeArea } from "react-native-safe-area-context";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
import { fetchData } from "../../storage";
import axios from "axios";
import { axheaders } from "../../../creds.js";
import "react-native-console-time-polyfill";
import { IState, IMarker } from "../../store/index";
import { styles } from "./styles";
export default function MarkerSearch({ navigation }) {
  const { top } = useSafeArea();

  const url = "https://parseapi.back4app.com/functions/get_offer_points";
  const [keyword, setKeyword] = useState("");
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [unfilteredMarkers, setUnfilteredMarkers] = useState(null);
  const theme = useSelector<IState, any>((state) => state.theme);

  const filters = {
    food: true,
    documentation: true,
    education: true,
    shelter: true,
    health: true,
    clothes: true,
    job: true,
    acessibility: true,
    nursery: true,
  };
  const region = useSelector<IState>((state) => state.user.location);

  const refreshOffers = async () => {
    let searchDistanceRadius = await fetchData("searchDistanceRadius");
    searchDistanceRadius = JSON.parse(searchDistanceRadius || "100");
    searchDistanceRadius = JSON.parse(searchDistanceRadius || "100");

    const data = {
      position: region,
      filter: filters,
      searchDistanceRadius: searchDistanceRadius,
    };
    console.time("refreshOffers");

    const rawResponse = await axios.post(url, data, { headers: axheaders });
    console.timeLog("refreshOffers", "request");

    const unfilteredMarkersRaw = rawResponse.data.result;
    return unfilteredMarkersRaw;
  };

  const getMarkersAndFilter = async () => {
    let offers: Array<IMarker>;
    try {
      offers = await refreshOffers();
    } catch (e) {
      const offersRaw = await fetchData("markers");
      offers = JSON.parse(offersRaw);
      console.log("deu ruizao amigo", e);
    }
    const keywordInLowercase = keyword.toLowerCase();
    let newMarkers = offers.filter((marker) => {
      if (
        marker.description.spanish
          .toLocaleLowerCase()
          .includes(keywordInLowercase) ||
        marker.description.english
          .toLocaleLowerCase()
          .includes(keywordInLowercase) ||
        marker.description.spanish
          .toLocaleLowerCase()
          .includes(keywordInLowercase) ||
        marker.name.toLocaleLowerCase().includes(keywordInLowercase)
      ) {
        return marker;
      }
    });
    setMarkers(newMarkers);
    console.timeEnd("refreshOffers");
  };

  const markersFromRedux: any = useSelector<IState>((state) => state.markers);

  useMemo(() => {
    setMarkers(markersFromRedux);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        width: wp("100%"),
        paddingTop: top,
      }}
    >
      <FAB
        icon="map"
        style={styles.flutterFab}
        onPress={() => {
          navigation.navigate("MapScreen");
        }}
      />
      <Image
        source={require("../../assets/images/LeftGradient.png")}
        //resizeMode="contain"
        resizeMethod="auto"
        style={{
          height: hp("100%") + top,
          width: wp("2%"),
          alignSelf: "flex-start",
          position: "absolute",
        }}
      />
      <View
        style={{
          backgroundColor: theme.background,
          width: wp("98%"),
          alignSelf: "flex-end",
        }}
      >
        <Searchbar
          placeholder="Procurar oferta..."
          onIconPress={async () => {
            getMarkersAndFilter();
          }}
          onChangeText={async (query) => {
            setKeyword(query);
          }}
          placeholderTextColor={"#fff"}
          onSubmitEditing={async () => {
            getMarkersAndFilter();
          }}
          value={keyword}
          iconColor={"#fff"}
          style={{
            width: wp("94%"),
            alignSelf: "center",
            backgroundColor: theme.surface,
          }}
          inputStyle={{ color: theme.fontColor }}
        />
      </View>
      <ScrollView
        style={{
          flex: 1,
          marginTop: hp("3%"),
          height: hp("100%"),
          width: wp("98%"),
          alignSelf: "flex-end",
        }}
      >
        {markers.map((marker, i) => (
          <Card
            key={i}
            style={{
              width: wp("94%"),

              alignSelf: "center",
              justifyContent: "center",
              elevation: 5,
              borderRadius: 3,
              backgroundColor: theme.surface,
              marginBottom: hp("2%"),
            }}
            onPress={() => {}}
          >
            <Card.Content>
              <Text
                style={{
                  fontSize: RFPercentage(3),
                  color: "#fff",
                  fontWeight: "700",
                }}
              >
                {marker.description.spanish}
              </Text>
              <Text
                style={{
                  fontSize: RFPercentage(2),
                  color: "#fff",
                  marginTop: hp(".5%"),
                }}
              >
                {marker.name}
              </Text>
              <Text
                style={{
                  fontSize: RFPercentage(1.5),
                  color: "#aaa",
                  marginTop: hp("2%"),
                  marginBottom: hp("2%"),
                }}
              >
                Está a {Math.floor(marker.distance)} kilómetros de aquí.
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
