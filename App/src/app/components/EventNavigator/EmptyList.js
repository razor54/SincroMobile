import React from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import styles from '../../config/styles';


export default function () {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
      <Text style={styles.textStretch}> Congrats, you have no events! </Text>
    </KeyboardAvoidingView>
  );
}
