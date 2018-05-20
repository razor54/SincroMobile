/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import {Text, View} from 'react-native';

import { StackNavigator } from 'react-navigation';
import styles from '../config/styles';
import navigationHeaderStyle from '../config/NavigationOptionsThemed';
import VehiclesList from '../components/MeComponents/VehiclesList';
import RegisterVehicleForm from '../components/MeComponents/RegisterVehicleForm';
import UserInfo from '../components/MeComponents/UserInfo';


type Props = {
    screenProps: {
        user: {
            id: number,
            email: String,
            name: String,
        }
    }
};

class Profile extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      user: props.screenProps.user,
    };
  }


  componentDidMount() {}

  render() {
    return (
      <View>
        <UserInfo user={this.state.user} />
        <Text style={styles.header_left}> Your Vehicles </Text>
        <VehiclesList user={this.state.user} />
        <RegisterVehicleForm user={this.state.user} />
      </View>
    );
  }
}

export default StackNavigator({
  List: {
    screen: Profile,

    navigationOptions: navigationHeaderStyle('Profile'),
  },

});

