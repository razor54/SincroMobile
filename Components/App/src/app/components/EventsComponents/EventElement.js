/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Button, Alert, AsyncStorage, View, ActivityIndicator,
} from 'react-native';
import { showLocation } from 'react-native-map-link';
import styles from '../../config/styles';
import { responseConfirmEvent } from '../../service/eventService';
import languages from '../../config/languages';
import { getUser } from '../../service/userService';


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
    this.loadUser = this.loadUser.bind(this);


    this.state = {
      user: {},
      refreshing: true,
      userId: data.driverId,
      plate: data.plate,
      location: data.location,
      date: data.date,
      longitude: data.gpsLongitude,
      latitude: data.gpsLatitude,
      verified: data.verified,
      paid: data.state,
      id: data.id,
    };
  }

  componentDidMount() {
    this.loadUser();
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
      languages().confirmation,
      languages().areSure,
      [
        { text: languages().yes, onPress: () => { this.confirmEvent(); } },
        { text: languages().no, onPress: () => {} },
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
          .catch(() => alert(languages().noPossibleToUpdateEvent));
      }
    });
  }

  checkVerified() {
    if (this.state.paid === 'Paid') {
      return (
        <Text
          style={styles.textStretch}
        >
          {languages().paidEvent}
        </Text>);
    }

    if (this.state.user.id !== this.state.userId) {
      return (
        <Text
          style={styles.textStretch}
        >
          {languages().driverEventBelongs} {this.state.userId}
        </Text>);
    }

    if (!this.state.verified) {
      return (
        <Button
          style={styles.textStretch}
          onPress={this.confirmation}
          title={languages().confirmItWasYou}
        />
      );
    }


    return (
      <View>
        <Text style={styles.textStretch}> {languages().eventVerified} </Text>
        <Button onPress={this.getPayment} title={languages().payEvent} />
      </View>);
  }

  loadUser() {
    AsyncStorage.getItem('token').then((token) => {
      if (token == null) { throw Error('No token'); }
      return JSON.parse(token);
    }).then((token) => {
      getUser(token)
        .then((res) => { if (!res.ok) throw Error('Invalid token'); return res.json(); })
        .then((user) => {
          if (!user.id) throw Error('Invalid User');
          this.setState({ user, refreshing: false });
        });
    });
  }

  render() {
    return (
      !this.state.refreshing ? (

        <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
          <Text style={styles.header}> {this.state.plate} </Text>
          <Text style={styles.textStretch}> {languages().eventOccurred} {this.state.date.split('T')[0]} </Text>
          <Text style={styles.textStretch}> {languages().hours} - {this.state.date.split('T')[1].split('.')[0]} </Text>
          <Text style={styles.textStretch}> {languages().location} - {this.state.location} </Text>
          {this.checkVerified()}
          <Button onPress={this.getMap} title={languages().showMap} />


        </KeyboardAvoidingView>
      ) :
        (
          <View style={styles.container}>
            <ActivityIndicator size="large" />
          </View>
        )

    );
  }
}
