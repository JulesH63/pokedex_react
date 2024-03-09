import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { retrieveAllKeys, removeData, retrieveData, saveData, getPokemonColor } from "../utils/utils";

export function DetailPoke({ pokemonInfo }) {
  const pokemonData = pokemonInfo;
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    retrieveData(`pokemon[${pokemonData.id}]`).then((data) => {
      if (data) {
        setIsLiked(true);
      }
    });
  }, []);

  const toggleLike = async () => {
    if (!isLiked) {
      const allKeys = await retrieveAllKeys();
      const pokemonKeys = allKeys?.filter((key) => key.startsWith("pokemon["));
      if (pokemonKeys.length > 5) {
        Alert.alert("You can only have 6 liked pokemons");
        return;
      } else {
        setIsLiked(!isLiked);
        saveData(`pokemon[${pokemonData.id}]`, pokemonData);
      }
    } else if (isLiked) {
      removeData(`pokemon[${pokemonData.id}]`);
      setIsLiked(!isLiked);
    }
  };

  const renderTypeBadge = (type) => (
    <View
      style={{
        backgroundColor: getPokemonColor(type),
        borderRadius: 999,
        paddingHorizontal: 8,
        marginBottom: 6,
      }}
    >
      <Text style={{ color: "white", fontSize: 15, textTransform: "capitalize" }}>
        {type}
      </Text>
    </View>
  );

  const renderStatBar = (stat) => (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", maxWidth: 220, minWidth: 0 }}>
      <Text style={{ fontWeight: "bold", fontSize: 16, marginRight: 8, textTransform: "capitalize" }}>{stat.base_stat}</Text>
      <View style={{ width: "100%", flex: 1, height: 10, backgroundColor: "rgba(0, 0, 0, 0.1)", borderRadius: 999, overflow: "hidden" }}>
        <View style={{ width: `${(stat.base_stat / 200) * 100}%`, borderRadius: 999, backgroundColor: getPokemonColor(pokemonData?.types?.[0]?.type?.name), height: "100%" }} />
      </View>
    </View>
  );

  return (
    <>
      <View style={[styles.container, { backgroundColor: getPokemonColor(pokemonData?.types?.[0]?.type?.name) }]}>
        <Image
          style={styles.image}
          source={{ uri: pokemonData?.sprites?.front_default }}
        />
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => {
            toggleLike();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }}
        >
          <Ionicons
            name={isLiked ? "ios-heart" : "ios-heart-outline"}
            size={24}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{pokemonData.name}</Text>
          <View style={styles.typesContainer}>
            {renderTypeBadge(pokemonData?.types?.[0]?.type?.name)}
            {pokemonData?.types?.[1]?.type?.name && renderTypeBadge(pokemonData?.types?.[1]?.type?.name)}
          </View>
        </View>
        <View style={styles.statsContainer}>
          {pokemonData?.stats?.map((stat, index) => (
            <View style={styles.stat} key={index}>
              <Text style={styles.statName}>{stat.stat.name}</Text>
              {renderStatBar(stat)}
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    aspectRatio: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  likeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 999,
    backgroundColor: "white",
    borderRadius: 999,
    paddingHorizontal: 8,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    marginTop: 10,
    padding: 16,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  name: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  typesContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: "column",
    marginTop: 10,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statName: {
    textTransform: "capitalize",
    fontWeight: "500",
  },
});
