import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import MapView, { Marker } from 'react-native-maps';
import Video from 'react-native-video';
import { Picker } from '@react-native-picker/picker';


const featuredProperties = [
  {
    id: '1',
    title: 'Luxury Apartment in NYC',
    price: '$1,500,000',
    city: 'New York',
    latitude: 40.7128,
    longitude: -74.0060,
    image: require('../assets/appartments.png'),
    type: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1500,
    description: 'A luxury apartment located in the heart of NYC with stunning views of Central Park.',
    available: true,
    rating: 4.5,
    reviews: 150,
  },
  {
    id: '2',
    title: 'Beachfront Villa',
    price: '$2,200,000',
    city: 'Miami',
    latitude: 25.7617,
    longitude: -80.1918,
    image: require('../assets/beachFront.png'),
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 3500,
    description: 'A gorgeous beachfront villa with private pool and easy beach access.',
    available: false,
    rating: 4.7,
    reviews: 180,
  },
  {
    id: '3',
    title: 'Downtown Loft',
    price: '$800,000',
    city: 'Los Angeles',
    latitude: 34.0522,
    longitude: -118.2437,
    image: require('../assets/loft.png'),
    type: 'Loft',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    description: 'Modern loft in downtown Los Angeles with an industrial chic vibe.',
    available: true,
    rating: 4.0,
    reviews: 80,
  },
];

const Home = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(featuredProperties);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({ priceRange: null, propertyType: null, bedrooms: null });
  const navigation = useNavigation();  // Use the navigation hook

  const navigateToFavorites = () => {
    navigation.navigate('FavoritesScreen', {
      favorites: favorites,
      setFavorites: setFavorites,
    });
  };

  const toggleFavorite = (property) => {
    setFavorites((prev) =>
      prev.includes(property) ? prev.filter((item) => item !== property) : [...prev, property]
    );
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredProperties(featuredProperties);
      return;
    }

    const filteredData = featuredProperties.filter((property) =>
      property.title.toLowerCase().includes(query.toLowerCase()) ||
      property.city.toLowerCase().includes(query.toLowerCase()) ||
      property.price.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProperties(filteredData);
  };

  const applyFilters = () => {
    const { priceRange, propertyType, bedrooms } = selectedFilter;
    let filteredData = featuredProperties;

    if (priceRange) {
      filteredData = filteredData.filter(
        (property) => property.price >= priceRange.min && property.price <= priceRange.max
      );
    }
    if (propertyType) {
      filteredData = filteredData.filter((property) => property.type === propertyType);
    }
    if (bedrooms) {
      filteredData = filteredData.filter((property) => property.bedrooms === bedrooms);
    }

    setFilteredProperties(filteredData);
    setIsFilterModalVisible(false); // Close the modal after applying filters
  };

  const filterOptions = {
    priceRange: [
      { min: 0, max: 500000 },
      { min: 500000, max: 1000000 },
      { min: 1000000, max: 5000000 },
    ],
    propertyTypes: ['Apartment', 'Villa', 'House', 'Loft'],
    bedrooms: [1, 2, 3, 4, 5],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../assets/logo.jpg')} style={styles.logo} />
          <Text style={styles.appName}>Real Estate App</Text>
          <TouchableOpacity onPress={navigateToFavorites}>
            <Icon name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search by city, property type..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.filterButton} onPress={() => setIsFilterModalVisible(true)}>
            <Icon name="filter-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Map Integration */}
        <View style={styles.mapContainer}>
          <Text style={styles.sectionTitle}>Explore Nearby Properties</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.7749,
              longitude: -122.4194,
              latitudeDelta: 1,
              longitudeDelta: 1,
            }}
          >
            {filteredProperties.map((property) => (
              <Marker
                key={property.id}
                coordinate={{ latitude: property.latitude, longitude: property.longitude }}
                title={property.title}
                description={property.price}
              />
            ))}
          </MapView>
        </View>

        {/* Featured Properties */}
        <View style={styles.featuredContainer}>
          <Text style={styles.sectionTitle}>Featured Properties</Text>
          {filteredProperties.length > 0 ? (
            <FlatList
              data={filteredProperties}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.propertyCard}
                  onPress={() => navigation.navigate('PropertyDetail', { property: item })}
                >
                  <Image source={item.image} style={styles.propertyImage} />
                  <View style={styles.propertyDetails}>
                    <Text style={styles.propertyTitle}>{item.title}</Text>
                    <Text style={styles.propertyPrice}>{item.price}</Text>
                    <TouchableOpacity onPress={() => toggleFavorite(item)}>
                      <Icon
                        name={favorites.includes(item) ? 'heart' : 'heart-outline'}
                        size={24}
                        color={favorites.includes(item) ? 'red' : 'gray'}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text style={styles.noResultsText}>No properties match your search.</Text>
          )}
        </View>

        {/* CTA Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Looking for your dream home?</Text>
          <TouchableOpacity
            style={styles.bannerButton}
            onPress={() => navigation.navigate('Contact')}
          >
            <Text style={styles.bannerButtonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Apply Filters</Text>

            {/* Price Range Filter */}
            <Text style={styles.filterLabel}>Price Range</Text>
            <Picker
              selectedValue={selectedFilter.priceRange}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setSelectedFilter({ ...selectedFilter, priceRange: itemValue })
              }
            >
              <Picker.Item label="Any" value={null} />
              <Picker.Item label="Up to $500,000" value={{ min: 0, max: 500000 }} />
              <Picker.Item label="$500,000 - $1,000,000" value={{ min: 500000, max: 1000000 }} />
              <Picker.Item label="Above $1,000,000" value={{ min: 1000000, max: Infinity }} />
            </Picker>

            {/* Property Type Filter */}
            <Text style={styles.filterLabel}>Property Type</Text>
            <Picker
              selectedValue={selectedFilter.propertyType}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setSelectedFilter({ ...selectedFilter, propertyType: itemValue })
              }
            >
              <Picker.Item label="Any" value={null} />
              <Picker.Item label="Apartment" value="Apartment" />
              <Picker.Item label="Villa" value="Villa" />
              <Picker.Item label="Loft" value="Loft" />
            </Picker>

            {/* Bedrooms Filter */}
            <Text style={styles.filterLabel}>Bedrooms</Text>
            <Picker
              selectedValue={selectedFilter.bedrooms}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setSelectedFilter({ ...selectedFilter, bedrooms: itemValue })
              }
            >
              <Picker.Item label="Any" value={null} />
              {[1, 2, 3, 4, 5].map((bedroomCount) => (
                <Picker.Item key={bedroomCount} label={`${bedroomCount} Bedrooms`} value={bedroomCount} />
              ))}
            </Picker>

            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
          
   


        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { marginTop: 10 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 },
  logo: { width: 40, height: 40 },
  appName: { fontSize: 24, fontWeight: 'bold' },
  searchContainer: { flexDirection: 'row', padding: 10 },
  searchBar: { flex: 1, height: 40, borderColor: '#ccc', borderWidth: 1, paddingLeft: 10 },
  filterButton: { justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  mapContainer: { height: 300 },
  map: { ...StyleSheet.absoluteFillObject },
  featuredContainer: { margin: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  propertyCard: { width: 200, marginRight: 10 },
  propertyImage: { width: '100%', height: 120, borderRadius: 10 },
  propertyDetails: { padding: 10 },
  propertyTitle: { fontWeight: 'bold' },
  propertyPrice: { color: 'gray' },
  noResultsText: { color: 'gray', textAlign: 'center' },
  banner: { backgroundColor: '#f1f1f1', padding: 20, alignItems: 'center' },
  bannerText: { fontSize: 18, fontWeight: 'bold' },
  bannerButton: { backgroundColor: '#007bff', padding: 10, marginTop: 10, borderRadius: 5 },
  bannerButtonText: { color: 'white', fontWeight: 'bold' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: 300, backgroundColor: 'white', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  filterLabel: { marginBottom: 5, fontWeight: 'bold' },
  picker: { height: 50, marginBottom: 15 },
  applyButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
  applyButtonText: { color: 'white', fontWeight: 'bold' },
  videoSection: { margin: 10 },
  videoCard: { marginBottom: 20 },
  videoTitle: { fontWeight: 'bold', marginBottom: 5 },
  videoPlayer: { width: '100%', height: 200, backgroundColor: 'black' },videoSection: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  
});

export default Home;

