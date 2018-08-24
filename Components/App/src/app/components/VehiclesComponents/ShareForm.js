/* eslint-disable max-len,no-undef */

import React, { Component } from 'react';

import {
  KeyboardAvoidingView,
  Button, Alert, AsyncStorage, Text,
} from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';
import styles from '../../config/styles';
import { delegateVehicle } from '../../service/vehicleService';
import languages from '../../config/languages';


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
    this.logout = this.logout.bind(this);

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
            if (res.status === 403) throw Error('invalid token');
            if (res.ok) {
              this.callback('Pending');
              this.props.navigation.pop(1, 'Share');
            } else {
              this.callback('False');
              this.showErrorMessage(languages().notValidUser);
            }
          }).catch(this.logout);
      }
    });
  }

  logout() {
    AsyncStorage.removeItem('token').then(() => this.props.navigation.navigate('Auth'));
  }

  showErrorMessage(error) {
    Alert.alert(
      languages().error,
      error,
      [
        { text: languages().tryAgain, onPress: () => {} },
        { text: languages().cancel, onPress: () => this.props.navigation.pop(1, 'Share') },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.textStretch}> {languages().yourId} - {this.state.ownerId} </Text>
        <Text style={styles.textStretch}> {languages().vehiclePlate} - {this.state.plate} </Text>
        <FormLabel>{languages().sharingUserIdentification}</FormLabel>
        <FormInput
          onChangeText={borrowId => this.setState({ borrowId })}
          value={this.state.borrowId}
          inputStyle={styles.inputStyle}
        />
        <Button onPress={this.borrow} title={languages().shareVehicle} />
        <Text style={styles.textStretch}>{languages().acceptProcessTerms}</Text>
      </KeyboardAvoidingView>

    );
  }
}
