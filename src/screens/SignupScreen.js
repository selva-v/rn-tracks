import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <View style={styles.wrapper}>
          <Text style={styles.title}>Create Account,</Text>
          <Text style={styles.subTitle}>Sign up to get started!</Text>
          <View style={styles.field}>
            <Text style={styles.label}>Name</Text>
            <TextInput value={name} onChangeText={setName} style={styles.textinput} />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              style={styles.textinput}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="newPassword"
              style={styles.textinput}
            />
          </View>
          {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={() => signup({ name, email, password })} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.linkSection}>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')} activeOpacity={0.8}>
              <Text style={styles.linkText}>
                Already have an account? <Text style={styles.link}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#104b79',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#719cbd',
    marginBottom: 25,
  },
  field: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#104b79',
    marginBottom: 8,
  },
  textinput: {
    fontSize: 18,
    color: '#1769aa',
    backgroundColor: '#fff',
    borderColor: '#9dc0db',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    height: 44,
  },
  button: {
    backgroundColor: '#1d87da',
    color: '#fff',
    borderRadius: 4,
    padding: 10,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  linkSection: {
    alignSelf: 'center',
    marginTop: 40,
  },
  linkText: {
    fontSize: 16,
    color: '#2f313e',
  },
  link: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1d87da',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginBottom: 15,
  },
});

export default SignupScreen;
