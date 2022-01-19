import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style_default from '../shared/const';

const ModalLoading = () => {

    return (
        <View style={styles.container}>
            <View style={styles.loading}>
                <AntDesign name="loading1" color={style_default.WHITE_COLOR} size={80} />
            </View>
            <View>
                <Text style={styles.text}>Loading</Text>
            </View>
            
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: style_default.THEME_COLOR,
    },
    loading: {
        width: '50%',
        height: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -60
    },
    text: {
        fontSize: 30,
        color: style_default.WHITE_COLOR,
        fontWeight: 'bold'
    }
});

export default ModalLoading;
