import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import EventList from '../EventNavigator/EventList'
import EventElement from '../EventNavigator/EventElement'


type Props = {};
export default class Login extends Component<Props> {

    render() {
        return(<EventStack/>)
    }

}

const EventStack = StackNavigator({

    List: {
        screen: EventList,
        navigationOptions: {
            header: 'Events'
        }
    },
    Element: {
        screen: EventElement,
    }


});



const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fffdfd',
        paddingLeft:40,
        paddingRight:40,
    },
    header:{
        fontSize:50,
        marginBottom:60,
        color:'#000000',
        fontWeight: 'bold',
    },
    textInput:{
        alignSelf:'stretch',
        padding:16,
        marginBottom:20,
        backgroundColor:'#fffdfd',
    },
    btn:{
        alignSelf:'stretch',
        backgroundColor:'#d2e0ff',
        padding:20,
        alignItems:'center',
    },
    btnText:{
        color: '#ffffff',
        fontSize:24,
        fontWeight: 'bold'
    }


});
