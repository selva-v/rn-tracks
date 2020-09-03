import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AccountScreen = () => {
  const {
    state: { name },
    signout,
  } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Account</Text>
        <View style={styles.wrapper}>
          <Image style={styles.avatar} source={require('../../assets/default-avatar.png')} />
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity style={styles.button} onPress={signout} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = () => {
  return {
    title: 'Account',
    tabBarIcon: ({ tintColor }) => <Ionicons name="ios-contact" size={25} color={tintColor} />,
    tabBarOptions: {
      activeTintColor: '#2196f3',
      inactiveTintColor: '#666',
    },
  };
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
    marginBottom: 30,
  },
  wrapper: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e8f4fd',
  },
  name: {
    fontSize: 20,
    color: '#104b79',
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#1d87da',
    color: '#fff',
    borderRadius: 4,
    padding: 10,
    height: 44,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default AccountScreen;
