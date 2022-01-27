import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import style_default from '../shared/const';

const NotifyNode = (props) => {
    const [isVisible, setVisible] = useState(true);

    const seen = () => {
        setVisible(false);
    };

    if (isVisible)
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={[styles.info_text, {fontWeight: 'bold'}]}>{ props.name }</Text>
                { props.address ? <Text style={[styles.info_text, {fontSize: 15}]}>{ props.address }</Text> : <View></View>}
                <Text style={[styles.info_text, {marginTop: 10}]}>{ props.message }</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={seen}>
                <Text style={styles.button_text}>Seen</Text>
            </TouchableOpacity>
        </View>
    )

    else return (
        <View></View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ab2121',
        marginTop: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    info: {
        flex: 2
    },
    info_text: {
        fontSize: 18,
        color: '#000'
    },
    button: {
        backgroundColor: '#0bd66d',
        height: 30,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    button_text: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default NotifyNode;