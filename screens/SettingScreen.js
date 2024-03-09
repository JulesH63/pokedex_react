import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Switch, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

export function SettingScreen() {
  const [orientation, setOrientation] = useState(false);
  const navigation = useNavigation();

  const changeOrientation = async (value) => {
    setOrientation(value);
    if (value) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settingSwitch}>
        <Text style={styles.label}>Orientation horizontale du téléphone:</Text>
        <Switch
          value={orientation}
          onValueChange={(value) => changeOrientation(value)}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  settingSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
