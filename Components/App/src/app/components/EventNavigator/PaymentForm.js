/* eslint-disable no-undef */
import React, { Component } from 'react';

import {
  Text,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
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
    this.payEvent = this.payEvent.bind(this);

    const { data } = this.props.navigation.state.params;


    this.state = {
      plate: data.plate,
      location: data.location,
      date: data.date,
      price: 0,
    };
  }

  payEvent() {
    // todo request to pay here
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}> {this.state.plate} </Text>
        <Text style={styles.textStretch}> This event occurred on {this.state.date.split('T')[0]} </Text>
        <Text style={styles.textStretch}> Hours - {this.state.date.split('T')[1].split('.')[0]} </Text>
        <Text style={styles.textStretch}> Location - {this.state.location} </Text>
        <Text style={styles.textStretch}> Price - {this.state.price} € </Text>

        <Button onPress={this.payEvent} title="Confirm Payment" />

      </KeyboardAvoidingView>

    );
  }
}
