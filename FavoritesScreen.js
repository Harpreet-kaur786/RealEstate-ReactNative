import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FavoritesScreen = ({ route, navigation }) => {
  const { favorites = [], setFavorites } = route.params || {};  // Destructure with fallback to empty array

  // If setFavorites is not passed, display an error
  if (!setFavorites) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Error: Unable to modify favorites.</Text>
      </View>
    );
  }

  // Remove a property from the favorites list
  const removeFromFavorites = (property) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== property.id));
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites yet!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <View style={styles.propertyCard}>
            <Image source={{ uri: item.image }} style={styles.propertyImage} />
            <View style={styles.propertyDetails}>
              <Text style={styles.propertyTitle}>{item.title}</Text>
              <Text style={styles.propertyPrice}>{item.price}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('PropertyDetail', { property: item })}>
                <Text style={styles.viewDetail}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeFromFavorites(item)}>
                <Icon name="heart" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()} // Ensure `id` is a string for FlatList
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  propertyCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  propertyImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  propertyDetails: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  propertyPrice: {
    fontSize: 16,
    color: '#007AFF',
  },
  viewDetail: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 5,
  },
});

export default FavoritesScreen;
