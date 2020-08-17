import React from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";

import { RFPercentage } from "react-native-responsive-fontsize";
import { useSafeArea } from "react-native-safe-area-context";
import { TextInput, Button, Title } from "react-native-paper";
import { useState, useEffect } from "react";
import { fetchData, storeData } from "../../storage";
import { sendEmail } from "../../services/email";
import client from "../../services/client";
import { useSelector } from "react-redux";
import { IState, ITheme } from "~/store";
import { hp, wp } from "~/utils/screen-size";

export default function RefugeeLogin({ navigation }) {
  const insets = useSafeArea();
  const colors = useSelector<IState, ITheme>((state) => state.theme);

  const styles = StyleSheet.create({
    bottomView: {
      marginBottom: hp(20),
    },
    button: {
      marginHorizontal: wp(7),
      marginVertical: hp(2),
      backgroundColor: colors.primary,
    },
    email: {
      marginTop: hp(0),
      marginHorizontal: wp(0),
      backgroundColor: colors.background,
    },
    emailContainer: {
      borderBottomColor: colors.primary,
      borderBottomWidth: 2,
      borderRadius: 10,
      marginHorizontal: wp(7),
    },
    title: {
      fontSize: RFPercentage(6),
      lineHeight: RFPercentage(6),
      marginLeft: wp(7),
      marginRight: wp(7),
      color: "#fff",
      textAlign: "left",
      marginTop: hp(10),
    },
    subtitle: {
      fontSize: RFPercentage(3),
      lineHeight: RFPercentage(3),
      marginLeft: wp(7),
      marginRight: wp(7),
      color: "#e0e0e0",
      textAlign: "left",
      marginTop: hp(1),
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    liftedContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
  const [containerStyle, setContainerStyle] = useState(styles.container);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  //const [isValid, setValid] = useState(false); //utilizar posteriormente na validação de email.
  const [logged, setLogged] = useState(false);
  const setIfIsLoggedAndNavigate = async () => {
    const ifIsLogged = await fetchData("logged");
    ifIsLogged ? navigation.navigate("MapScreen") : null;
  };
  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const storeFamilyDetails = async (email: String) => {
    console.log("storing family details...");
    const getFamilyIDQuery = `
        query{
        refugees(limit:1, where:{email:{equalTo:"${email}"}}){
            results{
                name
                Family {
                    id
                }
            }
        }
        }`;

    let queryResponse = await client.gfetch(getFamilyIDQuery);

    if (JSON.parse(queryResponse).data.refugees.results.length == 0) {
      return 0;
    }
    const familyID = JSON.parse(queryResponse).data.refugees.results[0].Family
      .id;
    storeData(
      "refugeeName",
      JSON.parse(queryResponse).data.refugees.results[0].name
    );
    const getFamilyDetailsQuery = `
        query{
        families(where:{id:{equalTo:"${familyID}"}}){
            results{
            id 
            members
            }
        }
        }`;
    queryResponse = await client.gfetch(getFamilyDetailsQuery);

    storeData("refugeeFamily", JSON.parse(queryResponse).data.families.results);
  };

  const login = async (navigation) => {
    storeData("RefugeeEmail", email);

    let verificationCode = getRandomInt(100000, 999999);
    const verificationCodeStr = verificationCode.toString();
    await storeData("code", verificationCodeStr);
    storeData("loginType", "refugee");
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
    if (responseJson.data.refugees.results[0] == undefined) {
      //verificando se o email existe no banco de dados
      console.log(
        "Email não existe no banco de dados. Redirecionando para tela de registro."
      );
      navigation.navigate("RegistrationRefugee");
    } else {
      let responseEmail = responseJson.data.refugees.results[0].email;
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
        storeFamilyDetails(email);
        storeData("isSecondaryContact", "true");
        storeData("logged", "true");
        navigation.navigate("ConfirmationCode");
      }
    }
    //
    setIsLoading(false);
  };

  useEffect(() => {
    setIfIsLoggedAndNavigate().then(() => {
      console.log(`Login status: ${logged}`);

      logged ? navigation.navigate("MapScreen") : null;
    });

    return () => {
      console.log;
    };
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator
          style={{ flex: 1, width: 500, alignSelf: "center" }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Bienvenido!</Title>
      <Title style={styles.subtitle}>Insira su correo electrónico</Title>

      <View style={styles.bottomView}>
        <View style={styles.emailContainer}>
          <TextInput
            mode="outlined"
            autoFocus
            style={styles.email}
            label="Email"
            keyboardType="email-address"
            onChangeText={(name) => {
              setEmail(name);
            }}
            returnKeyType="next"
            autoCorrect={false}
            autoCapitalize="none"
            onSubmitEditing={() => {
              if (email != "") {
                login(navigation);
              } else {
                Alert.alert(
                  "Error!",
                  "Por favor introduzca una dirección de correo electrónico válida",
                  [{ text: "OK" }],
                  { cancelable: false }
                );
              }
            }}
          />
        </View>

        <Button
          dark={true}
          mode="outlined"
          color="white"
          style={styles.button}
          onPress={() => {
            if (email != "") {
              login(navigation);
            } else {
              Alert.alert(
                "Error!",
                "Por favor introduzca una dirección de correo electrónico válida",
                [{ text: "OK" }],
                { cancelable: false }
              );
            }
          }}
        >
          Enviar
        </Button>
      </View>
    </View>
  );
}
