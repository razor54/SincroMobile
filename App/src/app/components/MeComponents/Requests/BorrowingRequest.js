/* eslint-disable max-len */

import React, { Component } from 'react';

import {
  Text,
  KeyboardAvoidingView,
  Button, View, AsyncStorage,
} from 'react-native';
import styles from '../../../config/styles';
import networkSettings from '../../../config/serverConnectionSettings';


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
        const url = `${networkSettings.homepage}/vehicles/delegate/response`;
        const data = {
          body: JSON.stringify({
            plate: this.state.plate,
            userBorrowId: this.state.request.userBorrowId,
            accept,
            requestId: this.state.request.id,

          }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        };

        fetch(url, data)
          .then((res) => {
            if (res.ok) this.props.navigation.pop(2);
            else this.showErrorMessage('Not Valid User');
          });
      } else {
        // redirect to login screen
      }
    });
  }

  acceptVehicle() {
    // todo remove from delegated_vehicles & change vehicle state
    this.handleConfirmation(true);
  }

  denyVehicle() {
    this.handleConfirmation(false);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}> {this.state.plate} </Text>
        <Text style={styles.textStretch}> Owner Identification - {this.state.request.ownerId} </Text>

        <Button onPress={this.acceptVehicle} title="Accept" />

        <Button onPress={this.denyVehicle} title="Deny" />
      </KeyboardAvoidingView>

    );
  }
}
