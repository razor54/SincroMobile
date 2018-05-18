import React, { Component } from 'react';

import {
  Text,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import { showLocation } from 'react-native-map-link';
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
    this.getMap = this.getMap.bind(this);

    const { data } = this.props.navigation.state.params;

    this.state = {
      plate: data.plate,
      location: data.location,
      date: data.date,
      longitude: data.gps_longitude,
      latitude: data.gps_latitude,

    };
  }

  getMap() {
    showLocation({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}>Event Item</Text>
        <Text style={styles.textStretch}> {this.state.plate} </Text>
        <Text style={styles.textStretch}> Location - {this.state.location} </Text>
        <Text style={styles.textStretch}> This event occurred on {this.state.date.split('T')[0]} </Text>
        <Text style={styles.textStretch}> Hours - {this.state.date.split('T')[1].split('.')[0]} </Text>
        <Text style={styles.textStretch}> Confirm that it was you? </Text>
        <Button onPress={this.getMap} title="Show Map Location" />

      </KeyboardAvoidingView>

    );
  }

  componentDidMount() {
    // console.warn(this.props.navigation.state.params.data);
  }
}
