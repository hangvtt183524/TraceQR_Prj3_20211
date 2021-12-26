import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import axios from "axios";

const NotificationScreen = () => {

    useEffect(() => {
        loadwarning();
    }, []);

    const loadwarning = async () => {
        const requestData = {
            id: global.currentUser.id,
            accessToken: global.currentUser.accessToken,
        };

        await axios.post(`http://192.168.0.111:5000/nortifies/get_list_nortifies`, requestData)
        .then(res => {

        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <View>
            <Text>Thông báo</Text>
        </View>
    )
}

export default NotificationScreen;