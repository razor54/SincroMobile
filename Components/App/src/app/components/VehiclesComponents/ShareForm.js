/* eslint-disable max-len,no-undef */

import React, { Component } from 'react';

import {
  KeyboardAvoidingView,
  Button, Alert, AsyncStorage, Text,
} from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';
import styles from '../../config/styles';
import { delegateVehicle } from '../../service/vehicleService';


type Props = {
    navigation:{
        state:{
            params: {
                data: any,
                callback: any,
            }
        },
        navigate: any,
        pop: any
    }

};

export default class extends Component<Props> {
  constructor(props) {
    super(props);

    const { data } = this.props.navigation.state.params;

    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.borrow = this.borrow.bind(this);

    this.callback = this.props.navigation.state.params.callback;

    this.state = {
      plate: data.plate,
      ownerId: data.ownerId,
      borrowId: null,
    };
  }

  borrow() {
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        delegateVehicle(token, this.state)
          .then((res) => {
            if (res.ok) {
              this.callback('Pending');
              this.props.navigation.pop(1, 'Share');
            } else {
              this.callback('False');
              this.showErrorMessage('Not Valid User');
            }
          });
      }
    });
  }

  showErrorMessage(error) {
    Alert.alert(
      'Error',
      error,
      [
        { text: 'Try Again', onPress: () => {} },
        { text: 'Cancel', onPress: () => this.props.navigation.pop(1, 'Share') },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.textStretch}> Your Identification - {this.state.ownerId} </Text>
        <Text style={styles.textStretch}> Vehicle Plate - {this.state.plate} </Text>
        <FormLabel>Sharing user identification</FormLabel>
        <FormInput
          onChangeText={borrowId => this.setState({ borrowId })}
          value={this.state.borrowId}
          inputStyle={styles.inputStyle}
        />
        <Button onPress={this.borrow} title="Share Vehicle" />
        <Text style={styles.textStretch}>This process needs to be accepted by the pretended user, and can be canceled any time!</Text>
      </KeyboardAvoidingView>

    );
  }
}
