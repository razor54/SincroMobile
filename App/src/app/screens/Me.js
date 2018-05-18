/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import { View } from 'react-native';

import { StackNavigator } from 'react-navigation';
import theme_styles from '../config/styles';
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
      user: this.props.screenProps.user,
    };
  }


  componentDidMount() {}


  render() {
    return (
      <View behavior="padding" style={theme_styles.wrapper}>
        <UserInfo user={this.state.user} />
        <VehiclesList user={this.state.user} />
        <RegisterVehicleForm user={this.state.user} />
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

