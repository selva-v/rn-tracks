import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import { Context as TrackContext } from '../context/TrackContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);

  return (
    <SafeAreaView>
      <NavigationEvents onWillFocus={fetchTracks} />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {state.length ? (
            <FlatList
              data={state}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('TrackDetail', { _id: item._id })}
                    style={styles.item}
                    activeOpacity={0.7}
                  >
                    <View>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.date}>
                        {new Date(parseInt(item._id.toString().substring(0, 8), 16) * 1000).toDateString()}
                      </Text>
                    </View>
                    <Ionicons name="ios-arrow-forward" style={styles.icon} size={25} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item._id}
            />
          ) : (
            <View style={styles.noTrack}>
              <Text style={styles.hooray}>Hooray! Add you first track.</Text>
              <Ionicons name="ios-happy" style={styles.iconHappy} size={50} />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

TrackListScreen.navigationOptions = {
  title: 'Tracks',
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
  item: {
    backgroundColor: '#f1f8fd',
    padding: 12,
    borderColor: '#bcdffb',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#104b79',
  },
  date: {
    fontSize: 13,
    color: '#104b79',
  },
  icon: {
    color: '#104b79',
    alignSelf: 'flex-end',
  },
  noTrack: {
    alignItems: 'center',
    marginVertical: 20,
  },
  hooray: {
    fontSize: 20,
    color: '#104b79',
    alignSelf: 'center',
    marginBottom: 10,
  },
  iconHappy: {
    color: '#61a6d8',
    alignSelf: 'center',
  },
});

export default TrackListScreen;
