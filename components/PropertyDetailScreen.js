import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps'; // Import MapView for property location

const PropertyDetailScreen = ({ route, navigation }) => {
  const { property } = route.params; // Get property data passed from Home Screen

  const handleContact = () => {
    // Handle contact or inquiry logic
    alert('Contacting agent for ' + property.title);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#333" style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Property Details</Text>
      </View>

      {/* Property Image */}
      <Image source={property.image} style={styles.propertyImage} />
      
      {/* Property Details */}
      <View style={styles.propertyDetails}>
        <Text style={styles.propertyTitle}>{property.title}</Text>
        <Text style={styles.propertyPrice}>{property.price}</Text>
        
        <View style={styles.propertyInfo}>
          <Text style={styles.infoText}>Bedrooms: {property.bedrooms}</Text>
          <Text style={styles.infoText}>Bathrooms: {property.bathrooms}</Text>
          <Text style={styles.infoText}>Area: {property.area} sqft</Text> {/* Add area if available */}
        </View>
        
        <Text style={styles.propertyDescription}>
          This is a detailed description of the property. You can add more information here.
        </Text>
        
        {/* Contact Button */}
        <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
          <Text style={styles.contactButtonText}>Contact Agent</Text>
        </TouchableOpacity>
      </View>

      {/* Property Map */}
      <View style={styles.mapContainer}>
        <Text style={styles.sectionTitle}>Property Location</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: property.latitude,
            longitude: property.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: property.latitude, longitude: property.longitude }}
            title={property.title}
            description={property.price}
          />
        </MapView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  propertyImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  propertyDetails: {
    padding: 20,
  },
  propertyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  propertyPrice: {
    fontSize: 20,
    color: '#007AFF',
    marginBottom: 10,
  },
  propertyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  propertyDescription: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  contactButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  map: {
    height: 300,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PropertyDetailScreen;
