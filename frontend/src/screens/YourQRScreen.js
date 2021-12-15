import React, { useState } from "react";
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet
 } from 'react-native';
 import QRCode from 'react-native-qrcode-svg';
 import style_default from '../shared/const';
 
const YourQRScreen = () => {
    let isImage = false;

    const [qrcodeUrl, setQrcodeUrl] = useState('init qr');
    
    const generateQrcode = () => {
        const randomNumber = Math.floor(Math.random() * 100) + 1 ;
        setQrcodeUrl(randomNumber + 'current user id');
    };

    return (
        <View>
            <Text>YourQR Screen</Text>
            <QRCode 
                value={qrcodeUrl}
                style={styles.qrcode} />
            <TouchableOpacity
                onPress={generateQrcode}
            >
                <Text>New QR code</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    qrcode: {
        marginTop: 10,
        height: 150,
        width: 150,
        alignSelf: 'center',
        borderRadius: 20,
    },
})

export default YourQRScreen;