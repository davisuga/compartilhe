import React, { Component } from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput, Button, FAB, Menu, DarkTheme } from "react-native-paper";
// import { Container } from './styles';
import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";

export default class RegRefugeeCont extends Component {
    state = {
        isGenderMenuOpen: false,
        genderValue: "Genero",
        isDatePickerOpen: false,
        date: new Date("2020-06-12T14:42:42")
    };

    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            isDatePickerOpen: Platform.OS === "ios" ? true : false,
            date
        });
    };

    render() {
        const { navigate } = this.props.navigation;
        const { date } = this.state;
        return (
            <SafeAreaView>
                <KeyboardAvoidingView
                    style={{ backgroundColor: "#FFF" }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "space-between",
                        flexDirection: "column"
                    }}
                >
                    <Image
                        source={require("../../../assets/images/formback.png")}
                        resizeMode="stretch"
                        resizeMethod="auto"
                        style={{
                            width: "101%",
                            height: hp("15%"),
                            position: "absolute",
                            //justifyContent: 'flex-start',
                            //marginBottom: 10,
                            top: 0
                            //zIndex: -1,
                        }}
                    />
                    <View style={{ justifyContent: "flex-start" }}>
                        <Text style={styles.RegFamilyTitle}>
                            Registrar Família
                        </Text>
                        <TextInput
                            style={styles.NameInput}
                            label="Documento de Identidade"
                            mode="outlined"
                        />
                        <TextInput
                            style={styles.LastnameInput}
                            label="Tipo do Documento de Identidade"
                            mode="outlined"
                        />
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginRight: wp("5%"),
                                marginBottom: hp("1%")
                            }}
                        >
                            <TouchableOpacity
                                style={styles.HalfInputLeft}
                                contentStyle={{
                                    height: hp("7.7%"),
                                    borderColor: "#FFF"
                                }}
                                //labelStyle={{color: "#000"}}
                                mode="outlined"
                                onPress={() =>
                                    this.setState({ isDatePickerOpen: true })
                                }
                            >
                                <Text
                                    style={{
                                        color: "rgba(0, 0, 0, .6)",
                                        fontSize: 16
                                    }}
                                >
                                    {this.state.date.getDate() +
                                        "/" +
                                        this.state.date.getMonth() +
                                        "/" +
                                        this.state.date.getFullYear()}
                                </Text>
                            </TouchableOpacity>
                            <Menu
                                visible={this.state.isGenderMenuOpen}
                                onDismiss={() =>
                                    this.setState({ isGenderMenuOpen: false })
                                }
                                anchor={
                                    <TouchableOpacity
                                        style={styles.HalfInputRight}
                                        contentStyle={{ height: hp("7.7%") }}
                                        //labelStyle={{color: "#000"}}
                                        mode="outlined"
                                        onPress={() =>
                                            this.setState({
                                                isGenderMenuOpen: true
                                            })
                                        }
                                    >
                                        <Text
                                            style={{
                                                color: "rgba(0, 0, 0, .6)",
                                                fontSize: 16
                                            }}
                                        >
                                            {this.state.genderValue}
                                        </Text>
                                    </TouchableOpacity>
                                }
                            >
                                <Menu.Item
                                    onPress={() =>
                                        this.setState({
                                            genderValue: "Masculino",
                                            isGenderMenuOpen: false
                                        })
                                    }
                                    title="Masculino"
                                />
                                <Menu.Item
                                    onPress={() =>
                                        this.setState({
                                            genderValue: "Feminino",
                                            isGenderMenuOpen: false
                                        })
                                    }
                                    title="Feminino"
                                />
                            </Menu>
                        </View>
                        <TextInput
                            style={styles.LastnameInput}
                            label="Email"
                            mode="outlined"
                        />
                        <TextInput
                            style={styles.LastnameInput}
                            label="Ocupação"
                            mode="outlined"
                        />
                        <TextInput
                            style={styles.LastnameInput}
                            label="Nivel de Estudo"
                            mode="outlined"
                        />
                        <TextInput
                            style={styles.LastnameInput}
                            label="Como conheceu compartilhe?"
                            mode="outlined"
                        />
                        <View />
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                marginBottom: hp("2%")
                            }}
                        >
                            <Button
                                theme={{ color: { text: "#ffffff" } }}
                                mode="contained"
                                style={{
                                    height: hp("6%"),
                                    width: "45%",
                                    marginRight: wp("5%"),
                                    //color: '#fff',
                                    marginTop: "1%"
                                }}
                                contentStyle={{
                                    height: hp("6%")
                                }}
                                onPress={() =>
                                    navigate("RegistrationRefugeeFamily")
                                }
                            >
                                <Text style={{ color: "#ffffff" }}>
                                    CONFIRMAR
                                </Text>
                            </Button>
                        </View>
                    </View>
                    {this.state.isDatePickerOpen && (
                        <DateTimePicker
                            value={this.state.date}
                            mode={"date"}
                            is24Hour={true}
                            display="default"
                            onChange={this.setDate}
                        />
                    )}
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

RegRefugeeCont.navigationOptions = {
    title: "RegistrationRefugee"
};

const styles = StyleSheet.create({
    LogoSavi: {
        width: wp("80%"),
        height: hp("20%"),
        alignSelf: "center",
        justifyContent: "flex-start"
        //marginTop: hp("6%")
    },
    RegFamilyTitle: {
        fontSize: RFPercentage(5),
        //marginLeft: wp("5%"),
        marginTop: hp("3%"),
        fontWeight: "bold",
        alignSelf: "center",
        color: "#FFF",
        marginBottom: hp("5%")
    },
    RegFamilyText: {
        fontSize: RFPercentage(3),
        alignSelf: "center",
        marginLeft: wp("10%"),
        marginRight: wp("10%"),
        marginTop: hp("4%"),
        color: "#FFF",
        textAlign: "center",
        marginBottom: hp("10%")
    },
    NameInput: {
        marginLeft: wp("5%"),
        marginRight: wp("5%"),
        marginBottom: hp("1%"),
        marginTop: hp("2%")
    },
    LastnameInput: {
        marginLeft: wp("5%"),
        marginRight: wp("5%"),
        marginBottom: hp("1%")
    },
    HalfInputLeft: {
        marginLeft: wp("5%"),
        marginTop: hp(".9%"),
        width: wp("43.25%"),
        borderColor: "rgba(0, 0, 0, .6)",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        height: hp("7.8%")
    },
    HalfInputRight: {
        marginTop: hp(".9%"),
        marginTop: hp(".9%"),
        width: wp("43.25%"),
        borderColor: "rgba(0, 0, 0, .6)",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        height: hp("7.8%")
    }
});
