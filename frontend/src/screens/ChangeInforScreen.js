import React, { useState, useEffect } from "react";
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView
 } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import style_default from '../shared/const';
import Header from "../components/Header";
import ChangeInfo from "../components/ChangeInfo";

import axios from 'axios';

const ChangeInforScreen = ({navigation}) => {

    const [isShowSituation, setShowSituation] = useState(false);
    const [isShowPassword, setShowPassword] = useState(false);
    const [state, setState] = useState(3);
    const [newUsername, setNewUsername] = useState(null);
    const [newPassword, setNewPassword] = useState(null);

    var radio_props = [
        {label: 'F0', value: 0 },
        {label: 'F1', value: 1 },
        {label: 'F2', value: 2 },
        {label: 'Normal', value: 3}
    ];
    

    const showSituation = () => {
        setShowSituation(!isShowSituation);
    };

    const showPassword = () => {
        setShowPassword(!isShowPassword);
    };

    const updateInfo = async () => {
        let router = `http://192.168.0.111:5000/states/update_situation_only`;
        const requestData = {
            id: global.currentUser.id,
            accessToken: global.currentUser.accessToken,
            state: state,
        };

        if (newUsername !== null) {
            requestData.newUsername = newUsername;
            router = `http://192.168.0.111:5000/states/update_info`;
        };

        if (newPassword !== null) {
            requestData.newPassword = newPassword;
            router = `http://192.168.0.111:5000/states/update_info`;
        }

        await axios.post(router, requestData)
        .then(res => {
            if (res.data.code === '20') Alert.alert("Successfully update");
            else Alert.alert(res.data.message);
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header name="Update information"/>
            </View>
            <ScrollView style={styles.body}>
                <View style={styles.body_situation_container}>
                    <TouchableOpacity style={styles.body_situation} onPress={showSituation}>
                        <Text style={styles.text_title}>Update your Covid situation</Text>
                        {isShowSituation ? 
                            <MaterialIcons name="keyboard-arrow-up" color={style_default.THEME_COLOR} size={30} /> :
                            <MaterialIcons name="keyboard-arrow-down" color={style_default.THEME_COLOR} size={30} /> 
                        }    
                    </TouchableOpacity>
                    {isShowSituation ? 
                    <View style={styles.select_situation}>
                        <RadioForm
                            radio_props={radio_props}
                            initial={3}
                            onPress={value => setState(value)}
                            buttonColor={style_default.THEME_COLOR}
                            selectedButtonColor={'#0bd66d'}
                        />
                    </View> : <View></View>     
                    }
                </View>
                <View style={styles.private_info}>
                    <Text style={styles.text_title}>Private Information</Text>
                    <View style={styles.info_detail}>
                        <FontAwesome name="user-o" color={style_default.AUTHEN_COLOR} size={20} />
                        <Text style={styles.text_detail}>Username: </Text>
                        <ChangeInfo info={global.currentUser.userName} enableEdit={true} />
                    </View>
                    <View style={styles.info_detail}>
                        <FontAwesome name="phone" color={style_default.AUTHEN_COLOR} size={20} />
                        <Text style={styles.text_detail}>PhoneNumber: </Text>
                        <ChangeInfo info={global.currentUser.userName} enableEdit={false} />
                    </View>
                    <View style={styles.info_detail}>
                        <Fontisto name="email" color={style_default.AUTHEN_COLOR} size={20} />
                        <Text style={styles.text_detail}>Email: </Text>
                        <ChangeInfo info={global.currentUser.userName} enableEdit={false} />
                    </View>
                    <View style={styles.info_detail}>
                        <Feather name="lock" color={style_default.AUTHEN_COLOR} size={20} />
                        <Text style={styles.text_detail}>Password: </Text>
                        <ChangeInfo info={global.currentUser.userName} enableEdit={false} />
                    </View>
                    <View>
                        <TouchableOpacity onPress={showPassword} style={styles.body_situation}>
                            <Text style={styles.text_title}>Change Password</Text>
                            {isShowPassword ? 
                                <MaterialIcons name="keyboard-arrow-up" color={style_default.THEME_COLOR} size={30} /> :
                                <MaterialIcons name="keyboard-arrow-down" color={style_default.THEME_COLOR} size={30} /> 
                            }   
                        </TouchableOpacity>
                        {isShowPassword ? 
                        <View>
                            <View style={styles.info_detail}>
                                <Octicons name="unverified" color={style_default.AUTHEN_COLOR} size={20} />
                                <Text style={styles.text_detail}>Current password: </Text>
                                <ChangeInfo info="" enableEdit={true} />
                            </View>
                            <View style={styles.info_detail}>
                                <FontAwesome5 name="user-edit" color={style_default.AUTHEN_COLOR} size={20} />
                                <Text style={styles.text_detail}>New password: </Text>
                                <ChangeInfo info="" enableEdit={true} />
                            </View>
                            <View style={styles.info_detail}>
                                <FontAwesome name="check-square" color={style_default.AUTHEN_COLOR} size={20} />
                                <Text style={styles.text_detail}>Confirm password: </Text>
                                <ChangeInfo info="" enableEdit={true} />
                            </View>
                        </View> : <View></View>     
                        }
                    </View>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.update_button} onPress={updateInfo}>
                        <Text style={[styles.text_title, {color: style_default.WHITE_COLOR, textAlign: 'center'}]}>Update</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
};

export default ChangeInforScreen;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flex: 0.08
    },
    body: {
        flex: 8,
        height: '100%',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    body_situation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: style_default.THEME_COLOR,
        borderTopWidth: 1
    },
    select_situation: {
        borderColor: style_default.THEME_COLOR,
        borderRadius: 10,
        borderWidth: 2,
        marginTop: 20,
        paddingTop: 10,
        paddingLeft: 10
    },
    text_title: {
        color: style_default.THEME_COLOR,
        fontSize: 20
    },
    private_info: {
        marginTop: 20,
        borderColor: style_default.THEME_COLOR,
        borderTopWidth: 1,
    },
    info_detail: {
        flexDirection: 'row',
        marginTop: 10,
        height: 50,
        alignItems: 'center',
    },
    text_detail: {
        fontSize: 15,
        textAlign: 'center',
        marginLeft: 10
    },
    button: {
        backgroundColor: style_default.THEME_COLOR,
        height: 50,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 250
    },
    update_button: {
    }
});