import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);
  const [saveTrack] = useSaveTrack();

  const start = () => {
    if (name) {
      startRecording();
      setErrorMessage('');
    } else {
      setErrorMessage('Please provide a name for the track');
    }
  };
  const stop = () => {
    stopRecording();
  };

  const changeText = (text) => {
    if (text) {
      setErrorMessage('');
      changeName(text);
    } else {
      changeName(text);
    }
  };

  return (
    <View>
      <View style={styles.field}>
        <Text style={styles.label}>Track Name</Text>
        <TextInput value={name} onChangeText={changeText} style={styles.textinput} />
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      </View>
      {recording ? (
        <TouchableOpacity style={styles.stopButton} onPress={stop} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.startButton} onPress={start} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Start Recording</Text>
        </TouchableOpacity>
      )}
      {!recording && locations.length ? (
        <TouchableOpacity style={styles.saveButton} onPress={saveTrack} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Save Track</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
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
  startButton: {
    backgroundColor: '#1d87da',
    color: '#fff',
    borderRadius: 4,
    padding: 10,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  stopButton: {
    backgroundColor: '#da1d28',
    color: '#fff',
    borderRadius: 4,
    padding: 10,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#449d48',
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
  errorMessage: {
    color: '#da1d28',
  },
});

export default TrackForm;
