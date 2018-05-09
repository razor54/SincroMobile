/* eslint-disable react/prop-types,react/prefer-stateless-function */
import React, { Component } from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Events from './screens/Events';
import Me from './screens/Me';
import About from './screens/About';
import Login from './components/Authentication/Login';


type Props = {}
export default class extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      user: {
        id: '',
        name: '',
        email: '',

      },
    };
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(user) {
    this.setState({ user: { id: user.id, name: user.name, email: user.email }, isLogin: true });
  }

  render() {
    return (
      // <View >
      (this.state.isLogin) ?
        <Application screenProps={{ user: this.state.user }} /> :

        <Login screenProps={{ onLogin: this.onLogin }} />
    // </View>

    );
  }
}
/*
{this.state.isLogin ?
    <Application />
    :
    <Login />
}
*/
const Application = TabNavigator(
  {

    Events: {
      screen: Events,
      navigationOptions: {
        tabBarLabel: 'Events',
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-list" size={35} color={tintColor} />,
      },
    },


    Me: {
      screen: Me,
      navigationOptions: {
        tabBarLabel: 'Me',
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-car" size={35} color={tintColor} />,
      },
    },

    About: {
      screen: About,
      navigationOptions: {
        tabBarLabel: 'About',
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-settings" size={35} color={tintColor} />,
      },
    },
  },
  {
    navigationOptions: (/* { navigation } */) => ({
    /*
             tabBarIcon: ({focused, tintColor}) => {
                 const {routeName} = navigation.state;
                 let iconName;
                 if (routeName === 'Home') {
                     iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                 } else if (routeName === 'Settings') {
                     iconName = `ios-options${focused ? '' : '-outline'}`;
                 }

                 // You can return any component that you like here! We usually use an
                 // icon component from react-native-vector-icons
                 return <Ionicons name={iconName} size={25} color={tintColor}/>;
             }, */


    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  },
);
