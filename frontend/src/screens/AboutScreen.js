import React, { useState, useEffect } from "react";
import { 
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import style_default from '../shared/const';
import Header from "../components/Header";
import axios from "axios";

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header name="About App"/>
            </View>
            <View style={styles.body}>
                <View>
                    <Text style={styles.title}>Purpose</Text>
                    <Text style={styles.content}>Trace Covid-19 - this app is supposed to monitor your transfer place to place.</Text>
                    <Text style={styles.content}>Using Trace Covid-19, user can:</Text>
                    <Text style={styles.content}>-- Generate your own QR code and Scan others</Text>
                    <Text style={styles.content}>-- Check your history places moving</Text>
                    <Text style={styles.content}>-- Update health state</Text>
                    <Text style={styles.content}>-- Received warning about close contacts</Text>
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={styles.title}>Develop</Text>
                    <Text style={styles.content}>https://github.com/hangvtt183524</Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {

    },
    header: {

    },
    body: {
        marginHorizontal: 15,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    content: {
        fontSize: 15
    }
});

export default AboutScreen;