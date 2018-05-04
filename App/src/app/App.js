import React, {Component} from 'react';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'


import Events from './components/TabViews/Events';
import Me from './components/TabViews/Me';
import About from './components/TabViews/About';


type Props = {}
export default class extends Component<Props> {

    render() {
        return (<Application/>)
    }
}

const Application = TabNavigator({

        Events: {
            screen: Events,
            navigationOptions: {
                tabBarLabel: 'Events',
                tabBarIcon: ({tintColor}) => <Ionicons name='ios-list' size={35} color={tintColor}/>,
            },
        },


        Me: {
            screen: Me,
            navigationOptions: {
                tabBarLabel: 'Me',
                tabBarIcon: ({tintColor}) => <Ionicons name='ios-car' size={35} color={tintColor}/>
            }
        },

        About: {
            screen: About,
            navigationOptions: {
                tabBarLabel: 'About',
                tabBarIcon: ({tintColor}) => <Ionicons name='ios-settings' size={35} color={tintColor}/>
            }
        },
    },
    {
        navigationOptions: ({navigation}) => ({
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
             },*/


        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
    })
;