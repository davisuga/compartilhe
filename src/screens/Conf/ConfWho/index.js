import React from "react";
import { List } from "react-native-paper";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { View, Image, StyleSheet, Text, SafeAreaView } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { fetchData, unstring } from "../../../storage";
// import { Container } from './styles';

const ConfWho = ({ navigation }) => {
    const handleLoginPressEvent = async () => {
        console.log("handleLoginPressEvent");
        const isLogged = await fetchData("logged");

        if (isLogged) {
            
            navigation.navigate("MapScreen");
            console.log("Navegando para MapScreen");
        } else if (isLogged == null) {
            console.log("Navegando para RefugeeLogin");
            navigation.navigate("RefugeeLogin");
        }
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end"
            }}
        >
            <Image
                source={require("../../../assets/images/compartilhe.png")}
                resizeMode="contain"
                style={styles.LogoSavi}
            />
            <Text style={styles.PageTitle}>Quien eres?</Text>
            <View
                style={{
                    backgroundColor: "#f0f0f0",
                    height: ".125%",
                    width: "80%"
                }}
            />
            <List.Section style={styles.List}>
                <List.Item
                    title="Refugiado"
                    description="Obtener ayuda ahora!"
                    onPress={() => handleLoginPressEvent()}
                    titleStyle={styles.ListTitle}
                    descriptionStyle={styles.ListDesc}
                />
                <View style={{ backgroundColor: "#f0f0f0", height: ".25%" }} />
                <List.Item
                    title="Organización"
                    description="Ayuda millones!"
                    onPress={() => navigation.navigate("ContactUs")}
                    titleStyle={styles.ListTitle}
                    descriptionStyle={styles.ListDesc}
                />
                <View style={{ backgroundColor: "#f0f0f0", height: ".25%" }} />
                <List.Item
                    title="Donantes"
                    description="Contribuya a la causa!"
                    onPress={() => navigation.navigate("ContactUs")}
                    titleStyle={styles.ListTitle}
                    descriptionStyle={styles.ListDesc}
                />
                <View style={{ backgroundColor: "#f0f0f0", height: ".25%" }} />
                <List.Item
                    title="Voluntarios"
                    description="Colabore con nosotros!"
                    onPress={() => navigation.navigate("ContactUs")}
                    titleStyle={styles.ListTitle}
                    descriptionStyle={styles.ListDesc}
                />
            </List.Section>
            <View
                style={{
                    backgroundColor: "#f0f0f0",
                    height: ".125%",
                    width: "80%",
                    marginBottom: hp("5%")
                }}
            />
        </SafeAreaView>
    );
};
ConfWho.navigationOptions = {
    title: "ConfirmationWho"
};

export default ConfWho;

const styles = StyleSheet.create({
    LogoSavi: {
        width: wp("80%"),
        height: hp("30%"),
        alignSelf: "center",
        justifyContent: "flex-start",
        marginTop: hp("6%")
    },
    List: {
        width: wp("70%"),
        //alignItems: 'center',
        marginTop: 0,
        marginBottom: 0
    },
    ListTitle: {
        fontWeight: "bold",
        fontSize: RFPercentage(2)
    },
    PageTitle: {
        fontWeight: "bold",
        fontSize: RFPercentage(3),
        marginBottom: "10%"
    },
    ListDesc: {
        fontSize: RFPercentage(1.5)
    }
});
