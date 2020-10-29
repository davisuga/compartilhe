import React, { useState, useMemo, useEffect } from "react";
import Map from "../../components/Map";
import { useSafeArea } from "react-native-safe-area-context";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapStyle from "../../components/MapStyle";
import MapView from "react-native-maps";
import { fetchData } from "../../storage";
import "react-native-console-time-polyfill";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import styles from "./styles";
import {
    IState,
    IMarker,
    IPosition,
    IFilters,
    OfferDTO,
} from "../../store/index";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
    Alert,
    View,
    Text,
    ScrollView,
    Animated,
    Dimensions,
    AsyncStorage,
    Share,
    Linking,
    Modal,
    TouchableOpacity,
} from "react-native";
import {
    Button,
    FAB,
    ActivityIndicator,
    Card,
    Dialog,
    Portal,
} from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import { axheaders } from "../../../creds.js";
import { storeData } from "../../storage";
import FilterButton from "../../components/FilterButton";
import { hp, wp } from "~/utils/screen-size.ts";
import DistancePicker from "~/components/DistancePicker";

export default function MapScreen({ navigation }: any) {
    const [connectionStatus, setConnectionStatus] = useState(true);
    const [radiusDialogVisibility, setRadiusDialogVisibility] = useState(false);
    const [position, setPosition] = useState<IPosition>();
    const [searchDistanceRadius, setSearchDistanceRadius] = useState(100);
    const [sliderState, setSliderState] = useState(100);
    const [isFirstBoot, setIsFirstBoot] = useState(true);
    const [isOptionsModalOn, setIsOptionsModalOn] = useState(false);
    const theme = useSelector<IState, any>((state) => state.theme);
    const dispatch = useDispatch();
    const filterTabActive = useSelector<IState, boolean>(
        (state) => state.filterTabActive
    );
    const filterTabLoading = useSelector<IState, boolean>(
        (state) => state.filterTabLoading
    );

    const filters = useSelector<IState, IFilters>(
        (state) => state.filterActive
    );
    const isMarkerSelected = useSelector<IState, boolean>(
        (state) => state.isMarkerSelected
    );
    const markerName = useSelector<IState, string>(
        (state) => state.markerSelected.name
    );
    const markerDesc = useSelector<IState, string>(
        (state) => state.markerSelected.description
    );
    const markerDistance = useSelector<IState, number>(
        (state) => state.markerSelected.distance
    );

    const [filterTabAnimNum] = useState(new Animated.Value(1000));
    const [markerCardAnimNum] = useState(new Animated.Value(0));
    const isInitialRegion = useSelector<IState, boolean>(
        (state) => state.isInitialRegion
    );

    const [logged, setLogged] = useState(false);

    const setIfIsLogged = async () => {
        const ifIsLogged = await fetchData("logged");
        ifIsLogged ? setLogged(true) : setLogged(false);
    };
    useEffect(() => {
        setIfIsLogged();
    });
    useEffect(() => {
        changeTabActive();

        setIsFirstBoot(false);
    }, []);
    //const markerCardAnimNum = useSelector(state => state.markerCardAnimNum);
    const url = "https://parseapi.back4app.com/functions/get_offer_points";
    const config = {
        headers: axheaders,
    };

    function markerCardShowAnimFunc() {
        Animated.timing(markerCardAnimNum, {
            toValue: 700,
            duration: 300,
            useNativeDriver: false,
        }).start();
        //console.log('abriu');
    }

    function markerCardHideAnimFunc() {
        Animated.timing(markerCardAnimNum, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
        //console.log('fecho');
    }

    function filterTabShowAnimFunc() {
        Animated.spring(filterTabAnimNum, {
            toValue: 1000,
            useNativeDriver: false,
        }).start();
        console.log("abriu");
    }

    function filterTabHideAnimFunc() {
        Animated.spring(filterTabAnimNum, {
            toValue: 0,
            useNativeDriver: false,
        }).start();
        console.log("fecho");
    }

    const debugOverInternet = (message: String) => {
        let formattedMessage: String;
        typeof message == "object"
            ? (formattedMessage = JSON.stringify(message))
            : (formattedMessage = message);

        fetch("https://postb.in/1582119715584-6410628478042", {
            body: `{"data":"${formattedMessage}"}`,
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }).then((res) => console.log);
    };

    function addMarkers(markers: IMarker) {
        dispatch({ type: "ADD_MARKERS", markers: markers });
    }

    async function storeDataOnce(res: Array<IMarker>) {
        const markersInStorage = await fetchData("markers");
        markersInStorage != "[]" ? () => {} : storeData("markers", res);
    }
    useEffect(() => {
        fetchData("searchDistanceRadius").then((initialSliderState) => {
            if (initialSliderState != null) {
                let ParsedInitialSliderState: string = JSON.parse(
                    initialSliderState
                );
                let initialSliderStateNum: number = JSON.parse(
                    ParsedInitialSliderState
                );
                setSearchDistanceRadius(initialSliderStateNum);
                setSliderState(initialSliderStateNum);
            }
        });
    }, []);

    function read_offers(data: OfferDTO) {
        if (data.position != undefined) {
            toggleLoading();
            axios
                .post(url, data, config)
                .then((res) => {
                    //console.log(res.data.result);
                    if (isFirstBoot) {
                        setIsFirstBoot(false);
                    } else {
                        changeTabActive();
                        filterTabHideAnimFunc();
                    }
                    addMarkers(res.data.result);
                    storeDataOnce(res.data.result);
                    setConnectionStatus(true);
                    toggleLoading();
                })
                .catch(async (exception) => {
                    debugger;
                    if (exception.config && exception.config.url) {
                        let markersFromAsyncStorage = await fetchData(
                            "markers"
                        );
                        markersFromAsyncStorage
                            ? addMarkers(JSON.parse(markersFromAsyncStorage))
                            : Alert.alert(
                                  "No hay ofertas guardadas en el armazenamento :/"
                              );
                        Alert.alert("Estás offline :/");
                        setConnectionStatus(false);
                        changeTabActive();
                        toggleLoading();
                        filterTabHideAnimFunc();
                        console.warn("deu ruim amigo 2: ", exception);

                        // network error
                    }
                });
        } else {
            Alert.alert("ERRO", "No pudimos determinar su posición", [
                { text: "OK" },
            ]);
            changeTabActive();
            filterTabHideAnimFunc();
        }
    }

    function changeActiveFilter(filter: IFilters) {
        dispatch({ type: "FILTER_ACTIVE", filter: filter });
    }

    function changeTabActive() {
        console.log(
            "filterTabAnimNum: ",
            JSON.parse(JSON.stringify(filterTabAnimNum))
        );
        dispatch({ type: "FILTERTAB_ACTIVE" });
    }
    function checkTabActive() {
        const filterTabState = JSON.parse(JSON.stringify(filterTabAnimNum));
        filterTabState > 100
            ? dispatch({ type: "SET_FILTERTAB_ACTIVE", filterTabActive: false })
            : dispatch({
                  type: "SET_FILTERTAB_ACTIVE",
                  filterTabActive: false,
              });
    }
    function toggleLoading() {
        dispatch({ type: "FILTER_LOADING" });
    }

    function changeActive(latitude: number, longitude: number) {
        dispatch({
            type: "UPDATE_LOCATION",
            latitude: latitude,
            longitude: longitude,
        });
    }

    const insets = useSafeArea();

    const markerCardTabAnimPerc = markerCardAnimNum.interpolate({
        inputRange: [0, 1000],
        outputRange: [hp(0), hp(20)],
    });

    const filterTabAnimPerc = filterTabAnimNum.interpolate({
        inputRange: [0, 1000],
        outputRange: [hp(0), hp(37) + insets.top],
    });

    const MapAnimPerc = filterTabAnimNum.interpolate({
        inputRange: [0, 1000],
        outputRange: [
            Dimensions.get("window").height + 50,
            hp(63) -
                (hp(100) - Dimensions.get("window").height) -
                insets.top +
                50,
        ],
    });

    useMemo(() => {
        if (isMarkerSelected == true) {
            markerCardShowAnimFunc();
            if (filterTabActive) {
                changeTabActive();
                filterTabHideAnimFunc();
            }
        } else {
            markerCardHideAnimFunc();
        }
        return () => {
            console.log("");
        };
    }, [isMarkerSelected]);
    const alertError = (error: any) =>
        Alert.alert("Error", JSON.stringify(error));
    const getLocationAndReadOffers = async () => {
        if (position == null) {
            await Permissions.askAsync(Permissions.LOCATION).catch((error) =>
                console.log(error)
            );
        }
        await Location.startLocationUpdatesAsync("refugee");
        await Location.watchPositionAsync(
            {
                enableHighAccuracy: true,
            },
            (location) => {
                console.time("getLocation init");

                let detectedPosition = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0043,
                    longitudeDelta: 0.0034,
                };
                setPosition(detectedPosition);
                changeActive(
                    location.coords.latitude,
                    location.coords.longitude
                );
                storeData("latitude", location.coords.latitude);
                storeData("longitude", location.coords.longitude);
                read_offers({
                    position: detectedPosition,
                    filter: filters,
                    searchDistanceRadius: searchDistanceRadius,
                });

                dispatch({ type: "INITIAL_REGION" });
                console.timeEnd("getLocation init");
            }
        );
    };

    useEffect(() => {
        getLocationAndReadOffers();
        return () => {
            Location.stopLocationUpdatesAsync("refugee");
            console.log("parando de pegar Localización.");
        };
    }, []);

    useMemo(() => {
        fetchData("markers").then((result) => {
            if (result == null) {
                console.log("asyncstorage ta: null");
                storeData("markers", []).then(() => setConnectionStatus(true));
            } else {
                console.log("markers no asyncStorage n tao null n");
            }
        });
        return () => {
            console.log("eu nao vou embora sem dizer tchau tchau...");
        };
    }, []);

    return (
        <View style={{ backgroundColor: "#E8E8E8", paddingTop: insets.top }}>
            <View
                style={{
                    alignSelf: "flex-start",
                    position: "absolute",
                    top: insets.top,
                    margin: hp(1.5),
                    zIndex: 1,
                }}
            >
                <FAB
                    style={{
                        backgroundColor: theme.primary,
                    }}
                    small
                    icon="menu"
                    onPress={() => setIsOptionsModalOn(true)}
                    color="#fff"
                />
            </View>
            <DistancePicker
                onSlidingComplete={async (value) => {
                    setSliderState(value);
                    storeData("searchDistanceRadius", value.toString());
                }}
                onValueChange={async (value) => {
                    setSearchDistanceRadius(value);
                }}
                onDismiss={() => setRadiusDialogVisibility(false)}
                visible={radiusDialogVisibility}
                value={searchDistanceRadius}
            />
            <Portal>
                <Dialog
                    visible={isOptionsModalOn}
                    style={{
                        flex: 1,
                        backgroundColor: "transparent",
                        marginVertical: hp(13),
                        marginHorizontal: wp(3),
                    }}
                    onDismiss={() => setIsOptionsModalOn(false)}
                >
                    <LinearGradient
                        colors={["#21df85", "#21B685"]}
                        style={{
                            backgroundColor: theme.background,
                            flex: 1,

                            borderRadius: 10,
                            zIndex: 999,
                            justifyContent: "space-evenly",
                        }}
                    >
                        <Button
                            dark={true}
                            style={[
                                styles.modalButton,
                                {
                                    marginHorizontal: wp(5),
                                },
                            ]}
                            mode="contained"
                            onPress={() => {
                                const url = "https://compartilhe.today";
                                Linking.canOpenURL(url)
                                    .then((supported) => {
                                        if (!supported) {
                                            console.log(
                                                "Can't handle url: " + url
                                            );
                                        } else {
                                            return Linking.openURL(url);
                                        }
                                    })
                                    .catch((err) =>
                                        console.error("An error occurred", err)
                                    );
                            }}
                        >
                            <MaterialCommunityIcons
                                color={theme.primary}
                                style={{ margin: 10 }}
                                name="newspaper"
                            ></MaterialCommunityIcons>
                            <Text style={styles.buttonText}> Noticias </Text>
                        </Button>
                        <Button
                            dark={true}
                            style={[
                                styles.modalButton,
                                {
                                    marginHorizontal: wp(5),
                                },
                            ]}
                            mode="contained"
                            onPress={async () => {
                                await Share.share({
                                    message: "Compartilhe",
                                });
                            }}
                        >
                            <MaterialCommunityIcons
                                color={theme.primary}
                                style={{ margin: 10 }}
                                name="share"
                            ></MaterialCommunityIcons>
                            <Text style={styles.buttonText}> Compartilhar</Text>
                        </Button>
                        <Button
                            dark={true}
                            style={[
                                styles.modalButton,
                                {
                                    marginHorizontal: wp(5),
                                },
                            ]}
                            mode="contained"
                            onPress={() => {
                                navigation.navigate("ContactUs");
                                setIsOptionsModalOn(false);
                            }}
                        >
                            <MaterialCommunityIcons
                                color={theme.primary}
                                style={{ margin: 10 }}
                                name="phone"
                            ></MaterialCommunityIcons>
                            <Text style={styles.buttonText}> Contatos </Text>
                        </Button>
                        <Button
                            dark={true}
                            style={[
                                styles.modalButton,
                                {
                                    marginLeft: wp(5),
                                    marginRight: wp(50),
                                },
                            ]}
                            mode="contained"
                            onPress={() => setIsOptionsModalOn(false)}
                        >
                            <MaterialCommunityIcons
                                color={theme.primary}
                                style={{ margin: 10 }}
                                name="keyboard-backspace"
                            ></MaterialCommunityIcons>
                            <Text style={styles.buttonText}> Voltar </Text>
                        </Button>
                    </LinearGradient>
                </Dialog>
            </Portal>
            <FAB
                style={[
                    styles.distanceFab,
                    { marginTop: insets.top + hp(1.5) + 45 },
                ]}
                small
                color="white"
                icon="radar"
                onPress={() => setRadiusDialogVisibility(true)}
            ></FAB>
            <Animated.View style={{ height: MapAnimPerc }}>
                {isInitialRegion ? (
                    <Map />
                ) : (
                    <MapView
                        style={{ flex: 1, height: hp(100) }}
                        loadingEnabled
                        customMapStyle={MapStyle}
                    />
                )}
                {filterTabActive ? (
                    <>
                        {!filterTabLoading ? (
                            <FAB
                                accessibilityStates
                                color="white"
                                style={styles.searchFab}
                                icon="magnify"
                                label="PROCURAR OFERTAS"
                                onPress={() => {
                                    storeData(
                                        "searchDistanceRadius",
                                        searchDistanceRadius
                                    );
                                    position &&
                                        read_offers({
                                            position: position,
                                            filter: filters,
                                            searchDistanceRadius: searchDistanceRadius,
                                        });
                                }}
                            />
                        ) : (
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignSelf: "center",
                                    position: "absolute",
                                    bottom: 0,
                                    marginBottom: styles.searchFab.margin,
                                }}
                            >
                                <ActivityIndicator
                                    style={{
                                        elevation: 10,
                                        position: "absolute",
                                        alignSelf: "center",
                                    }}
                                    animating={true}
                                    color={theme.primary}
                                />
                            </View>
                        )}
                    </>
                ) : (
                    <View>
                        <FAB
                            style={styles.searchFab}
                            color="white"
                            icon="filter"
                            label="FILTROS"
                            onPress={() => {
                                changeTabActive(), filterTabShowAnimFunc();
                            }}
                        />
                        {logged ? (
                            <View>
                                <FAB
                                    onPress={() => {
                                        navigation.navigate("SearchMarker");
                                    }}
                                    style={[
                                        styles.accountFab,
                                        { marginBottom: hp(3.5) + 65 },
                                    ]}
                                    color="white"
                                    icon="magnify"
                                />

                                <FAB
                                    style={styles.exitFab}
                                    color="white"
                                    icon="exit-to-app"
                                    onPress={() => {
                                        Alert.alert(
                                            "Deseja sair?",
                                            "",
                                            [
                                                {
                                                    text: "NÃO",
                                                    onPress: () =>
                                                        console.log(
                                                            "Cancel Pressed"
                                                        ),
                                                    style: "cancel",
                                                },
                                                {
                                                    text: "SIM",
                                                    onPress: () => {
                                                        AsyncStorage.clear();
                                                        setLogged(false);
                                                        navigation.navigate(
                                                            "RefugeeLogin"
                                                        );
                                                    },
                                                },
                                            ],
                                            { cancelable: false }
                                        );
                                    }}
                                />
                            </View>
                        ) : (
                            <View>
                                <FAB
                                    style={styles.accountFab}
                                    color="white"
                                    icon="account"
                                    label=""
                                    onPress={() => {
                                        navigation.navigate("RefugeeLogin");
                                    }}
                                />

                                <FAB
                                    onPress={() => {
                                        navigation.navigate("SearchMarker");
                                    }}
                                    style={[
                                        styles.accountFab,
                                        { marginBottom: hp(3.5) + 65 },
                                    ]}
                                    color="white"
                                    icon="magnify"
                                />
                            </View>
                        )}
                    </View>
                )}
            </Animated.View>
            <Animated.View
                style={{
                    height: filterTabAnimPerc,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "#   E8E8E8",
                }}
            >
                <ScrollView
                    style={{
                        backgroundColor: theme.primary,
                        width: wp(100),
                        padding: 10,
                        borderTopRightRadius: 22,
                        borderTopLeftRadius: 22,
                    }}
                >
                    <FilterButton
                        filter={{
                            Filter: "food",
                            OfferName: "ALIMENTAÇÃO",
                        }}
                    />
                    <FilterButton
                        filter={{
                            Filter: "documentation",
                            OfferName: "DOCUMENTAÇÃO",
                        }}
                    />
                    <FilterButton
                        filter={{
                            Filter: "education",
                            OfferName: "EDUCAÇÃO",
                        }}
                    />
                    <FilterButton
                        filter={{
                            Filter: "shelter",
                            OfferName: "REFÚGIO",
                        }}
                    />
                    <FilterButton
                        filter={{
                            Filter: "health",
                            OfferName: "SAÚDE",
                        }}
                    />
                    <FilterButton
                        filter={{
                            Filter: "clothes",
                            OfferName: "ROUPA",
                        }}
                    />
                    <FilterButton
                        filter={{
                            Filter: "job",
                            OfferName: "EMPREGO",
                        }}
                    />
                    <FilterButton
                        filter={{
                            Filter: "acessibility",
                            OfferName: "ACCESIBILIDADE",
                        }}
                    />
                    <FilterButton
                        filter={{
                            Filter: "nursery",
                            OfferName: "BERÇÁRIO",
                        }}
                    />
                    <View style={{ height: 50 }} />
                </ScrollView>
            </Animated.View>
            <Card
                style={[
                    //O typescript disse que nao é um numero mas é
                    styles.card,
                    //@ts-ignore

                    {
                        height: markerCardTabAnimPerc,
                    },
                ]}
            >
                <Card.Content>
                    <Text
                        style={{ fontSize: RFPercentage(3), fontWeight: "600" }}
                    >
                        {markerName}
                    </Text>
                    <Text style={{ marginBottom: hp(1.5) }}>{markerDesc}</Text>
                    <Text> {markerDistance.toFixed(2)} Kms daqui</Text>
                </Card.Content>
            </Card>
        </View>
    );
}
