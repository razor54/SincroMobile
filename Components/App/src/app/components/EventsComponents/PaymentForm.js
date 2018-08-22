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

  componentDidMount() {
    AsyncStorage.getItem('language').then(l => this.setState({ lang: l }));
  }

  pay() {
    // todo
    payEvent();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}> {this.state.plate} </Text>
        <Text style={styles.textStretch}> {languages(this.state.lang).eventOccurred} {this.state.date.split('T')[0]} </Text>
        <Text style={styles.textStretch}> {languages(this.state.lang).hours} - {this.state.date.split('T')[1].split('.')[0]} </Text>
        <Text style={styles.textStretch}> {languages(this.state.lang).location} - {this.state.location} </Text>
        <Text style={styles.textStretch}> {languages(this.state.lang).price} - {this.state.price} € </Text>

        <Button onPress={this.pay} title={languages(this.state.lang).confirmPayment} />

      </KeyboardAvoidingView>

    );
  }
}
