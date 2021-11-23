/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  ScrollView,
  UIManager,
} from 'react-native';
import axios from 'axios';
import {DEFAULT_DATA} from './default_data';
import CatCard from './components/CatCard';
import {NavBar} from './components/NavBar';

const App = () => {
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const [cats, setCats] = useState(DEFAULT_DATA);
  const [favorites, setFavorites] = useState([5, 6, 7]);

  useEffect(() => {
    (async () => {
      try {
        const cat_obj = await axios.get(
          `https://api.thecatapi.com/v1/breeds?=${process.env.REACT_APP_HEADER}=${process.env.REACT_APP_API_KEY}`,
        );
        if (cat_obj) {
          const half = Math.round(cat_obj.data.length / 2);
          setCats([...cat_obj.data.slice(0, half)]);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const catList = () => {
    return cats.map((cat, i) => {
      return <CatCard cat={cat} styles={styles} key={i} />;
    });
  };

  const Favorites = () => {
    return (
      <ScrollView>
        <Text>Favorites</Text>
        {favorites.map(i => (
          <CatCard cat={cats[i]} key={i} />
        ))}
      </ScrollView>
    );
  };

  const Home = () => {
    return (
      <View style={{flex: 1}}>
        <Text style={{fontSize: 42}}>Profile</Text>
        <Text style={{fontSize: 64}}>PHOTO</Text>
        <Text style={{fontSize: 16}}>Name:</Text>
        <Text style={{fontSize: 16}}>Description:</Text>
        <Text style={{fontSize: 64}}>Your CATS!</Text>
        <Text style={{fontSize: 64, marginBottom: 100}}>
          PHOTOS.OF.YOUR.CATS
        </Text>
      </View>
    );
  };
  const router = [catList, Home, Favorites];
  const [view, setView] = useState(1);
  return (
    <View style={{flex: 1, backgroundColor: '#f35e5eed'}}>
      <ScrollView style={styles.topContainer}>
        <Text style={styles.title}>Pocket_Cats</Text>
        {cats.length > 2 ? (
          <View style={styles.catBar}>
            <ScrollView style={styles.centeredView}>
              {router[view]()}
            </ScrollView>
          </View>
        ) : (
          <View>
            <Text style={styles.loadingScreen}>Please wait a moment...</Text>
          </View>
        )}
      </ScrollView>
      <NavBar styles={styles} view={view} setView={setView} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingScreen: {
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
  },
  catBar: {
    padding: 15,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    fontWeight: '900',
  },
  image: {
    height: 100,
    width: 100,
    left: 20,
  },
  catName: {
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 0.25,
    backgroundColor: 'lightgray',
    flex: 1,
    zIndex: -1,
  },
});

export default App;
