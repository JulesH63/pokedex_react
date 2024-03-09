import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

export function SearchScreen() {
  const [searchString, setSearchString] = useState("");
  const [resultId, setResultId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchPokemonList = async () => {
    setResultId(null);
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchString.toLowerCase()}`);
      setResultId(response.data.id);
    } catch (error) {
      console.error('Error searching Pokémon:', error.message);
      setResultId(null);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchString === "") {
      setResultId(null);
    } else {
      fetchPokemonList();
    }
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

      {isLoading && <LoadingSpinner />}
      {resultId ? (
        <ScrollView style={{ flex: 1 }}>
          <Card id={resultId} navigation={navigation} scale={0.8} />
          <View style={{ height: 30 }}></View>
        </ScrollView>
      ) : (
        <View style={styles.content}>
          {searchString.length > 0 && isError && (
            <Text style={styles.text}>The Pokémon "{searchString}" was not found.</Text>
          )}
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
