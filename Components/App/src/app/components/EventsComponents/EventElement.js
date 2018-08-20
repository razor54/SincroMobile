/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Button, Alert, AsyncStorage, View,
} from 'react-native';
import { showLocation } from 'react-native-map-link';
import styles from '../../config/styles';
import { responseConfirmEvent } from '../../service/eventService';


type Props = {
    navigation:{
        state:{
            params:{
                data:any
            }
        },
        navigate: any
    }
};

export default class extends Component<Props> {
  constructor(props) {
    super(props);
    this.getMap = this.getMap.bind(this);
    this.confirmation = this.confirmation.bind(this);


    const { data } = this.props.navigation.state.params;
    this.event = data;

    this.confirmation = this.confirmation.bind(this);
    this.confirmEvent = this.confirmEvent.bind(this);
    this.checkVerified = this.checkVerified.bind(this);
    this.getPayment = this.getPayment.bind(this);


    this.state = {
      plate: data.plate,
      location: data.location,
      date: data.date,
      longitude: data.gpsLongitude,
      latitude: data.gpsLatitude,
      verified: data.verified,
    };
  }

  getMap() {
    showLocation({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    });
  }

  getPayment() {
    this.props.navigation.navigate('Payment', { data: this.state });
  }

  confirmation() {
    Alert.alert(
      'Confirmation',
      'Are you sure?',
      [
        { text: 'Yes', onPress: () => { this.confirmEvent(); } },
        { text: 'No', onPress: () => {} },
      ],
      { cancelable: false },
    );
  }

  confirmEvent() {
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        this.event.verified = true;
        responseConfirmEvent(token, this.event)
          .then(res => (res.ok ? this.setState({ verified: true }) : alert(res.status)))
          .catch(() => alert('No Possible to Update Event'));
      }
    });
  }

  checkVerified() {
    if (!this.state.verified) {
      return (
        <Button style={styles.textStretch} onPress={this.confirmation} title="Confirm that it was you?" />
      );
    }

    return (
      <View>
        <Text style={styles.textStretch}> This event is verified </Text>
        <Button onPress={this.getPayment} title="Pay Event" />
      </View>);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}> {this.state.plate} </Text>
        <Text style={styles.textStretch}> This event occurred on {this.state.date.split('T')[0]} </Text>
        <Text style={styles.textStretch}> Hours - {this.state.date.split('T')[1].split('.')[0]} </Text>
        <Text style={styles.textStretch}> Location - {this.state.location} </Text>
        {this.checkVerified()}
        <Button onPress={this.getMap} title="Show Map Location" />


      </KeyboardAvoidingView>

    );
  }
}