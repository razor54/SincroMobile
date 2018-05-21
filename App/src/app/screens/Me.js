/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import { Text, View } from 'react-native';

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

    this.getCallback = this.getCallback.bind(this);
    this.registerCallback = this.registerCallback.bind(this);

    this.state = {
      user: props.screenProps.user,
      refreshList: null,
    };
  }


  componentDidMount() {}

  getCallback(refreshList) {
    this.setState({ refreshList });
  }

  registerCallback() {
    this.state.refreshList();
  }

  render() {
    return (
      <View style={{ justifyContent: 'flex-end' }}>
        <UserInfo user={this.state.user} />
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Text style={styles.header_left}> Your Vehicles </Text>
          <RegisterVehicleForm user={this.state.user} callback={this.registerCallback} />
        </View>
        <VehiclesList user={this.state.user} getCallback={this.getCallback} />
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

