import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AlbumPhotosScreen from '../screens/albumPhotos/AlbumPhotosScreen';

type RootStackParamList = {
  Home: undefined;
  AlbumPhotos: { albumId: number; albumTitle: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerTitle: "Albums",
        }}/>
        <Stack.Screen name="AlbumPhotos" component={AlbumPhotosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
