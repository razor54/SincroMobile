/* eslint-disable react/prop-types,react/prefer-stateless-function,no-undef */
import React from 'react';
import { TabNavigator, TabBarBottom, SwitchNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Events from './screens/Events';
import Me from './screens/Me';
import About from './screens/Options';
import Login from './components/Authentication/Login';
import SplashScreen from './SplashScreen';
import NoConnectionScreen from './NoConnectionScreen';
import theme from './config/theme';
import Vehicles from './screens/Vehicles';
import languages from './config/languages';


const Application = TabNavigator(
  {

    Events: {
      screen: Events,
      navigationOptions: {
        tabBarLabel: languages().events,
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-list" size={35} color={tintColor} />,
      },
    },


    Me: {
      screen: Me,
      navigationOptions: {
        tabBarLabel: languages().me,
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={35} color={tintColor} />,
      },
    },

    Vehicles: {
      screen: Vehicles,
      navigationOptions: {
        tabBarLabel: languages().vehicles,
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-car" size={35} color={tintColor} />,
      },
    },

    About: {
      screen: About,
      navigationOptions: {
        tabBarLabel: languages().options,
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-settings" size={35} color={tintColor} />,
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: theme.main.backgroundColor,
      },
      indicatorStyle: {
        backgroundColor: 'gray',
      },
      activeTintColor: 'darkblue',
      inactiveTintColor: 'gray',


    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
  },
);


const Stack = SwitchNavigator(
  {
    Application,
    Auth: Login,
    Loading: SplashScreen,
    NoConnection: NoConnectionScreen,

  }
  ,

  {
    initialRouteName: 'Loading',
  },
);

export default Stack;
