import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { getBackgroundColor } from "../utils/utils";

export function CardPokemon({
  pokemonName,
  pokemonUrl,
  navigation,
  pokemonDataFromTeam,
}) {
  const [pokemonData, setPokemonData] = useState({});

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

  useEffect(() => {
    if (pokemonUrl) fetchPokemon();
    if (pokemonDataFromTeam) setPokemonData(pokemonDataFromTeam);
  }, []);

  const bgColor = getBackgroundColor(pokemonData?.types?.[0]?.type?.name);

  return (
    pokemonData && (
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { pokemonData })}
        style={{
          backgroundColor: bgColor,
          width: "45%",
          aspectRatio: 1,
          padding: 16,
          borderRadius: 12,
          margin: "2.5%",
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
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "capitalize",
              marginBottom: 8,
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
                  fontSize: 14,
                  textTransform: "capitalize",
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  borderRadius: 20,
                  marginRight: 4,
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
              height: "60%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: "70%", height: "70%", resizeMode: "contain" }}
              source={{
                uri: pokemonData?.sprites?.front_default,
              }}
            />
          </View>
        </>
      </TouchableOpacity>
    )
  );
}
