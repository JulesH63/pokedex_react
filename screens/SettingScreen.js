import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SMS from 'expo-sms';

export function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const toggleSwitch = async () => {
    if (isEnabled) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    }
    setIsEnabled((previousState) => !previousState);
  };

  const sendMessage = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync([phoneNumber], 'Pika Pika Pikachu !!!⚡️', {
        attachments: {
          uri: 'https://www.icegif.com/wp-content/uploads/2021/11/icegif-110.gif',
          mimeType: 'image/gif',
          filename: 'pikachu.gif',
        },
      });
    } else {
      // Misfortune... il n'y a pas de SMS disponible sur cet appareil
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.settingItem}>
        <Text>Landscape orientation</Text>
        <Switch
          trackColor={{ false: '#fefefe', true: '#fb6c6c' }}
          thumbColor={isEnabled ? '#fff' : '#fff'}
          ios_backgroundColor='#fefefe'
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.settingItem}>
        <Text>Enter your phone number to have a surprise</Text>
        <TextInput
          style={styles.phoneNumberInput}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          keyboardType='numeric'
          returnKeyType='done'
          onSubmitEditing={sendMessage}
        />
      </View>
      <Button title='Send Surprise' onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  phoneNumberInput: {
    padding: 10,
    height: 40,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
});
