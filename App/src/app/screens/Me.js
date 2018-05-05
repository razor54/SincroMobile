/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView, TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Avatar, Button } from 'react-native-elements';
import styles from '../config/styles';
import navigationHeaderStyle from '../config/NavigationOptionsThemed';


type Props = {};
class Profile extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View behavior="padding" style={styles.wrapper}>

        <View style={styles.containerRow}>
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
              User Name
          </Text>


          <Button
            title="Info"
            buttonStyle={styles.textBtn}
            color="rgba(78, 116, 289, 1)"
            onPress={() => alert('More info')}
          >
                Info
          </Button>


        </View>

      </View>
    );
  }
}

export default StackNavigator({

  List: {
    screen: Profile,

    navigationOptions: navigationHeaderStyle('User Profile'),
  },

});
