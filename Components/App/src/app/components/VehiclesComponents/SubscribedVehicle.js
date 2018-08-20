/* eslint-disable max-len */

import React, { Component } from 'react';

import {
  Text,
  KeyboardAvoidingView,
  Button, View, AsyncStorage,
} from 'react-native';
import styles from '../../config/styles';
import { cancelBorrowVehicle, unsubscribeVehicles, cancelBorrowRequest } from '../../service/vehicleService';


type Props = {
    navigation:{
        state:{
            params:{
                data:any,
                callback:any,
            }
        },
        navigate: any,
        pop: any,
    }
};
export default class extends Component<Props> {
  constructor(props) {
    super(props);
    this.checkBorrow = this.checkBorrow.bind(this);
    this.borrow = this.borrow.bind(this);
    this.removeVehicle = this.removeVehicle.bind(this);
    this.changeBorrow = this.changeBorrow.bind(this);
    this.cancelBorrow = this.cancelBorrow.bind(this);
    this.cancelRequest = this.cancelRequest.bind(this);

    this.callback = this.props.navigation.state.params.callback;

    const { data } = this.props.navigation.state.params;

    this.state = {
      plate: data.plate,
      ownerId: data.ownerId,
      date: data.registryDate,
      delegateState: data.delegateState,
    };
  }

  borrow() {
    this.props.navigation.navigate('Share', { data: { plate: this.state.plate, ownerId: this.state.ownerId }, callback: this.changeBorrow });
  }

  changeBorrow(value) {
    this.setState({ delegateState: value });
    this.callback();
  }

  checkBorrow = () => {
    switch (this.state.delegateState) {
      case 'True': return (
        <View>
          <Text style={styles.textStretch}> This vehicle is borrowed </Text>
          <Button onPress={this.cancelBorrow} title="Cancel Delegation" />
        </View>
      );

      case 'Pending': return (
        <View>
          <Text style={styles.textStretch}> This vehicle waiting for borrow confirmation</Text>
          <Button onPress={this.cancelRequest} title="Cancel Request" />
        </View>
      );

      case 'False': return (
        <View>
          <Text style={styles.textStretch}> This vehicle is not borrowed </Text>
          <Button onPress={this.borrow} title="Share Vehicle" />
        </View>
      );
      default: return null;
    }
  };

  removeVehicle() {
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        unsubscribeVehicles(token, this.state.plate)
          .then(() => {
            this.callback();
            this.props.navigation.pop(2);
          })
          .catch(e => alert(e));
      }
    });
  }

  cancelBorrow() {
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        cancelBorrowVehicle(token, this.state.plate)
          .then(() => this.props.navigation.pop(2))
          .catch(e => alert(e));
      }
    });
  }

  cancelRequest() {
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        cancelBorrowRequest(token, this.state.plate)
          .then(() => this.props.navigation.pop(2))
          .catch(e => alert(e));
      }
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}> {this.state.plate} </Text>
        <Text style={styles.textStretch}> Owner Identification - {this.state.ownerId} </Text>
        <Text style={styles.textStretch}> This vehicle was registered on {this.state.date.split('T')[0]} </Text>
        {this.checkBorrow()}
        <Button onPress={this.removeVehicle} title="Unsubscribe Vehicle" />
      </KeyboardAvoidingView>


    );
  }
}