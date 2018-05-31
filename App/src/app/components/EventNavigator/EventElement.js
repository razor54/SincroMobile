/* eslint-disable no-undef */
import React, { Component } from 'react';

import {
  Text,
  KeyboardAvoidingView,
  Button, Alert, View, AsyncStorage,
} from 'react-native';
import { showLocation } from 'react-native-map-link';
import styles from '../../config/styles';
import settings from '../../config/serverConnectionSettings';


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


    this.state = {
      plate: data.plate,
      location: data.location,
      date: data.date,
      longitude: data.gps_longitude,
      latitude: data.gps_latitude,
      verified: data.verified,
    };
  }

  getMap() {
    showLocation({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    });
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
        const data = {
          body: JSON.stringify(this.event),
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `${token.token_type} ${token.access_token}` },
        };

        const path = `${settings.homepage}/event`;

        fetch(path, data)
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

    return <Text style={styles.textStretch}> This event is verified </Text>;
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

  componentDidMount() {
    // console.warn(this.props.navigation.state.params.data);
  }
}
