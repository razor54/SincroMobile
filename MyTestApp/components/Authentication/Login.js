import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';



type Props = {};
export default class Login extends Component<Props> {



    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            seconds:''
        }

    }


    setScreen = () => {
        this.props.navigation.navigate('Menu');
    };

    login = () => {


        fetch('http://127.0.0.1:5984/test/'+this.state.username,{
            method:'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then((response) => response.json())
        .then((res)=>{

            if(res.ok){
                alert(res.id)
            }

            else{
                alert(res.error);
            }

        })
        .done();


    };




    render() {
        return (
            <KeyboardAvoidingView behavior = 'padding' style={styles.wrapper}>

                <View style={styles.container}>



                    <Text style={styles.header}>
                        Login Page
                    </Text>

                    <TextInput style={styles.textInput} placeholder = 'Username' onChangeText = {(username)=> this.setState({username})} underlineColorAndroid = 'transparent'/>

                    <TextInput style={styles.textInput} placeholder = 'Password' onChangeText = {(password)=> this.setState({password})} underlineColorAndroid = 'transparent'/>

                    <TouchableOpacity style = {styles.btn} onPress = {this.login}>
                        <Text style = {styles.btnText}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.btn} onPress = {this.setScreen}>
                        <Text style = {styles.btnText}>Menu</Text>
                    </TouchableOpacity>

                </View>

            </KeyboardAvoidingView>
        );
    }


}





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
