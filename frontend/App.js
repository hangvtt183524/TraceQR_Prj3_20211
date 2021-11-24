import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootNavigator from './src/navigation/RootNavigator';
import { PRIMARY_COLOR, WHITE_COLOR } from './src/shared/const';

const Stack = createNativeStackNavigator();
const App = () => {
  return (<RootNavigator></RootNavigator>);
}

export default App;