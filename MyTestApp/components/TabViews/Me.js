import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
} from 'react-native';

import {Avatar} from 'react-native-elements';


type Props = {};
export default class Login extends Component<Props> {



    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        return (
            <KeyboardAvoidingView behavior = 'padding' style={styles.wrapper}>

                <View style={styles.container}>
                    <Avatar
                        source={{uri: "https://avatars0.githubusercontent.com/u/26148760?s=400&u=9c8081ddf1b2e1f299c48463b5c049eeed05b288&v=4"}}
                        large
                        title="MT"
                        onPress={() => alert("Works!")}
                        activeOpacity={0.7}
                    />
                    <Text style={styles.btnText}>
                        Nuno Conceicao
                    </Text>


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
