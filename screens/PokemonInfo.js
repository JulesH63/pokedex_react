import React from "react";
import { ScrollView, Text, View } from "react-native";

export function PokemonInfos({ route }) {
  const pokemonData = route.params.pokemonData;

  return (
    <ScrollView contentContainerStyle={{ padding: 10, backgroundColor: "#fff" }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Pokemon Details</Text>
        <Text>Name: {pokemonData.name}</Text>
        <Text>Type: {pokemonData.type}</Text>
        <Text>Height: {pokemonData.height}</Text>
        <Text>Weight: {pokemonData.weight}</Text>
      </View>
    </ScrollView>
  );
}
