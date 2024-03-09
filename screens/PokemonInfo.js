import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { DetailPoke } from "../components/DetailPoke";

export function PokemonInfo({ route }) {
  const pokemonData = route.params.pokemonData;

  return (
    <ScrollView style={styles.container}>
      <DetailPoke pokemonInfo={pokemonData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
  },
});
