/* eslint-disable max-len,no-undef */

import React, { Component } from 'react';

import {
  KeyboardAvoidingView,
  Button, Alert, AsyncStorage, Text,
} from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';
import styles from '../../config/styles';
import networkSettings from '../../config/serverConnectionSettings';


type Props = {
    navigation:{
        state:{
            params: {
                data: any,
            }
        },
        navigate: any,
        pop: any
    }

};

export default class extends Component<Props> {
  constructor(props) {
    super(props);

    const { data } = this.props.navigation.state.params;

    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.borrow = this.borrow.bind(this);

    this.state = {
      plate: data.plate,
      ownerId: data.ownerId,
      borrowId: null,
    };
  }

  borrow() {
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        const url = `${networkSettings.homepage}/vehicles/delegate/`;
        const data = {
          body: JSON.stringify({
            plate: this.state.plate,
            ownerId: this.state.ownerId,
            otherUserId: this.state.borrowId,
          }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        };

        fetch(url, data)
          .then((res) => {
            if (res.ok) this.props.navigation.pop(1, 'Share');
            else this.showErrorMessage('Not Valid User');
          });
      } else {
        // redirect to login screen
      }
    });
  }

  showErrorMessage(error) {
    Alert.alert(
      'Error',
      error,
      [
        { text: 'Try Again', onPress: () => {} },
        { text: 'Cancel', onPress: () => this.props.navigation.pop(1, 'Share') },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.textStretch}> Your Identification - {this.state.ownerId} </Text>
        <Text style={styles.textStretch}> Vehicle Plate - {this.state.plate} </Text>
        <FormLabel>Sharing user identification</FormLabel>
        <FormInput
          onChangeText={borrowId => this.setState({ borrowId })}
          value={this.state.borrowId}
          inputStyle={styles.inputStyle}
        />
        <Button onPress={this.borrow} title="Share Vehicle" />
        <Text style={styles.textStretch}>This process needs to be accepted by the pretended user, and can be canceled any time!</Text>
      </KeyboardAvoidingView>

    );
  }
}
