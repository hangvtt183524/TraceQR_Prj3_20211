import React, { useState } from "react";
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert
 } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import style_default from '../shared/const';
import Header from "../components/Header";

import axios from 'axios';

const YourQRScreen = ({navigation}) => {

    const [qrcodeUrl, setQrcodeUrl] = useState(global.currentUser.userName + ' ' + global.currentUser.id);
    
    const generateQrcode = async () => {
        const randomNumber = Math.floor(Math.random() * 100) + 1 ;
        const newQRCode = randomNumber + ' ' + global.currentUser.userName + ' ' + global.currentUser.id;
        setQrcodeUrl(newQRCode);

        const requestData = {
            id: global.currentUser.id,
            accessToken: global.currentUser.accessToken,
            qr: newQRCode
        }

        await axios.post(`http://192.168.1.7:5000/qrs/generate_qr`, requestData)
        .then(res => {
            if (res.data.code !== '20') {
                Alert.alert(res.data.message);
            } else {
                Alert.alert("New QR code is saved");
            }
        })
        .catch(err => {
            console.log(err);
        });

    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header name="Generate your QR code"/>
            </View>
            <View style={styles.qrcode}>
                <Text style={styles.qr_text}>Your QR Code</Text>
                <QRCode 
                    value={qrcodeUrl}
                    size={250}
                />
                <TouchableOpacity
                    onPress={generateQrcode}
                    style={styles.qr_button}
                >
                    <Text style={styles.qr_button_text}>New QR code</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flex: 2
    },
    qrcode: {
        flex: 6,
        height: '100%',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 100
    },
    qr_text: {
        fontSize: style_default.TEXT_SIZE,
        flex: 1
    },
    qr_image: {
        fontSize: 40,
        flex: 5
    },
    qr_button: {
        flex: 2,
        width: '60%',
        display: 'flex',
        justifyContent: 'center',
    },
    qr_button_text: {
        backgroundColor: style_default.THEME_COLOR,
        height: '60%',
        color: style_default.WHITE_COLOR,
        fontSize: style_default.BUTTON_TEXT_SIZE,
        textAlign: 'center',
        paddingTop: 20,
        borderRadius: 10
    }
})

export default YourQRScreen;