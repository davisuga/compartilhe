import React from "react";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
const OrgRegister = () => {
    const [code, setCode] = useState(null);
    const submit = () => {
        "???";
    };
    return (
        <>
            <TextInput
                label="Código de confirmação"
                value={code}
                onChangeText={code => setCode({ code })}
            />
            <Button onPress={submit()}>Confirmar!</Button>
        </>
    );
};

export default OrgRegister;
