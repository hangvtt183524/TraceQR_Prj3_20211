import React from "react";
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FunctionHome from "../components/FunctionHome";

import style_default from '../shared/const';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_info}>
          <Text style={styles.header_text}>Username</Text>
        </View>
        <View style={styles.header_icon}>
          <FontAwesome5 name="cat" color={style_default.WHITE_COLOR} size={60} />
        </View>
      </View>
      <View style={styles.body}>
        <View  style={styles.body_function}>
          <FunctionHome name="Warning" />
        </View>
        <View  style={styles.body_function}>
          <FunctionHome name="History" />
        </View>
        <View  style={styles.body_function}>
          <FunctionHome name="YourQR" />
        </View>
        <View  style={styles.body_function}>
          <FunctionHome name="Profile" />
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footer_qr}>
          <MaterialCommunityIcons name="qrcode-scan" color={style_default.WHITE_COLOR} size={30} />
        </View>
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-around',
    justifyContent: 'space-around'
  },
  body_function: {
    width: '40%',
    height: 150,
    backgroundColor: '#54a',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignContent: 'center'
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footer_qr: {
    borderRadius: 40,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: style_default.WHITE_COLOR,
    borderWidth: 3
  }
});

export default HomeScreen;