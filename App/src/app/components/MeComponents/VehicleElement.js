/* eslint-disable max-len */

import React, { Component } from 'react';

import {
  Text,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import styles from '../../config/styles';


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
    this.checkBorrow = this.checkBorrow.bind(this);
    this.checkSubscription = this.checkSubscription.bind(this);
    this.borrow = this.borrow.bind(this);

    const { data } = this.props.navigation.state.params;

    this.state = {
      plate: data.plate,
      subscribed: data.subscribed,
      ownerId: data.ownerId,
      date: data.registryDate,
      borrowId: data.borrowId,
      borrowed: data.borrowed,
    };
  }

  componentDidMount() {
    // console.warn(this.props.navigation.state.params.data);
  }

  borrow() {
    this.props.navigation.navigate('Share', { plate: this.state.plate, ownerId: this.state.ownerId });
  }

  checkSubscription = () => {
    if (this.state.subscribed) {
      return <Text style={styles.textStretch}> This vehicle is subscribed </Text>;
    }
    return <Text style={styles.textStretch}> This vehicle is not subscribed </Text>;
  };

  checkBorrow = () => {
    if (this.state.borrowed) {
      return <Text style={styles.textStretch}> This vehicle is borrowed to following identity - {this.state.borrowId} </Text>;
    }
    return <Text style={styles.textStretch}> This vehicle is not borrowed </Text>;
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}> {this.state.plate} </Text>
        <Text style={styles.textStretch}> Owner Identification - {this.state.ownerId} </Text>
        <Text style={styles.textStretch}> This vehicle was registered on {this.state.date.split('T')[0]} </Text>
        {this.checkSubscription()}
        {this.checkBorrow()}
        <Button onPress={this.borrow} title="Share Vehicle" />

      </KeyboardAvoidingView>

    );
  }
}
