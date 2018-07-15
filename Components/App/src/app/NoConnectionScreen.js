/* eslint-disable react/prop-types,react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './config/styles';


const buttonIcon = {
  name: 'ios-rainy',
  type: 'ionicon',
  color: 'black',
  size: 50,
};

type Props = {}
export default class extends Component<Props> {
  constructor(props) {
    super(props);
    this.reloadHome = this.reloadHome.bind(this);

    this.state = {
    };
  }

  reloadHome() {
    this.props.navigation.navigate('Loading');
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <View style={styles.container}>
          <Button
            transparent
            icon={buttonIcon}
            onPress={this.reloadHome}
          />
          <Text style={styles.textCenter}>
                No Internet Connection
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
