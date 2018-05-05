import React, { Component } from 'react';
import {
  Text,
  KeyboardAvoidingView,

} from 'react-native';
import styles from '../../config/styles';

type Props = {};
export default class extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Text style={styles.header}>
                    Event Item
        </Text>
      </KeyboardAvoidingView>

    );
  }
}
