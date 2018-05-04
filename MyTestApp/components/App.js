/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {TabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'





import Events from './TabViews/Events';
import Me from './TabViews/Me';
import About from './TabViews/About';


export default class extends Component<Props> {

    render() {
        return (<Application/>)
    }
}


const Application = TabNavigator({

    Events: {
        screen : Events ,
        navigationOptions:{
            tabBarLabel:'Events',
            tabBarIcon:({tintColor}) => <Ionicons  name='ios-list'  size={35} color={tintColor}/>
        },
    },

    Me: {
        screen : Me,
        navigationOptions:{
            tabBarLabel:'Me',
            tabBarIcon:({tintColor}) => <Ionicons name='ios-car'  size={35} color={tintColor}/>
        }
    },

    About:{
        screen: About,
        navigationOptions: {
            tabBarLabel: 'About',
            tabBarIcon:({tintColor}) => <Ionicons  name='ios-settings' size={35}  color={tintColor}/>
        }
    },
});
