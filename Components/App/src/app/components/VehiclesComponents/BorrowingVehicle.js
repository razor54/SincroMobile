/* eslint-disable max-len */

import React, { Component } from 'react';

import {
  Text,
  KeyboardAvoidingView,
  Button, AsyncStorage,
} from 'react-native';
import styles from '../../config/styles';
import { getVehicle } from '../../service/vehicleService';
import languages from '../../config/languages';


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

    this.callback = this.props.navigation.state.params.callback;
    this.logout = this.logout.bind(this);


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
        getVehicle(token, this.state.plate)
          .then((res) => { if (res.status === 401) throw Error('Invalid token'); return res.json(); })
          .then(vehicle => this.setState({ vehicle }))
          .catch(this.logout);
      }
    });
  }

  logout() {
    AsyncStorage.removeItem('token').then(() => AsyncStorage.removeItem('user'))
      .then(() => this.props.navigation.navigate('Auth'));
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}> {this.state.plate} </Text>
        <Text style={styles.textStretch}> {languages().ownerIdentification} - {this.state.vehicle.ownerId} </Text>
        <Text style={styles.textStretch}> {languages().vehicleRegistered} {this.state.vehicle.registryDate.split('T')[0]} </Text>
      </KeyboardAvoidingView>

    );
  }
}
