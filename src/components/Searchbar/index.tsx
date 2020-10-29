import React from "react";
import {
    View,
    TextInput,
    TextInputProps,
    StyleProp,
    TextStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./style";

interface SearchbarProps extends TextInputProps {
    onIconPress: () => {};
    inputStyle: StyleProp<TextStyle>;
    iconColor: string;
}
const Searchbar = (props: SearchbarProps) => {
    return (
        <View style={[props.style, styles.container]}>
            <View style={styles.icon}>
                <MaterialCommunityIcons
                    color={props.iconColor}
                    size={32}
                    name="magnify"
                />
            </View>
            <TextInput
                onSubmitEditing={props.onSubmitEditing}
                onChangeText={props.onChangeText}
                style={[props.inputStyle, styles.input]}
                value={props.value}
                placeholder={props.placeholder}
            />
        </View>
    );
};

export default Searchbar;
