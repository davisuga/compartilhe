import React, { Fragment } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import MapConf from "../../../components/MapConf";
import { Card, TextInput, Avatar, Button } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import store from "~/store";
const { theme } = store.getState();
ConfMap = ({ navigation }) => (
  <SafeAreaView style={{ flex: 1 }}>
    <MapConf />
    <Card>
      <Card.Title
        title="Confirme seu endereço"
        subtitle="Verifique se as informações estão corretas"
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon="map"
            style={{ backgroundColor: theme.primary }}
          />
        )}
      />
      <Card.Content>
        <View style={{ flexDirection: "row" }}>
          <TextInput style={style.countryInput} label="País" mode="outlined" />
          <TextInput style={style.stateInput} label="Estado" mode="outlined" />
        </View>
        <TextInput style={style.cityInput} label="Cidade" mode="outlined" />
        <TextInput style={style.addressInput} label="Address" mode="outlined" />
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button
            mode="contained"
            style={{
              marginTop: "3.25%",
              height: hp("6%"),
              width: "48.5%",
            }}
            contentStyle={{
              height: hp("6%"),
            }}
            onPress={() => navigation.navigate("ConfirmationWho")}
          >
            Confirmar
          </Button>
        </View>
      </Card.Content>
    </Card>
  </SafeAreaView>
);

export default ConfMap;

ConfMap.navigationOptions = {
  title: "ConfirmationMap",
};

const style = StyleSheet.create({
  countryInput: {
    width: "48.25%",
  },
  stateInput: {
    width: "48.25%",
    marginLeft: "3.25%",
  },
  cityInput: {
    marginTop: "2%",
  },
  addressInput: {
    marginTop: "2%",
  },
});
