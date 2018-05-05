/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';

import { Avatar } from 'react-native-elements';
import styles from '../config/styles';

type Props = {};
export default class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>

        <View style={styles.container}>
          <Avatar
            source={require('../../../public/image/user-1808597_1280.png')}
            large
            rounded
            title="MT"
              // eslint-disable-next-line no-undef,no-alert
            onPress={() => alert('Works!')}
            activeOpacity={0.7}
          />
          <Text style={styles.textCenter}>
                        User
          </Text>


        </View>

      </KeyboardAvoidingView>
    );
  }
}

