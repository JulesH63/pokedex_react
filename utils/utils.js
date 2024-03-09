import AsyncStorage from "@react-native-async-storage/async-storage";

const pokemonColors = {
  normal: "#A8A77A",
  fighting: "#C22E28",
  flying: "#A98FF3",
  poison: "#A33EA1",
  ground: "#E2BF65",
  rock: "#B6A136",
  bug: "#A6B91A",
  ghost: "#735797",
  steel: "#B7B7CE",
  fire: "#EE8130",
  water: "#6390F0",
  grass: "#7AC74C",
  electric: "#F7D02C",
  psychic: "#F95587",
  ice: "#96D9D6",
  dragon: "#6F35FC",
  dark: "#705746",
  fairy: "#D685AD",
  unknown: "#FFFFFF",
  shadow: "#555555",
};

const getPokemonColor = (type) => {
  return pokemonColors[type] || "#FFFFFF"; // Default color
};

const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

const retrieveData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};


const retrieveMultipleData = async (keys) => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    return values;
  } catch (error) {
    console.error('Error retrieving multiple data:', error);
    return [];
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
  }
};

const retrieveAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    console.error('Error retrieving all keys:', error);
    return [];
  }
};

export {
  getPokemonColor,
  saveData,
  retrieveData,
  retrieveAllKeys,
  retrieveMultipleData,
  removeData,
};
