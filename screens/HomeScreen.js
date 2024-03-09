import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { CardPoke } from "../components/CardPoke";

export function HomeScreen({ navigation }) {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsUrls, setPokemonsUrls] = useState(new Set());
  const pokemonLimit = 20;
  const [offset, setOffset] = useState(0);

  const gapSize = 8;

  const fetchPokemons = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${pokemonLimit}&offset=${offset}`
      );
      const newPokemons = response.data.results.filter((pokemon) => !pokemonsUrls.has(pokemon.url));
      setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
      newPokemons.forEach((pokemon) => pokemonsUrls.add(pokemon.url));
    } catch (error) {
      console.error("Error fetching Pokémon:", error.message);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  return (
    <View style={styles.container}>
      {pokemons && (
        <FlatList
          data={pokemons}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: gapSize,  }}
          columnWrapperStyle={{ paddingHorizontal: gapSize }}
          renderItem={({ item }) => (
            <CardPoke
              name={item.name}
              url={item.url}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.url}
          onEndReached={() => {
            setOffset(offset + pokemonLimit);
          }}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3e424b",
  },
});
