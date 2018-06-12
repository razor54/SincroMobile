/* eslint-disable max-len */

import React, { Component } from 'react';

import {
  Text,
  KeyboardAvoidingView,
  Button, View, AsyncStorage,
} from 'react-native';
import styles from '../../../config/styles';
import networkSettings from '../../../config/serverConnectionSettings';


type Props = {
    navigation:{
        state:{
            params:{
                data:any
            }
        },
        navigate: any,
        pop: any,
    }
};
export default class extends Component<Props> {
  constructor(props) {
    super(props);
    this.checkBorrow = this.checkBorrow.bind(this);
    this.checkSubscription = this.checkSubscription.bind(this);
    this.borrow = this.borrow.bind(this);
    this.removeVehicle = this.removeVehicle.bind(this);

    const { data } = this.props.navigation.state.params;

    this.state = {
      plate: data.plate,
      subscribed: data.subscribed,
      ownerId: data.ownerId,
      date: data.registryDate,
      delegateState: data.delegateState,
    };
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

      case 'False': return (
        <View>
          <Text style={styles.textStretch}> This vehicle is not borrowed </Text>
          <Button onPress={this.borrow} title="Share Vehicle" />
        </View>
      );
      default: return null;
    }
  };

  removeVehicle() {
    // todo remove from vehicles
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        const data = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        };

        fetch(`${networkSettings.homepage}/vehicles/${this.state.plate}/unsubscribe`, data)
          .then(() => this.props.navigation.pop(2))
          .catch(e => alert(e));
      }
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}> {this.state.plate} </Text>
        <Text style={styles.textStretch}> Owner Identification - {this.state.ownerId} </Text>
        <Text style={styles.textStretch}> This vehicle was registered on {this.state.date.split('T')[0]} </Text>
        {this.checkSubscription()}
        {this.checkBorrow()}
        <Button onPress={this.removeVehicle} title="Remove Vehicle" />

      </KeyboardAvoidingView>


    );
  }
}
