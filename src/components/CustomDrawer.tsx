import { useSafeArea } from "react-native-safe-area-context";
import { DrawerActions } from "react-navigation-drawer";
import store from "~/store";
const { theme } = store.getState();
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  Share,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { List } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";
import { NavigationActions } from "react-navigation";
import { useSelector, useDispatch } from "react-redux";
import { storeData, fetchData } from "../storage";
import { IState, IMarker, IPosition, IFilters } from "../store/index";

const navigateToScreen = (route) => () => {
  const navigateAction = NavigationActions.navigate({
    routeName: route,
  });
  this.props.navigation.dispatch(navigateAction);
};

export default function CustomDrawer({ navigation }) {
  const insets = useSafeArea();
  const drawerActive = useSelector<IState>((state) => state.drawerActive);
  const dispatch = useDispatch();
  const [name, setName] = useState("visitante");
  function changeActive(title: string) {
    dispatch({ type: "DRAWER_ACTIVE", title: title });
  }
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Compartilhe - Primer clic para un refugiado: compartilhe.today",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const [logged, setLogged] = useState(false);

  const setIfIsLogged = async () => {
    const ifIsLogged = await fetchData("logged");
    ifIsLogged ? setLogged(true) : setLogged(false);
  };
  useEffect(() => {
    setIfIsLogged();
    if (logged) {
      fetchData("refugeeName").then((name) => {
        try {
          setName(JSON.parse(name));
        } catch (error) {
          setName(name);
        }
      });
    } else {
      setName("visitante");
    }
    return () => {
      console.log("");
    };
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          paddingTop: insets.top + 5,
          //height: hp("15%"),
          backgroundColor: "#171f23",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: RFPercentage(2.5),
            color: "#fff",
            alignSelf: "center",
            marginBottom: RFPercentage(0.5),
          }}
        >
          Hola, {name}!
        </Text>
      </View>
      <View style={{ height: hp(".05%"), backgroundColor: "#171f23" }}>
        <View
          style={{
            height: hp(".05%"),
            backgroundColor: theme.primary,
            width: "90%",
            alignSelf: "center",
          }}
        ></View>
      </View>
      <View
        style={{
          backgroundColor: "#171f23",
          justifyContent: "center",
          //alignItems: 'center'
        }}
      >
        {logged ? (
          <List.Section>
            <List.Item
              // onPress={() => {
              //     changeActive("Mi Familia");
              // }}
              onPress={() => {
                navigation.navigate("RegistrationRefugeeFamily");
              }}
              title="Mi Familia"
              style={
                drawerActive == "Mi Familia"
                  ? styles.myFamilyListActive
                  : styles.myFamilyList
              }
              titleStyle={styles.myFamilyListTitle}
            />
          </List.Section>
        ) : (
          <List.Item
            onPress={() => {
              changeActive("Login");
              navigation.navigate("RefugeeLogin");
            }}
            title="Login"
            style={
              drawerActive == "Login"
                ? styles.myLocalizationListActive
                : styles.myLocalizationList
            }
            titleStyle={styles.myLocalizationListTitle}
          />
        )}
      </View>
      <ScrollView style={{ backgroundColor: "#00001D" }}>
        <View style={styles.container}>
          <List.Section>
            <List.Item
              onPress={() => {
                changeActive("Mi Localización");
                navigation.navigate("MapScreen");
              }}
              title="Mi Localización"
              style={
                drawerActive == "Mi Localización"
                  ? styles.myLocalizationListActive
                  : styles.myLocalizationList
              }
              titleStyle={styles.myLocalizationListTitle}
            />
            <List.Item
              onPress={() => {
                changeActive("Buscar Ayuda"),
                  navigation.navigate("SearchMarker");
              }}
              title="Buscar Ayuda"
              style={
                drawerActive == "Buscar Ayuda"
                  ? styles.searchListActive
                  : styles.searchList
              }
              titleStyle={styles.searchTitle}
            />
            <List.Item
              onPress={() => {
                changeActive("Invitar Amigos");
                onShare();
              }}
              title="Invitar Amigos"
              style={
                drawerActive == "Invitar Amigos"
                  ? styles.inviteFriendsListActive
                  : styles.inviteFriendsList
              }
              titleStyle={styles.inviteFriendsTitle}
            />
            <List.Item
              onPress={() => {
                const url = "https://compartilhe.today";
                changeActive("Noticias");
                Linking.canOpenURL(url)
                  .then((supported) => {
                    if (!supported) {
                      console.log("Can't handle url: " + url);
                    } else {
                      return Linking.openURL(url);
                    }
                  })
                  .catch((err) => console.error("An error occurred", err));
              }}
              title="Noticias"
              style={
                drawerActive == "Noticias"
                  ? styles.newsListActive
                  : styles.newsList
              }
              titleStyle={styles.newsTitle}
            />
          </List.Section>
        </View>
      </ScrollView>
      <View
        style={{
          height: hp("8%"),
          backgroundColor: "#00001D",
          //flexDirection: 'row',
          justifyContent: "center",
          //width: '100%',
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            onPress={() => {
              changeActive("Contacto");
              navigation.navigate("ContactUs");
            }}
            style={styles.contactList}
          >
            Contacto
          </Text>
          <Text
            onPress={() => {
              AsyncStorage.clear();
              navigation.navigate("MapScreen");
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
            style={styles.contactList}
          >
            Salir
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00001D",
  },
  surface: {
    elevation: 3,
    flex: 1,
  },
  myAccountListTitle: {
    color: "#fff",
    fontSize: RFPercentage(2),
    fontWeight: "500",
  },
  myFamilyListTitle: {
    color: "#fff",
    fontSize: RFPercentage(2),
    fontWeight: "500",
  },
  myLocalizationListTitle: {
    color: "#fff",
    fontSize: RFPercentage(2.1),
    fontWeight: "bold",
  },
  inviteFriendsTitle: {
    color: "#fff",
    fontSize: RFPercentage(2.1),
    fontWeight: "bold",
  },
  newsTitle: {
    color: "#fff",
    fontSize: RFPercentage(2.1),
    fontWeight: "bold",
  },
  searchTitle: {
    color: "#fff",
    fontSize: RFPercentage(2.1),
    fontWeight: "bold",
  },
  helpTitle: {
    color: "#fff",
    fontSize: RFPercentage(1.5),
    fontWeight: "500",
    alignSelf: "center",
  },
  contactTitle: {
    color: "#fff",
    fontSize: RFPercentage(1.5),
    fontWeight: "500",
    alignSelf: "center",
  },
  myAccountList: {
    backgroundColor: "#00001D",
  },
  myFamilyList: {
    backgroundColor: "#00001D",
  },
  myLocalizationList: {
    backgroundColor: "#00001D",
  },
  inviteFriendsList: {
    backgroundColor: "#00001D",
  },
  newsList: {
    backgroundColor: "#00001D",
  },
  searchList: {
    backgroundColor: "#00001D",
  },
  helpList: {
    backgroundColor: "#171f23",
    //width: '30%',
    height: hp("5%"),
    textAlignVertical: "center",
    marginRight: wp("4%"),
    textDecorationLine: "underline",
    color: "#fff",
    fontWeight: "500",
  },
  contactList: {
    backgroundColor: "#00001D",
    //width: '30%'
    height: hp("5%"),
    textAlignVertical: "center",
    marginLeft: wp("4%"),
    textDecorationLine: "underline",
    color: "#fff",
    fontWeight: "500",
  },
  myAccountListActive: {
    backgroundColor: "#e65c00",
  },
  myFamilyListActive: {
    backgroundColor: "#e65c00",
  },
  myLocalizationListActive: {
    backgroundColor: theme.primary,
    color: "black",
  },
  inviteFriendsListActive: {
    backgroundColor: theme.primary,
  },
  newsListActive: {
    backgroundColor: theme.primary,
  },
  searchListActive: {
    backgroundColor: theme.primary,
  },
});
