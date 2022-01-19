import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import color_default from '../shared/const';
import style_default from '../shared/const';

import axios from "axios";

const ProfileScreen = ({navigation}) => {

    const logout = async () => {
        await axios.post(`http://192.168.0.102:5000/accounts/logout`, { accessToken: global.currentUser.accessToken })
        .then(res => {
            if (res.data.code === '20') navigation.navigate("LoginScreen");
            else Alert.alert(res.data.message);
        })
        .catch(err => {
            console.log(err);
        });
        
    };

    const changePassword = () => {
        navigation.navigate("ChangePasswordScreen");
    };

    const updateInfor = () => {
        navigation.navigate("ChangeInforScreen");
    };

    const aboutApp = () => {
        navigation.navigate("AboutScreen");
    };

    return (
        <ScrollView>
            <View>
                <View style={styles.top}>
                    <View style={styles.info}>
                        <View style={styles.textInfo}>
                            <Text style={styles.name}>{global.currentUser.userName}</Text>
                        </View>
                    </View>
                    <View>
                        <FontAwesome5 name="viruses" color={style_default.WHITE_COLOR} size={120} />
                    </View>
                </View>
            </View>
            <View style={styles.options}>
                <TouchableOpacity style={styles.option} onPress={updateInfor}>
                    <MaterialIcons name='person' size={40} style={styles.iconOption} />
                    <Text style={styles.textOption}>Update private information</Text>
                    <MaterialIcons name='arrow-forward-ios' size={20} style={styles.arrow} />
                </TouchableOpacity>
                <View style={{borderColor: 'grey', borderWidth: 0.5}}></View>
                <TouchableOpacity style={styles.option} onPress={aboutApp}>
                    <MaterialIcons name='info' size={40} style={styles.iconOption} />
                    <Text style={styles.textOption}>About app</Text>
                    <MaterialIcons name='arrow-forward-ios' size={20} style={styles.arrow} />
                </TouchableOpacity>
                <View style={{borderColor: 'grey', borderWidth: 0.5}}></View>
                <TouchableOpacity style={styles.option} onPress={logout}>
                    <MaterialIcons name='logout' size={40} style={styles.iconOption} />
                    <Text style={styles.textOption}>Logout</Text>
                    <MaterialIcons name='arrow-forward-ios' size={20} style={styles.arrow} />
                </TouchableOpacity>
                
            </View>
        </ScrollView>
    )
    
}

export default ProfileScreen;

const styles = StyleSheet.create({
    top: {
        backgroundColor: color_default.THEME_COLOR,
        height: 310,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    info: {
        height: 80,
        flexDirection: 'row',
    },
    textInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        alignContent: 'center',
        alignSelf: 'center',
        color: 'white',
    },
    phoneNumber: {
        fontSize: 15,
        color: 'white',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    qrcode: {
        marginTop: 10,
        height: 150,
        width: 150,
        alignSelf: 'center',
        borderRadius: 20,
    },
    options : {
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    option: {
        flexDirection: 'row',
        height: 60,
        marginLeft: 15,
        width: '100%',
    },
    iconOption: {
        alignSelf: 'center',
        color: '#696969',
    },
    textOption: {
        fontSize: 20,
        alignSelf: 'center',
        paddingLeft: 15,
        color: '#696969',
    },
    arrow: {
        alignSelf: 'center',
        position: 'absolute',
        paddingEnd: 10,
        color: 'grey',
        paddingLeft: 330,
    }

})