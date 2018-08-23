/* eslint-disable max-len */

import React, { Component } from 'react';

import {
  Text,
  KeyboardAvoidingView,
  Button, AsyncStorage, Alert,
} from 'react-native';
import styles from '../../config/styles';
import { delegateResponse } from '../../service/vehicleService';
import languages from '../../config/languages';


type Props = {
  navigation:{
    state:{
      params:{
        data:any
      }
    },
    navigate: any,
    pop: any,
  }
};
export default class extends Component<Props> {
  constructor(props) {
    super(props);
    this.acceptVehicle = this.acceptVehicle.bind(this);
    this.denyVehicle = this.denyVehicle.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);


    const { data } = this.props.navigation.state.params;
    this.state = {
      plate: data.plate,
      request: data,
    };
  }


  handleConfirmation(accept) {
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        delegateResponse(token, accept, this.state)
          .then((res) => {
            if (res.ok) this.props.navigation.pop(2);
            else this.showErrorMessage(languages().notValidUser);
          });
      }
    });
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

  acceptVehicle() {
    this.handleConfirmation(true);
  }

  denyVehicle() {
    this.handleConfirmation(false);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}> {this.state.plate} </Text>
        <Text style={styles.textStretch}> {languages().ownerIdentification} - {this.state.request.ownerId} </Text>

        <Button onPress={this.acceptVehicle} title={languages().accept} />

        <Button onPress={this.denyVehicle} title={languages().deny} />
      </KeyboardAvoidingView>

    );
  }
}
