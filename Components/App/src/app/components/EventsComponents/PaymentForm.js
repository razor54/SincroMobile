/* eslint-disable no-undef */
import React, { Component } from 'react';

import {
  Text,
  KeyboardAvoidingView,
  Button, AsyncStorage,
} from 'react-native';
import styles from '../../config/styles';
import { payEvent } from '../../service/eventService';
import languages from '../../config/languages';

type Props = {
    navigation:{
        state:{
            params:{
                data:any
            }
        },
        navigate: any,
        pop:any
    }
};

export default class extends Component<Props> {
  constructor(props) {
    super(props);
    this.pay = this.pay.bind(this);

    const { data } = this.props.navigation.state.params;


    this.state = {
      plate: data.plate,
      location: data.location,
      date: data.date,
      price: 0,
      id: data.id,
    };
  }


  pay() {
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        payEvent(token, this.state)
          .then((res) => {
            if (res.status === 401) throw Error('Invalid token');
            return res.json();
          })
          .then(() => {
            this.props.navigation.pop(2);
          })
          .catch(this.logout);
      }
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}> {this.state.plate} </Text>
        <Text style={styles.textStretch}> {languages().eventOccurred} {this.state.date.split('T')[0]} </Text>
        <Text style={styles.textStretch}> {languages().hours} - {this.state.date.split('T')[1].split('.')[0]} </Text>
        <Text style={styles.textStretch}> {languages().location} - {this.state.location} </Text>
        <Text style={styles.textStretch}> {languages().price} - {this.state.price} € </Text>

        <Button onPress={this.pay} title={languages().confirmPayment} />

      </KeyboardAvoidingView>

    );
  }
}
