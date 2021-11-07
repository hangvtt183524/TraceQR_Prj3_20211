import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import { PRIMARY_COLOR, WHITE_COLOR } from './src/shared/const';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false}}/>
        <Stack.Screen
          name="LoginView" component={Login}
          options={{
            title: 'Đăng nhập',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: PRIMARY_COLOR,
            },
            headerTintColor: WHITE_COLOR,
          }}
        />
        <Stack.Screen
          name="RegisterView"
          component={Register}
          options={{
            title: 'Tạo tài khoản',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: PRIMARY_COLOR,
            },
            headerTintColor: WHITE_COLOR,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;