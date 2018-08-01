import React from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import styles from '../../config/styles';


export default function () {
  return (
    <KeyboardAvoidingView >
      <Text style={styles.textStretch}> You have no vehicles! </Text>
    </KeyboardAvoidingView>
  );
}
