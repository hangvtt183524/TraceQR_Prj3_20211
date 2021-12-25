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

    const saveQR = async function() {

        const requestData = {
            id: global.currentUser.id,
            accessToken: global.currentUser.accessToken,
            qr: text
        }

        console.log(requestData);
        await axios.post(`http://192.168.0.111:5000/qrs/save_qr`, requestData)
        .then(res => {
            if (res.data.code !== '20') {
                Alert.alert(res.data.message);
            } else {
                Alert.alert("QR code is saved");
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    const scanAgain = () => {
        setScanned(false);
        setText('Not yet scanned');
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
            { scanned === false ?
            <View style={styles.body_scan}>
                <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanner} 
                            style={styles.scan_frame}
                />
            </View> :
            <View style={styles.body_qr}>
                <View style={styles.qrcode}>
                    { text !== 'Not yet scanned' ? 
                        <QRCode 
                            value={text}
                            size={250}
                        /> : 
                        <Text>{{ text }}</Text>
                    }
                </View>
                <View style={styles.option}>
                    <TouchableOpacity
                            onPress={saveQR}
                            style={styles.button}
                    >
                        <Text style={styles.button_text}>Save</Text>
                    </TouchableOpacity>                
                    <TouchableOpacity
                            onPress={scanAgain}
                            style={styles.button}
                    >
                        <Text style={[styles.button_text, {
                            backgroundColor: style_default.WHITE_COLOR,
                            color: style_default.THEME_COLOR,
                            borderColor: style_default.THEME_COLOR,
                            borderWidth: 1
                        }]}>Scan again?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            }


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
    body_scan: {
        flex: 6,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 100,
    },
    body_qr: {
        flex: 6,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 130,
    },
    scan_frame: {
        flex: 5,
        width: 250,
        height: 270,
    },
    qrcode: {
        flex: 5
    },
    option: {
        flex: 2,
        width: '60%',
        paddingBottom: 30
    },
    button: {
        width: '100%',
    },
    button_text: {
        backgroundColor: style_default.THEME_COLOR,
        height: '75%',
        color: style_default.WHITE_COLOR,
        fontSize: style_default.BUTTON_TEXT_SIZE,
        textAlign: 'center',
        paddingTop: 15,
        borderRadius: 10
    },
/*     scan_button: {
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
    } */
});

export default ScanQRScreen;