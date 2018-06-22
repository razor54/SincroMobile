import React from 'react';

import { Avatar } from 'react-native-elements';
import {
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import styles from '../../config/styles';


export default function () {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>

      <View style={styles.container}>
        <Avatar
          source={require('../../../../public/image/sincro_logo_black.png')}
          xlarge
          title="Close"
          overlayContainerStyle={{ backgroundColor: 'transparent' }}
        />
        <Text style={styles.header}>
                        Mobile
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
