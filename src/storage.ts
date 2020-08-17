import { AsyncStorage } from "react-native";

export const storeData = async (key: string, value: any): Promise<void> => {
    //console.log(`saving `, key, ": ", value);

    try {
        if (typeof (value !== "string")) {
            value = JSON.stringify(value);
        }
        //console.log('saving ', key, ': ', value)
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(`error saving data ${key}:${value} -> ${error}`);
        return error;
    }
};

export const fetchData = async (
    key: string
): Promise<string | undefined | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        //console.log(`fetching `, key, ": ", value);
        return value;
    } catch (error) {
        console.log(`error fetching data ${key} -> ${error}`);
    }
};
export const clear = () => AsyncStorage.clear();

export const unstring = (value: string) => {
    if (value !== null) {
        if (value[value.length - 1] == '"' && value[0] == '"') {
            return value.slice(1, -1);
        }
        return value;
    }
};
export const seeAllValues = () => {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
            stores.map((result, i, store) => {
                console.log({ [store[i][0]]: store[i][1] });
                return true;
            });
        });
    });
};
