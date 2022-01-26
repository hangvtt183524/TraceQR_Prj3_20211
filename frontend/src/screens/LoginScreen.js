import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    TextInput,
    Platform,
    TouchableOpacity,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesom from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import style_default from '../shared/const';
import { FontAwesome, FontAwesome5, Fontisto } from "@expo/vector-icons";
import axios from 'axios';
import isAllDigits from '../Services/checkDigits';
import RadioGroup from 'react-native-custom-radio-group';
import ModalLoading from "../components/ModalLoading";

const radioGroupList = [
    {
    label: 'Private User',
    value: 'private_user'
    }, {
    label: 'Public Place',
    value: 'public_place'
    }
];
const LoginScreen = ({navigation}) => {
    const { colors } = useTheme();

    const [hidePass, setHidePass] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [valid, setValid] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);


    const login =  async function (event) {
        event.preventDefault();

        if (!phoneNumber.trim() && !email.trim()) {
            Alert.alert("Please fill at least your email or phone number");
        } else if (phoneNumber.trim() && !isAllDigits(phoneNumber)) {
            Alert.alert('Invalid Phone Number!');
        } else if (!password.trim()) {
            Alert.alert("Please enter your password!");
        } else if (type === '') {
            Alert.alert("Please choose your role: Private user or Public place?");
        } else { 
            const account = {
                phoneNumber: phoneNumber,
                email: email,
                password: password,
                type: type
            };
            setLoading(true);
            await axios.post(`http://192.168.1.7:5000/accounts/login`, account)
            .then(res => {
                if (res.data.code === '40a') Alert.alert(res.data.message);
                else if (res.data.code === '40') Alert.alert("Wrong password!");
                else if (res.data.code === '50') Alert.alert("Error! Please try again after a few minutes...");
                else if (res.data.code === '20') {
                    global.currentUser = res.data.data;
                    global.currentType = type;
                    //console.log(global.currentUser);
                    setLoading(false);
                    navigation.navigate('Home');
                } 
                else Alert.alert(res.data.message);
            })
            .catch(err => {
                console.log(err);           
            });
            setLoading(false);
        }
    };

    const home = () => {
        navigation.navigate("Home");
    };

    const register = () => {
        if (type === '') Alert.alert("Please choose your role: Private user or Public place?");
        else {
            if (type === 'private_user') global.userTypeLabel = 'Username';
            else global.userTypeLabel = "Address";
            navigation.navigate("RegisterScreen");
        }
    };

    const changeUserType = (value) => {
        if (value === 'private_user') setType('private_user');
        else setType('public_place');
    }

    if (loading) {
        return (<ModalLoading />)
    }

    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor='#009387' barStyle='light-content'></StatusBar> */}
            <View style={styles.header}>
                <FontAwesome5 name="viruses" color={style_default.WHITE_COLOR} size={60} />
                <Text style={styles.text_header}>Login</Text>
            </View>
            <Animatable.View 
                animation='fadeInUpBig'
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <View style={styles.radio_group}>
                    <Text style={[styles.text_footer, {color: colors.text, fontSize: 20}]}>You are?</Text>
                    <RadioGroup 
                    radioGroupList={radioGroupList}
                    buttonContainerStyle={styles.radio_button}
                    buttonContainerActiveStyle={{backgroundColor: style_default.THEME_COLOR}}
                    onChange={changeUserType}
                    />
                </View>
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Phone Number</Text>
                <View style={styles.action}>
                    <FontAwesom name="phone" color={colors.text} size={20} />
                    <TextInput 
                        placeholder="Phone Number"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        keyboardType={'numeric'}
                        onChangeText={text => setPhoneNumber(text)}
                    />
                </View>

                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Email</Text>
                <View style={styles.action}>
                    <Fontisto name="email" color={colors.text} size={20} />
                    <TextInput 
                        placeholder="Email"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={text => setEmail(text)}
                    />
                </View>

                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" color={colors.text} size={20} />
                    
                    <TextInput 
                        placeholder="Password"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        secureTextEntry={hidePass ? true : false}
                        autoCapitalize="none"
                        onChangeText={text => setPassword(text)}
                    />
                    <FontAwesome5
                        name={hidePass ? 'eye' : 'eye-slash'} 
                        color={colors.text} size={20} 
                        onPress={() => setHidePass(!hidePass)}
                    />
                </View>
                <TouchableOpacity>
                    <Text style={{color: '#666666', marginTop: 15}}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, {
                            borderColor: style_default.THEME_COLOR,
                            borderWidth: 1,
                            marginTop: 15,
                        }]}
                        onPress={login}
                    >
                        <Text style={[styles.textSign, {color:'white'}]}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.signUp, {
                            borderColor: style_default.THEME_COLOR,
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                        onPress={register}
                    >
                        <Text style={styles.textSign}>Register Account</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: style_default.THEME_COLOR,
    },
    header: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        paddingRight: 100
    },
    text_header: {
        color: style_default.WHITE_COLOR,
        fontWeight: 'bold',
        fontSize: 40, 
        marginLeft: 30,
        marginTop: 50
    },
    footer: {
        flex: 3,
        backgroundColor: style_default.WHITE_COLOR,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        margin: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 20,
        color: '#05375a',
        
    },
    button: {
        alignItems: 'center',
        marginTop: 40
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: style_default.THEME_COLOR,
    },
    signUp: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        
    },
    radio_group: {
        height: 30,
        marginBottom: 40
    },
    radio_button: {
        borderColor: style_default.THEME_COLOR,
        height: '100%',
        width: 150,
        borderRadius: 10,
        borderWidth: 1
    }
});