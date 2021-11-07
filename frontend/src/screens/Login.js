import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import { PRIMARY_COLOR, WHITE_COLOR } from '../shared/const';

const Login = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10}}>
      <View>
        <Text style={{ color: '#333333'}}>
          Bạn có thể đăng nhập bằng số điện thoại hoặc username
        </Text>
        <View>
          <TextInput
            placeholder='Tài khoản'
            value={'hi'}
          />
          <TextInput
            placeholder='Mật khẩu'
            value={'hi'}
          />
          <TouchableOpacity>
            <Text style={{ color: PRIMARY_COLOR}}>
              Lấy lại mật khẩu
            </Text>
          </TouchableOpacity>
          
          <View style={{ alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.button}
            >
              <Text style={{ color: WHITE_COLOR}}>
                  Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10, alignItems: 'center',}}>
        <Text style={{ borderBottomWidth: 1, }}>
          Các câu hỏi thường gặp
        </Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
    width: 180,
  },
});

export default Login;