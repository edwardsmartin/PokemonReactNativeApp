import React, { useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  FlatList,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const [text, setText] = useState('');
  const [pokemon, setPokemon] = useState([]);
  const [image, setImage] = useState('');

  // makes a request to this exercise API:
  // https://api-ninjas.com/api/exercises
  async function getPokemonData(pokemon) {
    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon/' + pokemon
      );
      const json = await response.json();
      setPokemon(json.moves);
      setImage(json.sprites.other.home.front_default);
    } catch (error) {
      console.log(error);
    }
  }

  async function clearPokemonData() {
    try {
      setText('');
      setPokemon([]);
      setImage('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a Pokemon to display its list of moves. e.g. pickachu"
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <Button
        style={styles.button}
        onPress={() => getPokemonData(text)}
        title="Fetch A Pokemon's Move Data"
      />
      <Button 
        style={styles.button}
        onPress={() => clearPokemonData()} 
        title="Clear Pokemon Data" 
      />
      <FlatList style={styles.text}
        data={pokemon}
        renderItem={({ item }) => <Text>{item.move.name}</Text>}
        keyExtractor={(item) => item.move.name}
      />
      <Image source={image} style={{ height: 200, width: 200 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    margin: 20,
    border: 20,
  },
  input: {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: '14px 20px',
    margin: '8px 0',
    border: 'none',
    cursor: 'pointer',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'red'
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});
