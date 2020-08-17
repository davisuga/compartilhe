import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { useState, useEffect } from "react";
import { fetchData, storeData } from "../../storage";
import { sendEmail } from "../../services/email";
const creds = require("../../../creds.json");
export default OrgLogin = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    //const [isValid, setValid] = useState(false); //utilizar posteriormente na validação de email.

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    const login = async navigation => {
        verificationCode = getRandomInt(100000, 999999);
        verificationCode = verificationCode.toString();
        await storeData("code", verificationCode);
        storeData("loginType", "org");
        await fetchData("code").then(code => {
            console.log("codigo dentro do fetch ta:", code);
        });
        console.log("codigo de verificação:", verificationCode);
        if (email === "") {
            return null;
        }

        setIsLoading(true);
        return fetch("https://parseapi.back4app.com/graphql", {
            credentials: "omit",
            headers: {
                Accept: "*/*",
                "content-type": "application/json",
                "X-Parse-Application-Id": creds.appid,
                "X-Parse-Master-Key": creds.masterkey,
                "X-Parse-Client-Key": creds.clientkey
            },

            body: `{"operationName":null,"variables":{},"query":"{\\n  organizations(where: {email: {equalTo: \\"${email}\\"}}) {\\n    results {\\n      email\\n    }\\n  }\\n}\\n"}`,
            method: "POST",
            mode: "cors"
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson.data.organizations.results[0].email);
                let responseEmail =
                    responseJson.data.organizations.results[0].email;
                if (responseEmail != null) {
                    sendEmail(verificationCode, responseEmail);
                    console.log("response email: ", responseEmail);
                    setIsLoading(false);
                    navigation.navigate("ConfirmationCode");
                }
                //
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    };

    const styles = StyleSheet.create({
        button: {
            width: wp("28%"),
            marginLeft: wp("5%"),
            marginBottom: hp("2%"),
            alignSelf: "center",
            color: "black"
        },
        email: {
            width: wp("84%"),
            marginLeft: wp("8%")
        },
        title: {
            fontSize: RFPercentage(3),
            marginLeft: wp("7%"),
            marginRight: wp("7%"),
            alignSelf: "center",
            color: "#000",
            textAlign: "center",
            marginTop: hp("2%")
        },
        container: {}
    });

    useEffect(() => {
        console.log(email);
        return () => {
            console.log("");
        };
    });
    if (isLoading) {
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator
                    style={{ flex: 1, width: 500, alignSelf: "center" }}
                />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Title style={styles.title}>
                Digite o email da sua organização.
            </Title>
            <TextInput
                mode="outlined"
                style={styles.email}
                label="Email"
                onChangeText={name => setEmail(name)}
            />

            <Button style={styles.button} onPress={() => login(navigation)}>
                Enviar
            </Button>
        </View>
    );
};
