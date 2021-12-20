import React, { useState } from "react";
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';
import Header from "../components/Header";
import { 
    Marker,
    Circle
} from 'react-native-maps';

import style_default from '../shared/const';

const MapScreen = ({navigation}) => {

    const [mark, setMark] = useState({latitude: 21.028511, longitude: 105.804817});
    const completeMark = () => {
        global.location = mark;
        navigation.navigate('RegisterScreen');
    };
    const pressMap = (event) => {
        const lat = event.nativeEvent.coordinate.latitude;
        const long = event.nativeEvent.coordinate.longitude;
        setMark({latitude: lat, longitude: long});
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header name="Mark your location"/>
            </View>
            <View style={styles.body}>
                <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 21.028511,
                    longitude: 105.804817,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                onPress={pressMap}
                >
                    <Marker
                        coordinate={mark}
                        draggable={true}

                    />
                        <Circle center={mark}
                            radius={70} />
                    
                </MapView>
                <View style={styles.action}>
                    <TouchableOpacity style={styles.button}
                        onPress={completeMark}>
                        <Text style={styles.button_text}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...StyleSheet.absoluteFillObject,
    },
    header: {
        width: '100%',
        flex: 2,
        marginBottom: -170
    },
    body: {
        flex: 6,
        width: '100%'
    },
    map: {
        width: '100%',
        height: '91%'
    }, 
    action: {
        width: '100%',
        height: '9%'
    },
    button: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: style_default.THEME_COLOR,
        borderWidth: 1,
        backgroundColor: style_default.THEME_COLOR,
    },
    button_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: style_default.WHITE_COLOR
    }
})
export default MapScreen;