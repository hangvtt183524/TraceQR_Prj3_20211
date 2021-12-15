import React, {useState} from 'react';
import {
  View, 
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert 
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { FontAwesome5 } from '@expo/vector-icons';
import BackButton from '../components/BackButton';

import axios from 'axios';
import style_default from '../shared/const';
import isAllDigits from '../Services/checkDigits';

const RegisterScreen = ({navigation}) => {

  const [hidePass, setHidePass] = useState(true);
  const [hideRetypePass, setHideRetypePass] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, setConfpassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const register = async function(event) {
    event.preventDefault();

    if (!email.trim() || !username.trim() || !password.trim() || !phoneNumber.trim()) {
      Alert.alert('Please fill out all information!');
    } else if (!isAllDigits(phoneNumber)) {
      Alert.alert('Invalid Phone Number!');
    } else if (confpassword !== password) {
      Alert.alert('Please confirm password again!');
    } else {
      const newAccount = {
        phoneNumber: phoneNumber,
        email: email,
        userName: username,
        password: password
      };

      await axios.post(`http://192.168.0.108:5000/accounts/register`, newAccount)
      .then(res => {
        if (res.data.code === '43') Alert.alert("This information has been used for another account!");
        else if (res.data.code === '50') Alert.alert("Error! Please try again after a few minutes...");
        else if (res.data.code === '20') {
          navigation.navigate('LoginScreen');
        } 
        else Alert.alert(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
    }

  };

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.header}>
        <Text style={styles.text_header}>Hãy đăng ký tài khoản!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
      >
        <ScrollView>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={style_default.AUTHEN_COLOR} size={20} />
            <TextInput 
              placeholder="Email"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={text => setEmail(text)}
            />
          </View>

          <Text style={styles.text_footer}>Phone Number</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={style_default.AUTHEN_COLOR} size={20} />
            <TextInput 
              placeholder="Số CCCD/CMND"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={text => setPhoneNumber(text)}
              keyboardType={'numeric'}
            />
          </View>

          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={style_default.AUTHEN_COLOR} size={20} />
            <TextInput 
              placeholder="Username"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={text => setUsername(text)}
            />
          </View>

          <Text style={styles.text_footer}>Mật khẩu</Text>
          <View style={styles.action}>
            <Feather name="lock" color={style_default.AUTHEN_COLOR} size={20} />
            <TextInput 
              placeholder="Nhập mật khẩu"
              autoCapitalize="none"
              style={styles.textInput}
              secureTextEntry={hidePass ? true : false}
              onChangeText={text => setPassword(text)}
            />
            <FontAwesome5
              name={hidePass ? 'eye' : 'eye-slash'} 
              color={'grey'} size={20} 
              onPress={() => setHidePass(!hidePass)}
            />
          </View>
          <Text style={styles.text_footer}>Nhập lại mật khẩu</Text>
          <View style={styles.action}>
            <Feather name="lock" color={style_default.AUTHEN_COLOR} size={20} />
            <TextInput 
              placeholder="Nhập lại chính xác mật khẩu"
              autoCapitalize="none"
              style={styles.textInput}
              secureTextEntry={hideRetypePass ? true : false}
              onChangeText={text => setConfpassword(text)}
            />
            <FontAwesome5
              name={hideRetypePass ? 'eye' : 'eye-slash'} 
              color={'grey'} size={20} 
              onPress={() => setHideRetypePass(!hideRetypePass)}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn}
              onPress={register}>
              <Text style={styles.textSign}>Đăng ký tài khoản</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: style_default.THEME_COLOR,
    flex: 1
  },
  header: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
    paddingRight: 100
  },
  footer: {
    flex: 3,
    backgroundColor: style_default.WHITE_COLOR,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: style_default.WHITE_COLOR,
    fontSize: 25, 
    fontWeight: 'bold'
  },
  text_footer: {
    color: style_default.AUTHEN_COLOR,
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 25
  },
  textInput: {
    flex: 1,
    margin: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 20,
    color: style_default.AUTHEN_COLOR,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  textSign: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: style_default.THEME_COLOR,
    borderWidth: 1,
    backgroundColor: style_default.THEME_COLOR,
  }
});