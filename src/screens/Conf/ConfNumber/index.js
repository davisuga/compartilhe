import React, { Component, Fragment } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import ButtonConfSend from "../../../components/ButtonConfSend";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "react-native-paper";

const ConfNumber = ({ navigation }) => (
    <SafeAreaView style={styles.container} behavior="position" enabled>
        <Image
            source={require("../../../assets/images/compartilhe.png")}
            resizeMode="contain"
            style={styles.LogoSavi}
        />
        <Text style={styles.DescSavi}>
            No SAVI você encontra toda a informação que necessita, seja onde
            estiver. Um projeto de Alpha Lumen e MAKAIA
        </Text>
        <Text style={styles.DescNumber}>Insira seu número de celular</Text>
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 0,
                paddingTop: 0
            }}
        >
            {
                //<Text style={styles.plus}>+</Text>
                //<TextInput placeholder="DDI" style={styles.DDI} />
            }
            <TextInput
                keyboardType={"phone-pad"}
                placeholder="(DDD) 0000 0000"
                style={styles.DDDNumber}
            />
        </View>
        <ButtonConfSend
            style={styles.continueButton}
            onPress={() => navigation.navigate("ConfirmationCode")}
        />
        <View style={{ justifyContent: "flex-end" }}>
            <Text style={styles.DescTerms}>
                Ao clicar em continuar, aceita todos os termos e condições
            </Text>
        </View>
    </SafeAreaView>
);

export default ConfNumber;

ConfNumber.navigationOptions = {
    title: "ConfirmationNumber"
};

const styles = StyleSheet.create({
    plus: {
        color: "#121212",
        fontSize: RFPercentage(2.5),
        textAlignVertical: "center"
    },
    container: {
        //flex: 1,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    LogoSavi: {
        width: wp("80%"),
        height: hp("30%"),
        alignSelf: "center",
        justifyContent: "flex-start",
        marginTop: hp("5%")
    },
    DescSavi: {
        color: "#121212",
        //alignSelf: "flex-start",
        paddingRight: hp("7%"),
        paddingLeft: hp("7%"),
        fontSize: RFPercentage(3),
        textAlign: "center"
    },
    DDI: {
        color: "#121212",
        fontSize: RFPercentage(2.5),
        alignSelf: "center",
        marginLeft: wp("2%")
    },
    DDDNumber: {
        marginLeft: wp("5%"),
        color: "#121212",
        fontSize: RFPercentage(2.5),
        alignSelf: "center"
    },
    DescNumber: {
        color: "#121212",
        alignSelf: "center",
        marginBottom: hp("2%"),
        fontSize: RFPercentage(3),
        textAlign: "center",
        marginTop: hp("7%")
    },
    continueButton: {
        width: wp("40%"),
        height: hp("6%"),
        alignSelf: "center",
        marginTop: hp("5%")
    },
    DescTerms: {
        color: "#121212",
        paddingRight: wp("5%"),
        paddingLeft: wp("5%"),
        fontSize: RFValue(16),
        textAlign: "center"
        //marginBottom: hp("2%")
    }
});
