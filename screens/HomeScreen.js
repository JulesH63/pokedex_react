import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export function HomeScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
      setPokemonList(response.data.results);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  };



  const handleSearch = (query) => {
    setSearchQuery(query);
    // Effectuer la recherche ou le filtrage ici
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Pokémon"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={pokemonList}
        renderItem={renderPokemonItem}
        keyExtractor={(item) => item.name}
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
