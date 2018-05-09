/* eslint-disable no-use-before-define,eqeqeq */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage, Input, Button } from 'react-native-elements';


import styl from '../../config/styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


type Props = {
  // onLogin : any;
  screenProps : {
    onLogin : any
  },
  navigation:{
    navigate : any
  }
};

export default class Register extends Component<Props> {
  // This function was based on
  // https://pt.wikipedia.org/wiki/N%C3%BAmero_de_identifica%C3%A7%C3%A3o_fiscal
  static validateNIF(nif) {
    let comparator;
    if (!['1', '2', '3', '5', '6', '8'].includes(nif.substr(0, 1)) &&
      !['45', '70', '71', '72', '77', '79', '90', '91', '98', '99'].includes(nif.substr(0, 2))) {
      return false;
    }
    // eslint-disable-next-line max-len,no-mixed-operators
    const total = nif[0] * 9 + nif[1] * 8 + nif[2] * 7 + nif[3] * 6 + nif[4] * 5 + nif[5] * 4 + nif[6] * 3 + nif[7] * 2;
    const modulo11 = (Number(total) % 11);
    if (modulo11 == 1 || modulo11 == 0) {
      comparator = 0;
    } else {
      comparator = 11 - modulo11;
    }
    if (nif[8] != comparator) {
      return false;
    }
    return true;
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      nif: '',
      emailValid: false,
      usernameValid: false,
      passwordValid: false,
      nifValid: false,
      isLoading: false,

    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handleNif = this.handleNif.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }


  handleEmail(email) {
    const test = /\S+@\S+\.\S+/;
    this.setState({ email, emailValid: test.test(email) });
  }

  handleUserName(username) {
    const test = /^[a-zA-Z ]{2,30}$/;
    this.setState({ username, usernameValid: test.test(username) });
  }

  handleNif(nif) {
    const test = /^[0-9]{7,10}$/;
    this.setState({ nif, nifValid: test.test(nif) && Register.validateNIF(nif) });
  }

  // Todo Limit the password for more secure test.
  // limit to at least 1 number and 1 special character, 1 capital letter
  handlePassword(password) {
    const test = /^[\s\S]{8,}$/;
    this.setState({ password, passwordValid: test.test(password) });
  }


  login = () => {
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:9000/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.username,
        password: this.state.password,
        email: this.state.email,
        id: this.state.nif,
      }),
    })
      .then(response => response.json())
      .then((res) => {
        if (res.id) {
          alert('Ok');
          this.props.screenProps.onLogin();
        } else {
          alert('error');
        }
        // else shake button
      })
      .catch(() => { alert('There was an error'); })
      .finally(() => this.setState({ isLoading: false }))
      .done();


    // this.props.navigation.navigate('Home');
  };


  render() {
    const emailError =
      this.state.emailValid ? '' : <FormValidationMessage>Invalid Email</FormValidationMessage>;

    const nameError = this.state.usernameValid ? '' : <FormValidationMessage>Invalid username</FormValidationMessage>;

    const passwordError = this.state.passwordValid ? '' : <FormValidationMessage>Invalid password. Insert 8 or more characters</FormValidationMessage>;

    const nifError = this.state.nifValid ? '' : <FormValidationMessage>Invalid NIF</FormValidationMessage>;

    return (
      <KeyboardAvoidingView style={styles.container}>

        <FormLabel>Email</FormLabel>
        <FormInput
          onChangeText={this.handleEmail}
          // containerStyle={{ width: '60%' }}
          inputStyle={styles.inputStyle}
        />
        {emailError}

        <FormLabel>Name</FormLabel>
        <FormInput
          onChangeText={this.handleUserName}
          // containerStyle={{ width: '60%' }}
          inputStyle={styles.inputStyle}
        />
        {nameError}


        <FormLabel>NIF</FormLabel>
        <FormInput
          onChangeText={this.handleNif}
          // containerStyle={{ width: '60%' }}
          inputStyle={styles.inputStyle}
        />
        {nifError}

        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={this.handlePassword}
          // containerStyle={{ width: '60%' }}
          inputStyle={styles.inputStyle}
          secureTextEntry
        />
        {passwordError}


        <View style={{ marginTop: 50 }}>
          {


            this.state.isLoading ?

              <Button
                onPress={this.login}
                title="Register"
                loading
                buttonStyle={styl.button}
              />

              :

              <Button
                onPress={this.login}
                title="Register"
                buttonStyle={styl.button}
              />


          }
        </View>

        <Button
          title="Already have an account? Click Here"
          buttonStyle={styl.textBtn}
          color="rgba(78, 116, 289, 1)"
          onPress={() => this.props.navigation.navigate('Login')}
        >
          Info
        </Button>

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
    // justifyContent: 'center',
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
  textStretch: {
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
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  containerRow: {
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    width: SCREEN_WIDTH - 300,
  },
  inputStyle: {
    // height: 30,
    width: SCREEN_WIDTH - 100,
    // backgroundColor: '#fff',
    // borderColor: '#fd76bb',
    // borderWidth: 1,
    // borderRadius: 100,
  },

});

