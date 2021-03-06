/* eslint-disable no-use-before-define,eqeqeq */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
  AsyncStorage, ScrollView,
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import styl from '../../config/styles';
import networkSetting from '../../config/serverConnectionSettings';
import validateNIF from '../../util/NifVerify';
import languages from '../../config/languages';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


type Props = {
  // onLogin : any;
  screenProps : {
    onLogin : any
  },
  navigation : {
    navigate : any,
    pop: any,
    state:{
      params:{
          userProps:{
              name : string,
              email : string
          }
      }
    }
  },

};

export default class Register extends Component<Props> {
  constructor(props) {
    super(props);
    let userProps = null;
    if (this.props.navigation.state.params) {
      // eslint-disable-next-line prefer-destructuring
      userProps = this.props.navigation.state.params.userProps;
    }
    this.state = {
      email: userProps ? userProps.email : '',
      username: userProps ? userProps.name : '',
      password: '',
      nif: '',
      emailValid: !!userProps,
      usernameValid: !!userProps,
      passwordValid: false,
      nifValid: false,
      isLoading: false,

    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handleNif = this.handleNif.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }


  handleEmail(receivedEmail) {
    const email = receivedEmail.toLowerCase();
    const test = /\S+@\S+\.\S+/;
    this.setState({ email, emailValid: test.test(email) });
  }

  handleUserName(username) {
    const test = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    this.setState({ username, usernameValid: test.test(username) });
  }

  handleNif(nif) {
    const test = /^[0-9]{7,10}$/;
    this.setState({ nif, nifValid: test.test(nif) && validateNIF(nif) });
  }

  // Todo Limit the password for more secure test.
  // limit to at least 1 number and 1 special character, 1 capital letter
  handlePassword(password) {
    const test = /^[\s\S]{8,}$/;
    this.setState({ password, passwordValid: test.test(password) });
  }

  login = () => {
    if (!this.state.nifValid || !this.state.passwordValid || !this.state.emailValid
      || !this.state.usernameValid) {
      return alert(languages().insertValidParams);
    }
    this.setState({ isLoading: true });
    AsyncStorage.getItem('playerId').then(this.saveUser);
    // .finally(() => AsyncStorage.removeItem('playerId'));

    // this.props.navigation.navigate('Home');
  };


  saveUser(playerId) {
    fetch(`${networkSetting.homepage}/register`, {
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
        playerId,
      }),
    })
      .then(response => response.json())
      .then((res) => {
        if (res.user) {
          AsyncStorage.setItem('token', JSON.stringify(res.token))
            .then(AsyncStorage.setItem('user', JSON.stringify(res.user)))
            .then(() =>
              this.props.navigation.navigate('Application'));
        } else {
          alert(languages().thereWasAnError);
          this.setState({ isLoading: false });
        }
        // else shake button
      })
      .catch(() => {
        alert(languages().thereWasAnError);
        this.setState({ isLoading: false });
      })
      .done();
  }

  render() {
    const emailError =
      this.state.emailValid ? null :
      <FormValidationMessage>{languages().invalidEmail}</FormValidationMessage>;

    const nameError = this.state.usernameValid ?
      null
      :
      <FormValidationMessage>{languages().invalidUsername}</FormValidationMessage>;

    const passwordError = this.state.passwordValid ?
      null
      :
      <FormValidationMessage>{languages().invalidPassword}</FormValidationMessage>;

    const nifError = this.state.nifValid ?
      null
      :
      <FormValidationMessage>{languages().invalidNif}</FormValidationMessage>;

    let userProps = null;
    if (this.props.navigation.state.params) {
      // eslint-disable-next-line prefer-destructuring
      userProps = this.props.navigation.state.params.userProps;
    }

    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>

          <FormLabel>Email</FormLabel>
          <FormInput
            onChangeText={this.handleEmail}
            value={userProps ? userProps.email : this.state.email}
          // containerStyle={{ width: '60%' }}
            inputStyle={styles.inputStyle}
            autoCapitalize="none"
          />

          {emailError}

          <FormLabel>{languages().name}</FormLabel>
          <FormInput
            value={userProps ? userProps.name : this.state.username}
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

          <FormLabel>{languages().password}</FormLabel>
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
                title={languages().register}
                loading
                buttonStyle={styl.button}
              />

              :

              <Button
                onPress={this.login}
                title={languages().register}
                buttonStyle={styl.button}
              />


          }
          </View>

          <Button
            title={languages().accountHave}
            buttonStyle={styl.textBtn}
            color="rgba(78, 116, 289, 1)"
            onPress={() => this.props.navigation.pop(1, 'Login')}
          >
          Info
          </Button>

        </KeyboardAvoidingView>
      </ScrollView>
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

