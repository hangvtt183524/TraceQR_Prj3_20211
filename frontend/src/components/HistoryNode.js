import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import style_default from '../shared/const';

const HistoryNode = (props) => {
    const [showModal, setShowModal] = useState(false);

    const detail = () => {
        setShowModal(true);
    }

    const hideModal = () => {
        setShowModal(false);
    }
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Ionicons name="git-commit-outline" color={style_default.THEME_COLOR} size={30}/>
                <Text style={styles.header_text}>{ props.placeName }</Text>
            </View>
            <TouchableOpacity
                onPress={detail}>
                <Ionicons name="ios-arrow-redo-circle-outline" color={style_default.THEME_COLOR} size={30}/>
            </TouchableOpacity>
            <Modal visible={showModal} transparent>
                <View style={styles.modal_container}>
                    <View style={styles.modal_content_container}>
                        <View style={styles.modal_calender}>
                            <View>
                                <Text style={[styles.header_text, {color: style_default.THEME_COLOR, fontSize: 25}]}>Detail Information</Text>
                            </View>
                            <View>
                                <Text style={[styles.history_text, {fontWeight: 'bold', fontSize: 20}]}>{props.placeName}</Text>
                                <Text style={styles.history_text}>{props.address}</Text>
                                <Text style={styles.history_text}>{props.dateScan} : {props.timeScan}</Text>
                            </View>
                            <View style={styles.select_button}>
                                <TouchableOpacity onPress={hideModal}>
                                    <Text style={styles.selectText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
};

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
        color: style_default.PRIMARY_COLOR,
        fontSize: 20,
        fontWeight: 'bold'
    },
    modal_container: {
        backgroundColor: style_default.PRIMARY_COLOR,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7
    },
    modal_content_container: {
        backgroundColor: style_default.WHITE_COLOR,
        width: '80%',
        height: '40%',
        borderRadius: 15,
    },
    modal_calender: {
        backgroundColor: style_default.WHITE_COLOR,
        width: '100%',
        height: '100%',
        opacity: 1,
        borderRadius: 15,
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        
    },
    select_button: {
        backgroundColor: style_default.THEME_COLOR,
        opacity: 1,
        width: '30%',
        height: 40,
        borderRadius: 10,
        marginLeft: 190,
    },
    selectText: {
        textAlign: 'center',
        color: style_default.WHITE_COLOR,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 6
    },
    history_text: {
        fontSize: 17,
        marginTop: 5
    }
});

export default HistoryNode;
