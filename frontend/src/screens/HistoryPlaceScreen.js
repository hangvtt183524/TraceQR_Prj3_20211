import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    Alert
} from 'react-native';
import style_default from '../shared/const';
import CalendarPicker from 'react-native-calendar-picker';
import HistoryPlaceNode from '../components/HistoryPlaceNode';
import ModalLoading from "../components/ModalLoading";

import axios from 'axios';

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

const HistoryPlaceScreen = () => {
    const dateNow = new Date();
    const [countCustomer, setCountCustomer] = useState(0);
    const [datetime, setDatetime] = useState(dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + (dateNow.getDate()));
    const [selectDatetime, setSelectDatetime] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [historyNode, setHistoryNode] = useState(null);
    const [loading, setLoading] = useState(false);

    const showCalendar = () => {
        setShowModal(true);
    };

    const selectDate = async () => {
        const selectDate = selectDatetime.toString().split(" ");
        setDatetime(selectDate[3] + "-" + months[selectDate[1]] + '-' + selectDate[2]);
        setShowModal(false);
    };

    const onDateChange = function(date) {
        setSelectDatetime(date);
    };
    
    const getListHistory = async () => {
        const requestData = {
            id: global.currentUser.id,
            accessToken: global.currentUser.accessToken,
            datetime: datetime
        }

        setLoading(true);
        await axios.post(`http://192.168.1.7:5000/qrs/list_qrs_user`, requestData)
        .then(res => {
            if (res.data.code === '40a') {
                setHistoryNode([]);
            } else if (res.data.code === '20') {
                let historyRes = [];
                let count = 0;

                res.data.data.forEach(ele => {
                    historyRes.push(<HistoryPlaceNode key={count} datetime={ele.timeScan} />);
                    count = count + 1;
                });
                setHistoryNode(historyRes);
                setCountCustomer(count);
                setLoading(false);
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

    useEffect(() => {
        const dateNow = new Date();
        setDatetime(dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + (dateNow.getDate()));
        ///getListHistory();
        getListHistory();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.function}>
                    <View style={styles.dateContainer}>
                        <TouchableOpacity style={styles.dateButton}
                            onPress={showCalendar}>
                            <Text style={styles.datetime}>{ datetime }</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.text_function}>Customer Scanner List: {countCustomer}</Text>
                </View>
                { loading ? <ModalLoading /> :
                <ScrollView style={styles.info_body}>
                    {historyNode}
                </ScrollView>}
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
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    body: {
        width: '100%',
        height: '100%'
    },
    function: {
        height: 40,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10
    },
    text_function: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
    },
    dateContainer: {

    },
    dateButton: {
        backgroundColor: '#0bd66d',
        width: '40%',
        height: '100%',
        borderRadius: 8,
    },
    datetime: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 8
    },
    modal_container: {
        backgroundColor: style_default.PRIMARY_COLOR,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7
    },
    modal_calender: {
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
    },
    info_body: {
        marginTop: 40
    }
})

export default HistoryPlaceScreen;