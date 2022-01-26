import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HistoryPlaceScreen from "../screens/HistoryPlaceScreen";
import style_default from '../shared/const';

const HistoryPlaceNode = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Ionicons name="git-commit-outline" color={style_default.THEME_COLOR} size={30}/>
                <Text style={styles.header_text}>{ props.datetime }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '94%',
        height: 50,
        marginTop: 10,
        borderTopColor: style_default.THEME_COLOR,
        borderTopWidth: 1,
        marginLeft: 10,
        marginRight: 10
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '35%'
    },
    header_text: {
        color: style_default.THEME_COLOR,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default HistoryPlaceNode;