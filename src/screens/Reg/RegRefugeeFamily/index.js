import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, BackHandler } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Button } from "react-native-paper";
import { seeAllValues } from "../../../storage";
import MemberList from "../../../components/MembersList";

export default function RegRefugeeFamily({ navigation }) {
    const registrateDependent = () => {
        navigation.navigate("RegistrationRefugee");
    };
    const handleBackButton = async () => {
        navigation.navigate("MapScreen");
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButton);
        return () => {
            console.log;
        };
    }, []);

    return (
        <View
            style={{ backgroundColor: "#FFF" }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "space-between",
                flexDirection: "column",
            }}
        >
            <View
                style={{
                    justifyContent: "flex-start",
                    alignSelf: "center",
                    height: hp("25%"),
                }}
            >
                <Image
                    resizeMethod="auto"
                    source={require("../../../assets/images/compartilhe.png")}
                    resizeMode="contain"
                    style={style.LogoSavi}
                />
                <Text style={style.RegFamilyTitle}>Registrar Família</Text>
            </View>
            <View style={{ alignSelf: "center", height: hp("65%") }}>
                <MemberList navigation={navigation} />

                <Button
                    mode="outlined"
                    style={style.addMember}
                    onPress={() => {
                        registrateDependent();
                    }}
                >
                    Adicionar membro da Família
                </Button>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Button
                    mode="text"
                    icon="chevron-left"
                    style={{
                        //height: hp('6%'),
                        width: wp("28%"),
                        marginLeft: wp("5%"),
                        marginBottom: hp("2%"),
                        alignSelf: "flex-end",
                    }}
                    onPress={() => {
                        navigation.navigate("MapScreen");
                    }}
                >
                    <Text style={{ color: "#707070", fontSize: 12 }}>
                        Voltar
                    </Text>
                </Button>
                <Button
                    mode="contained"
                    style={{
                        //height: hp('6%'),
                        width: wp("28%"),
                        marginRight: wp("5%"),
                        marginBottom: hp("2%"),
                        alignSelf: "flex-end",
                    }}
                    onPress={() => navigation.navigate("MapScreen")}
                >
                    <Text style={{ color: "#ffffff", fontSize: 12 }}>
                        Finalizar
                    </Text>
                </Button>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    LogoSavi: {
        width: wp("50%"),
        height: hp("8%"),
        marginTop: hp("5%"),
        alignSelf: "center",
    },
    RegFamilyTitle: {
        fontSize: RFPercentage(4),
        //marginLeft: wp("5%"),
        marginTop: hp("2%"),
        fontWeight: "bold",
        alignSelf: "center",
        color: "#000",
        marginBottom: hp("1%"),
    },
    member: {
        fontSize: RFPercentage(3),
        //marginLeft: wp("5%"),
        marginTop: hp("2%"),
        fontWeight: "bold",
        alignSelf: "center",
        color: "#000",
        marginBottom: hp("1%"),
    },
    addMember: {
        width: wp("95%"),
    },
});
