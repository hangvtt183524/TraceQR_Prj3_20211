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
import ModalLoading from "../components/ModalLoading";
import axios from "axios";

const NotificationScreen = () => {

    const [notification, setNotification] = useState(false);
    const [listNotifies, setListNotifies] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadwarning();
    }, []);

    const loadwarning = async () => {
        const requestData = {
            id: global.currentUser.id,
            accessToken: global.currentUser.accessToken,
        };
        setLoading(true);

        let url = null;
        if (global.currentType === 'private_user') {
            url = `http://192.168.1.7:5000/nortifies/get_list_nortifies`
        } else {
            url = `http://192.168.1.7:5000/nortifies/get_list_nortifies_place`
        }

        await axios.post(url, requestData)
        .then(res => {
            if (res.data.code === '20') {
                let returnListPlace = [];
                const returnData = res.data.data;

                if (global.currentType === 'private_user') {
                    for (let i=0; i<returnData.length; i++) {
                        returnListPlace.push(<NotifyNode key={i} name={returnData[i].name} address={returnData[i].address} message={returnData[i].message} _idNotify={returnData[i]._idNotify} />);
                    }
                } else {
                    for (let i=0; i<returnData.length; i++) {
                        returnListPlace.push(<NotifyNode key={i} name="Warning" message={returnData[i].message} _idNotify={returnData[i]._idNotify} />);
                    }
                }
                
                global.countWarning = returnData.length;
                setLoading(false);
                setListNotifies(returnListPlace);
                setNotification(true);
            } 
            else if (res.data.code === '40a') {
                setLoading(false);
                setNotification(false);
            }
            else {
                setLoading(false);
                Alert.alert(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
        });
        setLoading(false);
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
                { loading ? <ModalLoading /> :
                <ScrollView style={styles.list_notifies}>
                    {listNotifies}
                </ScrollView>
                }
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