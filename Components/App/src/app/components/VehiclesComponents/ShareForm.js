/* eslint-disable max-len,no-undef */

import React, { Component } from 'react';

import {
  KeyboardAvoidingView,
  Button, Alert, AsyncStorage, Text,
} from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';
import styles from '../../config/styles';
import { delegateVehicle } from '../../service/vehicleService';
import languages from '../../config/languages';


type Props = {
    navigation:{
        state:{
            params: {
                data: any,
                callback: any,
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

    this.callback = this.props.navigation.state.params.callback;

    this.state = {
      plate: data.plate,
      ownerId: data.ownerId,
      borrowId: null,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('language').then(l => this.setState({ lang: l }));
  }

  borrow() {
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        delegateVehicle(token, this.state)
          .then((res) => {
            if (res.ok) {
              this.callback('Pending');
              this.props.navigation.pop(1, 'Share');
            } else {
              this.callback('False');
              this.showErrorMessage('Not Valid User');
            }
          });
      }
    });
  }

  showErrorMessage(error) {
    Alert.alert(
      languages(this.state.lang).error,
      error,
      [
        { text: languages(this.state.lang).tryAgain, onPress: () => {} },
        { text: languages(this.state.lang).cancel, onPress: () => this.props.navigation.pop(1, 'Share') },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.textStretch}> {languages(this.state.lang).yourId} - {this.state.ownerId} </Text>
        <Text style={styles.textStretch}> {languages(this.state.lang).vehiclePlate} - {this.state.plate} </Text>
        <FormLabel>{languages(this.state.lang).sharingUserIdentification}</FormLabel>
        <FormInput
          onChangeText={borrowId => this.setState({ borrowId })}
          value={this.state.borrowId}
          inputStyle={styles.inputStyle}
        />
        <Button onPress={this.borrow} title={languages(this.state.lang).shareVehicle} />
        <Text style={styles.textStretch}>{languages(this.state.lang).acceptProcessTerms}</Text>
      </KeyboardAvoidingView>

    );
  }
}
