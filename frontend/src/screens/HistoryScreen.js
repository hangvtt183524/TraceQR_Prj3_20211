import React, { useState, useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import CalendarPicker from 'react-native-calendar-picker';
import MapView from 'react-native-maps';
import { 
    Marker,
    Circle
} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HistoryNode from "../components/HistoryNode";
import style_default from '../shared/const';
import Header from "../components/Header";

import axios from 'axios';
import ModalLoading from "../components/ModalLoading";

const months = {
    "Jan": '01',
    "Feb": '02',
    "Mar": '03',
    "Apr": '04',
    "May": '05',
    "Jun": '06',
    "Jul": '07',
    "Aug": '08',
    "Sep": '09',
    "Oct": '10',
    "Nov": '11',
    "Dec": '12'
}
const HistoryScreen = ({navigation}) => {

    const [datetime, setDatetime] = useState(null);
    const [selectDatetime, setSelectDatetime] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [historyNode, setHistoryNode] = useState(null);
    const [historyMark, setHistoryMark] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //const dateNow = new Date();
        //setDatetime(dateNow.getDate() + '/' + dateNow.getMonth() + '/' + dateNow.getFullYear());
        getListHistory();
    }, [datetime]);

    useEffect(() => {
        const dateNow = new Date();
        setDatetime(dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + (dateNow.getDate()));
        //setDatetime(dateNow.getDate() + '/' + dateNow.getMonth() + '/' + dateNow.getFullYear());
        getListHistory();
    }, []);

    useState(() => {
        //console.log("change");
    }, [historyNode]);

    const showCalendar = () => {
        setShowModal(true);
    }; 

    const onDateChange = function(date) {
        setSelectDatetime(date);
    };

    const selectDate = async () => {
        const selectDate = selectDatetime.toString().split(" ");
        setDatetime(selectDate[3] + "-" + months[selectDate[1]] + '-' + selectDate[2]);
        setShowModal(false);
    };

    const getListHistory = async () => {
        const requestData = {
            id: global.currentUser.id,
            accessToken: global.currentUser.accessToken,
            datetime: datetime
        }
        setLoading(true);
        await axios.post(`http://192.168.0.102:5000/qrs/list_qrs_place`, requestData)
        .then(res => {
            if (res.data.code === '40a') {
                setHistoryNode([]);
                setHistoryMark([]);
                //console.log(res.data.message);
            }
            else if (res.data.code === '20') {
                let historyRes = [];
                let historyPoint = [];
                let count = 0;
                res.data.data.forEach((ele) => {
                    historyRes.push(<HistoryNode key={count} placeName={ele.name} dateScan={ele.dateScan} timeScan={ele.timeScan} QR={ele.QR} location={ele.location} address={ele.address} />);
                    //console.log('length: ', historyRes.length);
                    historyPoint.push(<Marker key={count} coordinate={{latitude: parseFloat(ele.location.latitude), longitude: parseFloat(ele.location.longitude)}} draggable={true}/>);
                    count = count + 1;
                }); 
                setLoading(false);
                setHistoryNode(historyRes);
                setHistoryMark(historyPoint);
            } else {
                setLoading(false);
                Alert.alert(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
        });
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header name="Your history"/>
            </View>
            <View style={styles.body}>
                <View style={styles.map}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 21.028511,
                            longitude: 105.804817,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        {historyMark}
                    </MapView>
                </View>
                <View style={styles.info}>
                    <View style={styles.info_header}>
                        <View style={styles.dateContainer}>
                            <TouchableOpacity style={styles.dateButton}
                                onPress={showCalendar}>
                                <Text style={styles.datetime}>{ datetime }</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.move_button}>
                            <View style={styles.move_action}>
                                <TouchableOpacity>
                                    <FontAwesome name="angle-up" color="#000000" size={30}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.move_action}>
                                <TouchableOpacity>
                                    <FontAwesome name="angle-down" color="#000000" size={30}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    { loading ? <ModalLoading /> : 
                    <ScrollView style={styles.info_body}>
                        {historyNode}
                    </ScrollView>
                    }
                </View>
            </View>
            <Modal visible={showModal} transparent>
                <View style={styles.modal_container}>
                    <View style={styles.modal_calender_container}>
                        <View style={styles.modal_calender}>
                            <CalendarPicker onDateChange={onDateChange}
                                textStyle={{ color: style_default.PRIMARY_COLOR, fontWeight: 'bold' }}
                                previousTitle="Pre"
                            />
                            <View style={styles.select_button}>
                                <TouchableOpacity
                                    onPress={selectDate}>
                                    <Text style={styles.selectText}>Select</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    body: {
        backgroundColor: '#1212ab',
        width: '100%',
        height: '93%'
    },
    map: {
        backgroundColor: "#abcdab",
        width: '100%',
        height: '100%'
    },
    info: {
        backgroundColor: style_default.THEME_COLOR,
        width: '100%',
        height: '50%',
        marginTop: -300,
    },
    info_header: {
        backgroundColor: style_default.THEME_COLOR,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    info_body: {
        backgroundColor: style_default.WHITE_COLOR,
    },
    dateContainer: {
        width: '40%',
        height: '70%',
    },
    dateButton: {
        backgroundColor: '#0bd66d',
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    datetime: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 5
    },
    move_button: {
        width: '20%',
        height: '70%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    move_action: {
        backgroundColor: '#0bd66d',
        borderRadius: 10,
        height: '100%',
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal_container: {
        backgroundColor: style_default.PRIMARY_COLOR,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7
    },
    modal_calender_container: {
        backgroundColor: style_default.WHITE_COLOR,
        width: '95%',
        height: '55%',
        borderRadius: 15,
    },
    modal_calender: {
        backgroundColor: style_default.WHITE_COLOR,
        width: '100%',
        height: '100%',
        opacity: 1,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'space-around'
    },
    calender_picker: {
        color: style_default.PRIMARY_COLOR,
        fontWeight: 'bold',
        opacity: 1,
    },
    select_button: {
        backgroundColor: style_default.THEME_COLOR,
        opacity: 1,
        width: '30%',
        height: 40,
        borderRadius: 10,
        marginLeft: 240,
    },
    selectText: {
        textAlign: 'center',
        color: style_default.WHITE_COLOR,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 6
    }
})

export default HistoryScreen;