import React, { useContext, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );
  const [permissions] = useLocation(isFocused || recording, callback);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.title}>Add new track</Text>
          <Map />
          {permissions === 'denied' ? <Text>Please enable location services</Text> : null}
          <TrackForm />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
  tabBarIcon: ({ tintColor }) => <Ionicons name="ios-add-circle-outline" size={25} color={tintColor} />,
  tabBarOptions: {
    activeTintColor: '#2196f3',
    inactiveTintColor: '#666',
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#104b79',
    marginBottom: 15,
  },
});

export default withNavigationFocus(TrackCreateScreen);
