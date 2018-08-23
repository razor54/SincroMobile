import React from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import styles from '../../config/styles';
import languages from "../../config/languages";


export default function () {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
      <Text style={styles.textStretch}> {languages().congratz} </Text>
    </KeyboardAvoidingView>
  );
}
