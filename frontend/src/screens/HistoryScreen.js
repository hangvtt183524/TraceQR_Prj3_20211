import React, { useState, useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';
import HistoryPlaceScreen from "./HistoryPlaceScreen";
import HistoryUserScreen from "./HistoryUserScreen";
import Header from "../components/Header";

const HistoryScreen = ({navigation}) => {
    return (
        <View>
            <View style={styles.header}>
                <Header name="Your history"/>
            </View>
            <View style={styles.body}>
                { global.currentType === 'private_user' ? 
                <HistoryUserScreen /> : <HistoryPlaceScreen />
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {

    },
    body: {
        width: '100%',
        height: '93%'
    }
})

export default HistoryScreen;