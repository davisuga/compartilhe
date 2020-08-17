import React, { Component } from "react";
import MapView from "react-native-maps";

export default class MapConf extends Component {
    state = {
        region: null
    };

    render() {
        const { region } = this.state;

        return (
            <MapView
                style={{ flex: 1 }}
                region={region}
                showsUserLocation
                loadingEnabled
            />
        );
    }
}
