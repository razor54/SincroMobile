import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
} from 'react-native';


type Props = {};
export default class Login extends Component<Props> {


    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {


        return (
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

                <View style={styles.container}>

                    <Text style={styles.header}>
                        About
                    </Text>
                    <Text style={styles.textInput}>
                        Developed by
                    </Text>
                    <Text style={styles.textInput}>
                        Nuno Conceicao
                    </Text>
                    <Text style={styles.textInput}>
                        &
                    </Text>
                    <Text style={styles.textInput}>
                        Andre Gaudencio
                    </Text>

                </View>


            </KeyboardAvoidingView>

        );
    }


}


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
        justifyContent: 'flex-end',
        fontSize: 20,
        backgroundColor: '#fffdfd',
        paddingLeft: 40,
        paddingRight: 40,
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
