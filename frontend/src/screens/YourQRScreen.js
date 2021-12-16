import React, { useState } from "react";
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet
 } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import style_default from '../shared/const';
import Header from "../components/Header";

const YourQRScreen = () => {
    let isImage = false;

    const [qrcodeUrl, setQrcodeUrl] = useState('init qr');
    
    const generateQrcode = () => {
        const randomNumber = Math.floor(Math.random() * 100) + 1 ;
        setQrcodeUrl(randomNumber + 'current user id');
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