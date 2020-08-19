import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import MapStyle from "../components/MapStyle";
import { IState, IPosition, IMarker } from "../store";

export default function components() {
  function selectMarker(name, description, distance) {
    dispatch({
      type: "SELECT_MARKER",
      name: name,
      description: description,
      distance: distance,
    });
  }

  function deselectMarker() {
    dispatch({ type: "DESELECT_MARKER" });
  }

  const dispatch = useDispatch();
  const region = useSelector<IState, IPosition>((state) => state.user.location);
  let markers = useSelector<IState, IMarker[]>((state) => state.markers);
  markers == null ? (markers = []) : console.log;
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={region}
      showsUserLocation
      loadingEnabled
      customMapStyle={MapStyle}
      onPress={() => deselectMarker()}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.objectId}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.name}
          description={marker.description.spanish}
          onPress={() => {
            selectMarker(
              marker.name,
              marker.description.spanish,
              marker.distance
            );
          }}
        />
      ))}
    </MapView>
  );
}
