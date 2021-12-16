import React from "react";
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import style_default from '../shared/const';

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.header_text}>{ props.name }</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        display: "flex",
        backgroundColor: style_default.THEME_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50
    },
    header_text: {
        color: style_default.WHITE_COLOR,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default Header;
