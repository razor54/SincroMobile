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
          <Text style={styles.textCenter}>
                        Developed by
          </Text>
          <Text style={styles.textCenter}>
                        Nuno Conceicao
          </Text>
          <Text style={styles.textCenter}>
                        &
          </Text>
          <Text style={styles.textCenter}>
                        Andre Gaudencio
          </Text>

        </View>


      </KeyboardAvoidingView>

    );
  }
}
