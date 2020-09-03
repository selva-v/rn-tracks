import React, { useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';

const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={styles.spinner} />;
  }
  return (
    <MapView
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      style={styles.map}
    >
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(23, 108, 194, 1.0)"
        fillColor="rgba(23, 108, 194, 0.5)"
      />
      <Polyline
        coordinates={locations.map((loc) => loc.coords)}
        strokeWidth={4}
        strokeColor="rgba(23, 108, 194, 1.0)"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
    marginBottom: 15,
  },
  spinner: {
    marginTop: 200,
  },
});

export default Map;
