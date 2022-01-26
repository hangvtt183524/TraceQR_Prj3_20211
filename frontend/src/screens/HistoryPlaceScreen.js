import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal
} from 'react-native';
import style_default from '../shared/const';
import CalendarPicker from 'react-native-calendar-picker';

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
    const [countCustomer, setCountCustomer] = useState(0);
    const [datetime, setDatetime] = useState(null);
    const [selectDatetime, setSelectDatetime] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    useEffect(() => {
        const dateNow = new Date();
        setDatetime(dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + (dateNow.getDate()));
        ///getListHistory();
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
                <ScrollView>

                </ScrollView>
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
    }
})

export default HistoryPlaceScreen;