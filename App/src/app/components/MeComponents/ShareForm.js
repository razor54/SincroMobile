/* eslint-disable max-len,no-undef */

import React, { Component } from 'react';

import {
  KeyboardAvoidingView,
  Button, Alert,
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

    this.state = {
      plate: data.plate,
      ownerId: data.ownerId,
      borrowId: 0,
    };
  }

  borrow() {
    const url = `${networkSettings.homepage}/delegate}`;
    const data = {
      body: {
        plate: this.state.plate,
        owner_id: this.state.ownerId,
        other_user_id: this.state.borrowId,
      },
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    };

    fetch(url, data)
      .then(res => (res.ok ?
        this.props.navigation.pop('Share') :
        this.showErrorMessage('InvalidUser')))
      .catch(error => this.showErrorMessage(error.message));
  }

  showErrorMessage(message) {
    Alert.alert(
      'Error',
      message,
      [
        { text: 'Try Again', onPress: () => {} },
        { text: 'Cancel', onPress: () => this.props.navigation.pop('Share') },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <FormLabel>Sharing User NIF</FormLabel>
        <FormInput
          onChangeText={borrowId => this.setState({ borrowId })}
          inputStyle={styles.inputStyle}
        />
        <Button onPress={this.borrow} title="Share Vehicle" />

      </KeyboardAvoidingView>

    );
  }
}
