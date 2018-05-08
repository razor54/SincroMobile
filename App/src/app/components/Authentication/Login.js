/* eslint-disable no-use-before-define,react/prop-types */
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

import navigationHeaderStyle from '../../config/NavigationOptionsThemed';
import App from '../../screens/Me';
import styl from '../../config/styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


type Props = {
  // onLogin : any;
};

class Login extends Component<Props> {
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

    };
  }


  setScreen = () => {
    this.props.navigation.navigate('Menu');
  };

  login = () => {
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
        }
        else{
          alert('error');
        }
        // else shake button
      })
      .done();


    // this.props.navigation.navigate('Home');
  };


  render() {
    const emailError =
      this.state.emailValid ? '' : <FormValidationMessage>Invalid Email</FormValidationMessage>;

    const nameError = this.state.username ? '' : <FormValidationMessage>Invalid username</FormValidationMessage>;

    const passwordError = this.state.password ? '' : <FormValidationMessage>Invalid password</FormValidationMessage>;

    const nifError = this.state.nif ? '' : <FormValidationMessage>Invalid NIF</FormValidationMessage>;

    return (
      <KeyboardAvoidingView style={styles.container}>


        <View style={styles.containerRow} />
        <FormLabel>Email</FormLabel>
        <FormInput
          onChangeText={email => this.setState({ email })}
          // containerStyle={{ width: '60%' }}
          inputStyle={styles.inputStyle}
        />
        {emailError}

        <FormLabel>Name</FormLabel>
        <FormInput
          onChangeText={username => this.setState({ username })}
          // containerStyle={{ width: '60%' }}
          inputStyle={styles.inputStyle}
        />
        {nameError}


        <FormLabel>NIF</FormLabel>
        <FormInput
          onChangeText={nif => this.setState({ nif })}
          // containerStyle={{ width: '60%' }}
          inputStyle={styles.inputStyle}
        />
        {nifError}

        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={password => this.setState({ password })}
          // containerStyle={{ width: '60%' }}
          inputStyle={styles.inputStyle}
        />
        {passwordError}


        <View />
        <View style={{ marginTop: 50 }}>
          <Button
            onPress={this.login}
            title="Login"
            buttonStyle={styl.button}
          />
        </View>


      </KeyboardAvoidingView>
    );
  }
}


export default StackNavigator({

  Login: {
    screen: Login,
    navigationOptions: navigationHeaderStyle('Login Page'),
  },
  Home: {
    screen: App,
  },

});

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

