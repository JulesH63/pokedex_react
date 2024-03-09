import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { getPokemonColor } from "../utils/utils";

export function CardPoke({
  name,
  url,
  navigation,
  pokemonDataFromTeam,
}) {
  const [pokemonData, setPokemonData] = useState({});

  const fetchPokemon = async () => {
    const response = await axios.get(url);
    setPokemonData(response.data);
  };

  useEffect(() => {
    if (url) fetchPokemon();
    if (pokemonDataFromTeam) setPokemonData(pokemonDataFromTeam);
  }, []);

  const pokeColor = getPokemonColor(pokemonData?.types?.[0]?.type?.name);

  return (
    pokemonData && (
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { pokemonData })}
        style={[styles.cardContainer, { backgroundColor: pokeColor }]}
      >
        <>
          <Text style={styles.name}>
            {name}
          </Text>
          <View style={styles.typeContainer}>
            <Text style={styles.type}>
              {pokemonData?.types?.[0]?.type?.name}
            </Text>
          </View>
          {pokemonData?.types?.[1]?.type?.name && (
            <View style={styles.typeContainer}>
              <Text style={styles.type}>
                {pokemonData?.types?.[1]?.type?.name}
              </Text>
            </View>
          )}
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: pokemonData?.sprites?.front_default }}
            />
          </View>
        </>
      </TouchableOpacity>
    )
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "50%",
    aspectRatio: 1,
    padding: 16,
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",
    margin: 4,
  },
  name: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    opacity: 50,
    borderRadius: 999,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  type: {
    color: "white",
    fontSize: 15,
    textTransform: "capitalize",
  },
  imageContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 120,
    height: 120,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
