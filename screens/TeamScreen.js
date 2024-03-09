import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAllKeys, multiGet } from '../utils/utils';

export function TeamScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const keys = await getAllKeys();
      const filteredKeys = keys?.filter((key) => key.startsWith('pokemon['));
      const pokemonDataPairs = await multiGet(filteredKeys);
      const pokemonValues = pokemonDataPairs.map(([_, value]) => JSON.parse(value));
      setPokemonList(pokemonValues);
    } catch (error) {
      console.error('Error retrieving Pokémon data:', error);
    }
  };



  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        renderItem={renderPokemonItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
