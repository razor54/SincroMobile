/* eslint-disable max-len */

import React, { Component } from 'react';

import {
  Text,
  KeyboardAvoidingView,
  Button, View,
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
      delegateState: data.delegateState,
    };
  }

  componentDidMount() {
    // console.warn(this.props.navigation.state.params.data);
  }

  borrow() {
    this.props.navigation.navigate('Share', { data: { plate: this.state.plate, ownerId: this.state.ownerId } });
  }

  checkSubscription = () => {
    if (this.state.subscribed) {
      return <Text style={styles.textStretch}> This vehicle is subscribed </Text>;
    }
    return <Text style={styles.textStretch}> This vehicle is not subscribed </Text>;
  };

  checkBorrow = () => {
    switch (this.state.delegateState) {
      case 'True': return <Text style={styles.textStretch}> This vehicle is borrowed </Text>;

      case 'Pending': return <Text style={styles.textStretch}> This vehicle waiting for borrow confirmation</Text>;

      default: return (
        <View>
          <Text style={styles.textStretch}> This vehicle is not borrowed </Text>;
          <Button onPress={this.borrow} title="Share Vehicle" />
        </View>
      );
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}> {this.state.plate} </Text>
        <Text style={styles.textStretch}> Owner Identification - {this.state.ownerId} </Text>
        <Text style={styles.textStretch}> This vehicle was registered on {this.state.date.split('T')[0]} </Text>
        {this.checkSubscription()}
        {this.checkBorrow()}
      </KeyboardAvoidingView>

    );
  }
}
