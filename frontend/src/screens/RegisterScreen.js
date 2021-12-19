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
import { FontAwesome5, Fontisto } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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
  const [type, setType] = useState(global.userTypeLabel);

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
        password: password,
        type: type
      };

      await axios.post(`http://192.168.0.111:5000/accounts/register`, newAccount)
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

  const goToMap = () => {
    navigation.navigate("MapScreen");
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.header}>
        <FontAwesome5 name="cat" color={style_default.WHITE_COLOR} size={60} />
        <Text style={styles.text_header}>Register</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
      >
        <ScrollView>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <Fontisto name="email" color={style_default.AUTHEN_COLOR} size={20} />
            <TextInput 
              placeholder="Email"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={text => setEmail(text)}
            />
          </View>

          <Text style={styles.text_footer}>Phone Number</Text>
          <View style={styles.action}>
            <FontAwesome name="phone" color={style_default.AUTHEN_COLOR} size={20} />
            <TextInput 
              placeholder="Phone Number"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={text => setPhoneNumber(text)}
              keyboardType={'numeric'}
            />
          </View>

          <Text style={styles.text_footer}>{type}</Text>
          { type === 'Username' ? 
          <View style={styles.action}>
            <FontAwesome name="user-o" color={style_default.AUTHEN_COLOR} size={20} />
            <TextInput 
              placeholder={type}
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={text => setUsername(text)}
            />
          </View> :
          <View style={{marginBottom: 25}}>                  
            <View style={[styles.action, {
              marginBottom: 10
            }]}>
              <FontAwesome name="address-card-o" color={style_default.AUTHEN_COLOR} size={20} />
              <TextInput 
                placeholder={type}
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={text => setUsername(text)}
              />
            </View>
            <View>
              <TouchableOpacity style={styles.gotomap}
                onPress={goToMap}>
                <Text style={styles.textSign}>Mark your location in map</Text>
                <MaterialIcons name='navigate-next' color={style_default.WHITE_COLOR} size={40} />
              </TouchableOpacity>
            </View>
          </View>
          }

          <Text style={styles.text_footer}>Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color={style_default.AUTHEN_COLOR} size={20} />
            <TextInput 
              placeholder="Password"
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
          <Text style={styles.text_footer}>Confirm Password</Text>
          <View style={styles.action}>
            <Feather name="check-square" color={style_default.AUTHEN_COLOR} size={20} />
            <TextInput 
              placeholder="Confirm Password"
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
              <Text style={styles.textSign}>Register Now</Text>
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
    justifyContent: 'flex-start',
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
    fontWeight: 'bold',
    fontSize: 40, 
    marginLeft: 30,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: style_default.WHITE_COLOR
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
  },
  gotomap: {
    width: '80%',
    height: 40,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: style_default.THEME_COLOR,
    borderWidth: 1,
    backgroundColor: style_default.THEME_COLOR,
    marginLeft: 70,
    flexDirection: 'row'
  }
});