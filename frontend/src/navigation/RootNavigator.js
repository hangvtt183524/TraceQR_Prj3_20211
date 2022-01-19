import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import HistoryScreen from "../screens/HistoryScreen";
import YourQRScreen from "../screens/YourQRScreen";
import ScanQRScreen from "../screens/ScanQRScreen";
import MapScreen from "../screens/MapScreen";
import ChangeInforScreen from "../screens/ChangeInforScreen";
import AboutScreen from "../screens/AboutScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
    return (
        <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="home" size={24} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{
                    tabBarLabel: "Notify",
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="notification" size={24} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="user" size={24} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const RootNavigator = () => {
    global.isLogin = true;
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="Home" component={Home} options={{headerShown: false }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
                <Stack.Screen name="YourQRScreen" component={YourQRScreen} />
                <Stack.Screen name="ScanQRScreen" component={ScanQRScreen} />
                <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="MapScreen" component={MapScreen} />
                <Stack.Screen name="ChangeInforScreen" component={ChangeInforScreen} />
                <Stack.Screen name="AboutScreen" component={AboutScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default RootNavigator;