import React from "react";
import { Text } from "react-native";
import { IState } from "../../store/index";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Dialog, Portal } from "react-native-paper";
import Slider, { SliderProps } from "@react-native-community/slider";
// import { Container } from './styles';
interface IDistancePicker extends SliderProps {
    visible: boolean;
    onDismiss: () => void;
}

const DistancePicker: React.FC<IDistancePicker> = ({
    visible,
    onDismiss,
    value,
    onSlidingComplete,
    onValueChange,
}) => {
    const theme = useSelector<IState, any>((state) => state.theme);

    return (
        <Portal>
            <Dialog
                style={{ backgroundColor: "#0000", borderRadius: 12 }}
                visible={visible}
                onDismiss={onDismiss}
            >
                <LinearGradient
                    start={[0, 0]}
                    end={[1, 1]}
                    style={{ borderRadius: 15 }}
                    colors={["#21df85", "#21B685"]}
                >
                    <Dialog.Title>
                        <Text style={{ color: "white" }}>
                            Insira uma distância para buscar ofertas
                        </Text>
                    </Dialog.Title>
                    <Dialog.Content>
                        <Slider
                            step={10}
                            thumbTintColor={theme.background}
                            minimumTrackTintColor={theme.background}
                            style={{ backgroundColor: "#0000" }}
                            onSlidingComplete={onSlidingComplete}
                            onValueChange={onValueChange}
                            maximumValue={10000}
                        ></Slider>

                        <Text style={{ color: "#fff" }}>{value} Km</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button accessibilityStates onPress={onDismiss}>
                            <Text style={{ color: "#fff" }}>PRONTO</Text>
                        </Button>
                    </Dialog.Actions>
                </LinearGradient>
            </Dialog>
        </Portal>
    );
};

export default DistancePicker;
