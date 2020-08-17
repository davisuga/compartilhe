import React, { useState, createRef } from "react";
import { View, Text, Animated, Dimensions, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Surface, IconButton, Button } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";

// import { Container } from './styles';

export default function MarkerPage(props) {
    const markerName = useSelector(state => state.markerSelected.name);
    const markerDesc = useSelector(state => state.markerSelected.description);
    const SCREEN_WIDTH = Dimensions.get("window").width;
    let scrollRef = null;
    const ScrollPos = 0;

    return (
        <View
            style={{
                flex: 1
            }}
        >
            <View style={{ backgroundColor: "#f88e1e", height: hp("30%") }}>
                <View
                    style={{
                        backgroundColor: "#f07e1e",
                        height: hp("7%"),
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <IconButton
                        icon="arrow-collapse-left"
                        color={"#fff"}
                        size={RFPercentage(4)}
                        onPress={() => {}}
                        style={{ height: hp("7%"), alignContent: "center" }}
                    />
                    <Text
                        style={{
                            fontSize: RFPercentage(2.5),
                            marginBottom: hp(".45%"),
                            alignContent: "center",
                            textAlignVertical: "center",
                            color: "#fff"
                        }}
                    >
                        Cruz Roja Colombiana
                    </Text>
                </View>
            </View>
            <Surface style={{ elevation: 10 }}>
                <View
                    style={{
                        height: hp("10%"),
                        backgroundColor: "#242f3e",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Button
                        onPress={() => {
                            scrollRef.getNode().scrollTo({ x: 0 }),
                                console.log(ScrollPos);
                        }}
                        style={{ width: wp("50%") }}
                        mode="text"
                    >
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: RFPercentage(2.5)
                            }}
                        >
                            Informações
                        </Text>
                    </Button>
                    <Button
                        onPress={() => {
                            scrollRef.getNode().scrollTo({ x: SCREEN_WIDTH }),
                                console.log(ScrollPos);
                        }}
                        style={{ width: wp("50%") }}
                        mode="text"
                    >
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: RFPercentage(2.5)
                            }}
                        >
                            Avaliações
                        </Text>
                    </Button>
                    <Image
                        source={require("../../../assets/images/MarkerMenuBar.png")}
                        //resizeMode="contain"
                        //resizeMethod="auto"
                        style={{
                            height: hp("1%"),
                            width: wp("50%"),
                            position: "absolute",
                            bottom: 0,
                            left: wp("0%")
                        }}
                    />
                </View>
            </Surface>
            <Animated.ScrollView
                style={{ height: hp("60%"), backgroundColor: "#242f3e" }}
                horizontal
                pagingEnabled
                //ref={(ScrollView) => { scrollRef = ScrollView; }}
                //scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                ref={view => (scrollRef = view)}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: ScrollPos } } }],
                    { useNativeDriver: true }
                )}
            >
                <View
                    style={{
                        width: SCREEN_WIDTH,
                        backgroundColor: "#242f3e",
                        height: hp("60%")
                        //justifyContent: 'space-between'
                    }}
                    index={0}
                ></View>

                <View
                    style={{
                        width: SCREEN_WIDTH,
                        backgroundColor: "#fff",
                        height: hp("60%")
                        //justifyContent: 'space-between'
                    }}
                    index={1}
                ></View>
            </Animated.ScrollView>
        </View>
    );
}
