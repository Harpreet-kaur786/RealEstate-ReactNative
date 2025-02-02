import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home'; // Import Home screen component
import PropertyDetailScreen from './components/PropertyDetailScreen'; // Import PropertyDetailScreen component
import FavoritesScreen from './components/FavoritesScreen'; // Import FavoritesScreen component
import Contact from './components/Contact';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Contact" component={Contact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
console.log("hii")

export default App;
