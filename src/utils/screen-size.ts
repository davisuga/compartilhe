import { Dimensions } from "react-native";

const hp = (percentage: number) => {
    return (Dimensions.get("screen").height / 100) * percentage;
};

const wp = (percentage: number) => {
    return (Dimensions.get("screen").width / 100) * percentage;
};

export { hp, wp };
