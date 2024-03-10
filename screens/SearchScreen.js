import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { CardPoke } from "../components/CardPoke";
import axios from 'axios';

export function SearchScreen() {
  const [searchString, setSearchString] = useState("");
  const [resultId, setResultId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [error, setError] = useState(null); 

  let searchTimeout;

  const fetchPokemonList = async () => {
    setResultId(null);
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchString.toLowerCase()}`);
      setResultId(response.data.id);
    } catch (error) {
      console.error('Error searching Pokémon:', error.message);
      setError("The Pokémon was not found.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchString === "") {
      setResultId(null);
      return;
    }

    // Déclencher la recherche après une pause de 500ms
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      fetchPokemonList();
    }, 500);

    // Nettoyer le timeout lors du démontage du composant
    return () => clearTimeout(searchTimeout);
  }, [searchString]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchbar}>
        <TextInput
          placeholder="Search Pokemon"
          onChangeText={(text) => setSearchString(text)}
          value={searchString}
          style={styles.input}
        />
      </View>

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {error ? (
        <View style={styles.content}>
          <Text style={styles.text}>{error}</Text>
        </View>
      ) : resultId ? (
        <ScrollView style={{ flex: 1 }}>
          <CardPoke id={resultId} navigation={navigation} scale={0.8} />
          <View style={{ height: 30 }}></View>
        </ScrollView>
      ) : (
        <View style={styles.content}>
          <Text style={styles.text}>No Pokémon found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  searchbar: {
    width: "100%",
    height: 50,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
});
