/* eslint-disable no-undef */
import React, { Component } from 'react';

import {
  Text,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import styles from '../../config/styles';
import { payEvent } from '../../service/eventService';

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
    this.pay = this.pay.bind(this);

    const { data } = this.props.navigation.state.params;


    this.state = {
      plate: data.plate,
      location: data.location,
      date: data.date,
      price: 0,
    };
  }

  pay() {
    // todo
    payEvent();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}> {this.state.plate} </Text>
        <Text style={styles.textStretch}> This event occurred on {this.state.date.split('T')[0]} </Text>
        <Text style={styles.textStretch}> Hours - {this.state.date.split('T')[1].split('.')[0]} </Text>
        <Text style={styles.textStretch}> Location - {this.state.location} </Text>
        <Text style={styles.textStretch}> Price - {this.state.price} € </Text>

        <Button onPress={this.pay} title="Confirm Payment" />

      </KeyboardAvoidingView>

    );
  }
}
