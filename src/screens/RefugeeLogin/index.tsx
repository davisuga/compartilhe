import React from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput, Button, Title } from "react-native-paper";
import { useState, useEffect } from "react";
import { fetchData, storeData } from "../../storage";
import { sendEmail } from "../../services/email";
import client from "../../services/client";
import { useSelector } from "react-redux";
import { IState, ITheme } from "~/store";
import { getRandomInt } from "../../utils";
import styles from "./styles";

export default function RefugeeLogin({ navigation }) {
    const colors = useSelector<IState, ITheme>((state) => state.theme);

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    //const [isValid, setValid] = useState(false); //utilizar posteriormente na validação de email.

    const onSubmitEmail = async () => {
        if (email != "") {
            login(navigation);
        } else {
            Alert.alert("Erro!", "Insira um email válido!", [{ text: "OK" }], {
                cancelable: false,
            });
        }
    };

    const login = async (navigation) => {
        storeData("RefugeeEmail", email);

        let verificationCode = getRandomInt(100000, 999999);
        const verificationCodeStr = verificationCode.toString();
        await storeData("code", verificationCodeStr);
        // const code = await fetchData("code"); //debugging only! do NOT use in production.
        // console.log("codigo dentro do fetch ta:", code);
        console.log("codigo de verificação:", verificationCode);
        if (email === "") navigation.navigate("MapScreen");

        setIsLoading(true);
        const verifyRefugeeEmailQuery = `
          query {
            refugees(where: {email: {equalTo: "${email}"}}) {
              results {
                email
              }

            }
          }
        `;

        const response = await client.gfetch(verifyRefugeeEmailQuery);

        let responseJson = JSON.parse(response);
        const results = responseJson.data.refugees.results[0];

        if (results == undefined) {
            //verificando se o email existe no banco de dados
            console.log(
                "Email não existe no banco de dados. Redirecionando para tela de registro."
            );
            navigation.navigate("RegistrationRefugee");
        } else {
            let responseEmail = results.email;
            if (responseEmail != null) {
                const emailApiResponse = await sendEmail(
                    verificationCode,
                    responseEmail
                );
                if (emailApiResponse != undefined) {
                    const emailReponseJson = await emailApiResponse.json();
                    console.log(`Email response: ${emailReponseJson}`);
                    console.log("response email: ", responseEmail);
                }

                setIsLoading(false);
                storeData("logged", "true");
                navigation.navigate("ConfirmationCode");
                return;
            }
        }
        //
        setIsLoading(false);
    };

    useEffect(() => {
        return () => {
            console.log;
        };
    }, []);

    if (isLoading) {
        return (
            <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={{
                    flex: 1,
                    padding: 20,
                }}
            >
                <ActivityIndicator
                    color="white"
                    size={100}
                    style={{ flex: 1, width: 500, alignSelf: "center" }}
                />
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={styles.container}
        >
            <Title style={styles.title}>Bem Vindo!</Title>
            <Title style={styles.subtitle}>Digite seu email</Title>

            <View style={styles.bottomView}>
                <View style={styles.emailContainer}>
                    <TextInput
                        mode="flat"
                        autoFocus
                        accessibilityStates
                        style={styles.email}
                        label="Email"
                        keyboardType="email-address"
                        onChangeText={(name) => {
                            setEmail(name);
                        }}
                        returnKeyType="next"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onSubmitEditing={() => onSubmitEmail()}
                    />
                </View>

                <Button
                    dark={true}
                    mode="outlined"
                    color={colors.primary}
                    style={styles.button}
                    onPress={() => onSubmitEmail()}
                >
                    Enviar
                </Button>
            </View>
        </LinearGradient>
    );
}
