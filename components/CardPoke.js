import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { getPokemonColor } from "../utils/utils";

export function CardPokemon({
  pokemonName,
  pokemonUrl,
  navigation,
  pokemonDataFromTeam,
}) {
  const [pokemonData, setPokemonData] = useState({});

  useEffect(() => {
    if (pokemonUrl) fetchPokemon();
    if (pokemonDataFromTeam) setPokemonData(pokemonDataFromTeam);
  }, []);

  const fetchPokemon = async () => {
    try {
      const response = await fetch(pokemonUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  const PokeColor = getPokemonColor(pokemonData?.types?.[0]?.type?.name);

  return pokemonData && (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { pokemonData })}
      style={{
        backgroundColor: PokeColor,
        width: 200,
        height: 200,
        padding: 10,
        borderRadius: 10,
        margin: 10,
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
      }}
    >
      <>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            textTransform: "capitalize",
            marginBottom: 5,
            textAlign: "center",
          }}
        >
          {pokemonName}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {pokemonData?.types.map((type, index) => (
            <Text
              key={index}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                color: "white",
                fontSize: 12,
                textTransform: "capitalize",
                paddingVertical: 2,
                paddingHorizontal: 6,
                borderRadius: 10,
                marginRight: 2,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              {type.type.name}
            </Text>
          ))}
        </View>
        <View
          style={{
            width: "100%",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 100, height: 100, resizeMode: "contain" }}
            source={{
              uri: pokemonData?.sprites?.front_default,
            }}
          />
        </View>
      </>
    </TouchableOpacity>
  );
}
