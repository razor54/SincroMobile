import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView, FlatList,
} from 'react-native';
import {List, ListItem} from "react-native-elements";



type Props = {};
export default class Login extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            list:[
                {
                    key:'1',
                    name: 'event 1 ',
                    date: '10/12/1992',
                },
                {
                    key:'2',
                    name: 'event 2',
                    date: '9/2/1999',
                },
            ]


        }

    }



    renderItem = ({item}) => <ListItem key={item.key} title={item.name} subtitle={item.date}/>


    render() {
        return (

            <FlatList renderItem={this.renderItem} data={this.state.list}> </FlatList>


        );
    }

};


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fffdfd',
        paddingLeft: 40,
        paddingRight: 40,
    },
    header: {
        fontSize: 50,
        marginBottom: 60,
        color: '#000000',
        fontWeight: 'bold',
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fffdfd',
    },
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#d2e0ff',
        padding: 20,
        alignItems: 'center',
    },
    btnText: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold'
    }

});