import React from "react";
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import style_default from '../shared/const';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_info}>
          <Text style={styles.header_text}>Username</Text>
          <MaterialCommunityIcons name="qrcode-scan" color={style_default.WHITE_COLOR} size={30} />
        </View>
        <View style={styles.header_icon}>
          <FontAwesome5 name="cat" color={style_default.WHITE_COLOR} size={60} />
        </View>
      </View>
      <View style={styles.body}>

      </View>
      <View style={styles.footer}>
        <FontAwesome name="history" color={style_default.WHITE_COLOR} size={25} />
        <FontAwesome name="location-arrow" color={style_default.WHITE_COLOR} size={32} />
        <View style={styles.footer_qr}>
          <FontAwesome name="qrcode" color={style_default.WHITE_COLOR} size={40} />
        </View>
        <Ionicons name="md-add-circle-outline" color={style_default.WHITE_COLOR} size={32} />
        <FontAwesome name="user-circle" color={style_default.WHITE_COLOR} size={25} />
        
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
    paddingVertical: 30
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