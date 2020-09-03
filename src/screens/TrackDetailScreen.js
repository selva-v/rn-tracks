import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Context as TrackContext } from '../context/TrackContext';
import MapView, { Polyline } from 'react-native-maps';

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const _id = navigation.getParam('_id');

  const track = state.find((t) => t._id === _id);
  const initialCoords = track.locations[0].coords;

  const speed = track.locations.map((loc) => loc.coords.speed);
  const averageSpeed = (speed) => {
    return (speed.reduce((a, b) => a + b) / speed.length).toFixed(2);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>{track.name}</Text>
          <MapView
            initialRegion={{
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
              ...initialCoords,
            }}
            style={styles.map}
          >
            <Polyline
              coordinates={track.locations.map((loc) => loc.coords)}
              strokeWidth={4}
              strokeColor="rgba(23, 108, 194, 1.0)"
            />
          </MapView>
          <View style={styles.detailsContainer}>
            <Text style={styles.speedTxt}>Avg. Speed: </Text>
            <Text style={styles.speedNum}>{averageSpeed(speed)}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

TrackDetailScreen.navigationOptions = {
  title: 'Track details',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
  },
  wrapper: {
    height: '100%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#104b79',
    marginBottom: 15,
  },
  map: {
    height: 300,
    marginBottom: 15,
  },
  detailsContainer: {
    flexDirection: 'row',
  },
  speedTxt: {
    fontSize: 16,
    color: '#104b79',
  },
  speedNum: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#104b79',
  },
});

export default TrackDetailScreen;
