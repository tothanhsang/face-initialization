import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import TakePicture from './FaceRecognition'
import Background from './Background'

const Stack = createStackNavigator();

App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="TakePicture" component={TakePicture} />
      <Stack.Screen name="Home" component={Background} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;