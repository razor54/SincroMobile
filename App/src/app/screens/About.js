import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import styles from '../config/styles';

type Props = {};
export default class extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>

        <View style={styles.container}>

          <Text style={styles.header}>
                        About
          </Text>
          <Text style={styles.header_left}>
                        Developed by
          </Text>
          <Text style={styles.textCenter}>
                        André Gaudêncio
          </Text>
          <Text style={styles.textCenter}>
                        &
          </Text>
          <Text style={styles.textCenter}>
                        Nuno Conceição
          </Text>

        </View>


      </KeyboardAvoidingView>

    );
  }
}
