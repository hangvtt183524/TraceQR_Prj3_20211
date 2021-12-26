import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import style_default from '../shared/const';

const ChangeInfo = (props) => {
    const [isChange, setIsChange] = useState(false);
    const [newInfo, setNewInfo] = useState(null);

    return (
        <View style={styles.container}>
            {isChange ? 
            <TextInput               
                placeholder={props.info}
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={text => setNewInfo(text)}
            /> : 
            <Text>{ props.info }</Text>
            }
            {props.enableEdit ? 
            <View>
                <TouchableOpacity onPress={() => setIsChange(true)}>
                    <FontAwesome name="pencil" color="#000000" size={20}/>
                </TouchableOpacity>
            </View> : <View></View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
        marginLeft: 10
    },
    textInput: {
        borderColor: style_default.THEME_COLOR,
        borderBottomWidth: 1,
        width: '80%',
        height: '100%'
    }
});

export default ChangeInfo;
