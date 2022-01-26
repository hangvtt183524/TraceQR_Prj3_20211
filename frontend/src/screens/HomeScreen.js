import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert
} from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import FunctionHome from "../components/FunctionHome";

import style_default from '../shared/const';

const HomeScreen = ({navigation}) => {

  const [hasWarning, setWarning] = useState(true);

  useEffect(() => {
    checkWarning();
  }, []);


  const toYourQR = () => {
    navigation.navigate('YourQRScreen');
  } 

  const toScanQR = () => {
    navigation.navigate('ScanQRScreen');
  }

  const toHistory = () => {
    navigation.navigate('HistoryScreen');
  }

  const checkWarning = async () => {
    const requestData = {
      id: global.currentUser.id,
      accessToken: global.currentUser.accessToken,
    };

    await axios.post(`http://192.168.1.7:5000/nortifies/check_have_nortifies`, requestData)
    .then(res => {
      if (res.data.code === '20') {
        setWarning(true);
        if (res.data.count > 0) {
          global.countWarning = res.data.count;
        }
      }
      else if (res.data.code === '40a') {
        setWarning(false);
      }
      else Alert.alert(res.data.message);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_info}>
          <Text style={styles.header_text}>{global.currentUser.userName}</Text>
        </View>
        <View style={styles.header_icon}>
          <FontAwesome5 name="viruses" color={style_default.WHITE_COLOR} size={60} />
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.body_main}>
          <View  style={styles.body_function}>
            <FunctionHome name="Scan QR" event={toScanQR} />
          </View>
          <View  style={styles.body_function}>
            <FunctionHome name="History" event={toHistory} />
          </View>
          <View  style={styles.body_function}>
            <FunctionHome name="YourQR" event={toYourQR} />
          </View>
        </View>
        {hasWarning ? 
        <View style={styles.warning}>
          <MaterialCommunityIcons name="message-plus" color='#ab2121' size={40} />
        </View> : <View></View>
        }
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: style_default.THEME_COLOR
  },
  header: {
    flex: 1.75,
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
    alignContent: 'space-between',
    marginTop: 20
  },
  header_info : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header_text: {
    color: style_default.WHITE_COLOR,
    fontSize: 20
  },
  header_icon: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    alignItems: 'center'
  },
  warning: {
    flex: 0.5,
    width: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 20
  },
  body_main: {
    flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-around',
    justifyContent: 'space-around'
  },
  body_function: {
    width: '80%',
    height: 85,
    backgroundColor: '#54a',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignContent: 'center'
  },
});

export default HomeScreen;