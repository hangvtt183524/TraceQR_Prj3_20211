import React, { useState, useEffect } from "react";
import { View, 
    Text, 
    Alert,
    StyleSheet,
    ScrollView
} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header from "../components/Header";
import style_default from '../shared/const';
import NotifyNode from "../components/Notify";

import axios from "axios";

const NotificationScreen = () => {

    const [notification, setNotification] = useState(false);
    const [listNotifies, setListNotifies] = useState(null);

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
            if (res.data.code === '20') {
                let returnListPlace = [];
                const returnData = res.data.data;
                for (let i=0; i<returnData.length; i++) {
                    returnListPlace.push(<NotifyNode key={i} name={returnData[i].name} address={returnData[i].address} message={returnData[i].message} _idNotify={returnData[i]._idNotify} />);
                }
                setListNotifies(returnListPlace);
                setNotification(true);
            } 
            else if (res.data.code === '40a') {
                setNotification(false);
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
                <Header name="Notifications"/>
            </View>
            <View style={styles.body}>
                <View style={styles.body_title}>
                    <FontAwesome5 name="bell" size={20} />
                    {notification ? 
                    <Text style={{marginLeft: 30, fontWeight: 'bold', fontSize: 20}}>You have some notifications</Text> :
                    <Text style={{marginLeft: 30, fontWeight: 'bold', fontSize: 20}}>Not notification yet</Text>
                    }
                </View>
                <ScrollView style={styles.list_notifies}>
                    {listNotifies}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    header: {

    },
    body: {
        marginTop: 15,
        paddingHorizontal: 15
    },
    body_title: {
        backgroundColor: '#0bd66d',
        height: 35,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    list_notifies: {

    }
});

export default NotificationScreen;