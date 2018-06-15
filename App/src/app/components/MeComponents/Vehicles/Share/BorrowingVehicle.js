/* eslint-disable max-len */

import React, { Component } from 'react';

import {
  Text,
  KeyboardAvoidingView,
  Button, View, AsyncStorage,
} from 'react-native';
import styles from '../../../../config/styles';
import networkSettings from '../../../../config/serverConnectionSettings';


type Props = {
    navigation:{
        state:{
            params:{
                data:any,
                callback: any,
            }
        },
        navigate: any
    }
};
export default class extends Component<Props> {
  constructor(props) {
    super(props);
    this.removeVehicle = this.removeVehicle.bind(this);

    const { data } = this.props.navigation.state.params;

    this.state = {
      plate: data.plate,
      vehicle: {
        plate: '',
        registryDate: '',
        ownerId: '',
      },
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        const url = `${networkSettings.homepage}/vehicles/${this.state.plate}/info/`;
        const data = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        };

        fetch(url, data)
          .then(res => res.json())
          .then(vehicle => this.setState({ vehicle }))
          .catch(e => alert(e));
      }
    });
  }

  removeVehicle() {
    // todo remove from delegated_vehicles & change vehicle state
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}> {this.state.plate} </Text>
        <Text style={styles.textStretch}> Owner Identification - {this.state.vehicle.ownerId} </Text>
        <Text style={styles.textStretch}> This vehicle was registered on {this.state.vehicle.registryDate.split('T')[0]} </Text>
        <Button onPress={this.removeVehicle} title="Remove Vehicle" />
      </KeyboardAvoidingView>

    );
  }
}
