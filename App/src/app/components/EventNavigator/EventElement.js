import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    KeyboardAvoidingView,

} from 'react-native';


type Props = {};
export default class Login extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                <Text style={styles.header}>
                    Event Item
                </Text>
            </KeyboardAvoidingView>

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