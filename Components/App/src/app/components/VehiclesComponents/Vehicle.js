/* eslint-disable max-len */
import React, { Component } from 'react';

import {
  Text,
  KeyboardAvoidingView,
  Button, AsyncStorage,
} from 'react-native';
import styles from '../../config/styles';
import { subscribeVehicle } from '../../service/vehicleService';
import languages from "../../config/languages";


type Props = {
    navigation:{
        state:{
            params:{
                data:any,
            }
        },
        navigate: any,
        pop: any,
    }
};
export default class extends Component<Props> {
  constructor(props) {
    super(props);

    this.checkSubscription = this.checkSubscription.bind(this);
    this.addVehicle = this.addVehicle.bind(this);

    const { data } = this.props.navigation.state.params;
    this.refresh = data.refresh;

    this.state = {
      plate: data.plate,
      subscribed: data.subscribed,
      ownerId: data.ownerId,
      date: data.registryDate,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('language').then(l => this.setState({ lang: l }));
  }

  checkSubscription = () => {
    if (this.state.subscribed) {
      return <Text style={styles.textStretch}> {languages(this.state.lang).alreadySubscribed} </Text>;
    }
    return <Button onPress={this.addVehicle} title={languages(this.state.lang).subscribe} />;
  };


  addVehicle() {
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        subscribeVehicle(token, this.state)
          .then((res) => {
            if (!res.ok) throw Error(res.statusText);
            else {
              this.props.navigation.pop(2);
            }
          })
          .catch(e => alert(e));
      }
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}> {this.state.plate} </Text>
        <Text style={styles.textStretch}> {languages(this.state.lang).ownerIdentification} - {this.state.ownerId} </Text>
        <Text style={styles.textStretch}> {languages(this.state.lang).vehicleRegistered} {this.state.date.split('T')[0]} </Text>
        {this.checkSubscription()}
      </KeyboardAvoidingView>


    );
  }
}
