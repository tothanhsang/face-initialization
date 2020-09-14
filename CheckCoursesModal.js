import React, { Component } from 'react'
import { View, Text, FlatList, Dimensions, TouchableHighlight, BackHandler, StyleSheet, Button, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import EmptyListItem from './EmptyListItem';
import Axios from 'axios';
import config from './config';

export default class CheckedListModal extends Component {
    constructor(props) {
        super(props);
        let data = props.data || [];
        this.state = {
            visible: true,
            data: data,
            checkedData: new Set()
        }
        Dimensions.addEventListener('change', () => { this.forceUpdate() });
    }

    trainData = () => {
        console.log("training data: ", [...this.state.checkedData])
        this.props.onClose()
        let url = config.baseUrlTraining + `/training_from`;
        Axios.post(url, {
            listStudent: [...this.state.checkedData],
          })
          .then(function (response) {
              
          })
          .catch(function (error) {
            console.log(error);
          });

      }

    render() {
        let { itemTitlePropName, itemOtherProp, titleOther, buttonTitle } = this.props;
        let { width, height } = Dimensions.get('window');
        return (
            <View style={styles.modal}>
                <View style={[{ width: width * 0.75, height: height * 0.75 }, styles.modalContent]}>
                    <Text
                        style={styles.close}
                        onPress={e => this.props.onClose()}>X</Text>
                    <FlatList
                        style={styles.list}
                        data={this.state.data}
                        ItemSeparatorComponent={() => { return (<View style={styles.separator} />) }}
                        ListEmptyComponent={() => <EmptyListItem label='Không có dữ liệu!' />}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.itemRow} key={item._id}>
                                    <CheckBox
                                        value={this.state.checkedData.has(item[itemTitlePropName])}
                                        onValueChange={(val) => {
                                            let old = this.state.checkedData;
                                            val ? old.add(item[itemTitlePropName]) : old.delete(item[itemTitlePropName]);
                                            this.setState({
                                                checkedData: old
                                            })
                                        }} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={styles.itemText}>MSSV: {item.studentID}</Text>
                                        <Text>Name: {item.names}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
       
                    <TouchableOpacity onPress={() => this.trainData()}>
                        <View
                            style={{
                                backgroundColor: '#2979ff',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 4,
                                padding: 10,
                                marginLeft: 60,
                                marginRight: 60,
                            }}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>
                                Training
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: 0, bottom: 0, right: 0, left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        borderRadius: 5,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        paddingBottom: 5,
    },
    close: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '300',
        textAlign: 'center',
        position: 'absolute',
        top: 0, right: 0,
        zIndex: 2000,
        height: 45, width: 45,
        borderRadius: 25,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    list: {
        width: '100%',
        minHeight: 200,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 4,
        borderRadius: 2,
    },
    itemText: {
        fontSize: 14,
        color: '#333',
    },
    button: {
        borderRadius: 4,
        backgroundColor: '#2979ff',
        padding: 14,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        textTransform: 'uppercase',
    },
    fixedBottom: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
    },
    separator: {
        width: '100%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
    }
})