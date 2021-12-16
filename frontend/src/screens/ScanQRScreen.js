import React, { useState, useEffect } from "react";
import { 
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import style_default from '../shared/const';
import Header from "../components/Header";

const ScanQRScreen = () => {

    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned');
    const [cameraPermission, setCameraPermission] = useState(null);

    const askForCameraPermission = async () => {
        const status = await BarCodeScanner.requestPermissionsAsync();
        //console.log(status);
        setCameraPermission(status.granted === true);
    };

    useEffect(() => {
        askForCameraPermission();
    }, []);

    const handleBarCodeScanner = ({type, data}) => {
        setScanned(true);
        setText(data);
        //console.log(type, data);
    };

    if (cameraPermission == null) {
        return (
            <View>
                <Text>Request for camera permission</Text>
            </View>
        )
    }

    if (cameraPermission === false) {
        return (
            <View>
                <Text>No access to camera</Text>
                <Button title="Allow Camera" onPress={() => askForCameraPermission()}></Button>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header name="Scan QR code"/>
            </View>
            <View style={styles.body}>
                <Text style={styles.scan_text}>{text}</Text>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanner} 
                    style={styles.scan_frame}
                />
                <TouchableOpacity
                    onPress={() => setScanned(false)}
                    style={styles.scan_button}
                >
                    <Text style={styles.scan_button_text}>Scan again?</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flex: 2
    },
    body: {
        flex: 6,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    scan_frame: {
        flex: 5,
        width: 250,
        height: 230,
    },
    scan_text: {
        flex: 1,
        fontSize: style_default.TEXT_SIZE,
        textAlign: 'center'
    },
    scan_button: {
        flex: 2,
        width: '60%',
        display: 'flex',
        justifyContent: 'center',
    },
    scan_button_text: {
        backgroundColor: style_default.THEME_COLOR,
        height: '60%',
        color: style_default.WHITE_COLOR,
        fontSize: style_default.BUTTON_TEXT_SIZE,
        textAlign: 'center',
        paddingTop: 17,
        borderRadius: 10
    }
});

export default ScanQRScreen;