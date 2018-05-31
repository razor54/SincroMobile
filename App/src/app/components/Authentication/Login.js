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
  AsyncStorage,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage, Input, Button } from 'react-native-elements';
import navigationHeaderStyle from '../../config/NavigationOptionsThemed';
import App from '../../screens/Me';
import styl from '../../config/styles';
import Register from './Register';
import networkSetting from '../../config/serverConnectionSettings';
import validateNIF from '../../util/NifVerify';

const FBSDK = require('react-native-fbsdk');

const {
  LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager,
} = FBSDK;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


type Props = {
  // onLogin : any;
  screenProps : {
    onLogin : any
  },
  navigation : {
    navigate : any
  }
};

class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {

      password: '',
      nif: '',


      passwordValid: false,
      nifValid: false,
      isLoading: false,

    };

    this.handleNif = this.handleNif.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }


  handleNif(nif) {
    const test = /^[0-9]{7,10}$/;
    this.setState({ nif, nifValid: test.test(nif) && validateNIF(nif) });
  }

  handlePassword(password) {
    const test = /^[\s\S]{8,}$/;
    this.setState({ password, passwordValid: test.test(password) });
  }


  login = () => {
    if (!this.state.nifValid || !this.state.passwordValid) {
      return alert('Please insert valid params');
    }
    this.setState({ isLoading: true });

    fetch(`${networkSetting.homepage}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: this.state.password,
        id: this.state.nif,
      }),
    })
      .then(response => response.json())
      .then((res) => {
        if (res.user) {
          AsyncStorage.setItem('token', JSON.stringify(res.token)).then(() => {
            this.props.screenProps.onLogin(res.user);
          });
        } else {
          alert('error');
          this.setState({ isLoading: false });
        }
        // else shake button
      })
      .catch(() => {
        this.setState({ isLoading: false });
        alert('There was an error');
      })
      .done();
  };


  render() {
    const passwordError = this.state.passwordValid ? null :
    <FormValidationMessage>Invalid password. Insert 8 or more characters</FormValidationMessage>;

    const nifError = this.state.nifValid ? null : <FormValidationMessage>Invalid NIF</FormValidationMessage>;

    return (
      <KeyboardAvoidingView style={styles.container}>

        <FormLabel>NIF</FormLabel>
        <FormInput
          onChangeText={this.handleNif}
          inputStyle={styles.inputStyle}
        />
        {nifError}


        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={this.handlePassword}
          inputStyle={styles.inputStyle}
          secureTextEntry
        />
        {passwordError}


        <View />
        <View style={{ marginTop: 50 }}>
          {


            this.state.isLoading ?

              <Button
                onPress={this.login}
                title="Login"
                loading
                buttonStyle={styl.button}
              />

              :

              <Button
                onPress={this.login}
                title="Login"
                buttonStyle={styl.button}
              />


          }
        </View>

        <Button
          title="Don't Have an account? Click Here"
          buttonStyle={styl.textBtn}
          color="rgba(78, 116, 289, 1)"
          onPress={() => this.props.navigation.navigate('Register')}
        >
          Info
        </Button>

        <LoginButton
          readPermissions={['email', 'public_profile']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert(`Login failed with error: ${result.error}`);
              } else if (result.isCancelled) {
                alert('Login was cancelled');
              } else {
                // alert(`Login was successful with permissions: ${result.grantedPermissions}`);

                AccessToken.getCurrentAccessToken().then((data) => {
                  const infoRequest = new GraphRequest(
                    '/me?fields=name,picture,email,first_name,last_name',
                    null,
                    this._responseInfoCallback,
                  );
                  // Start the graph request.
                  new GraphRequestManager().addRequest(infoRequest).start();
                });
              }
            }
          }
          onLogoutFinished={() => alert('User logged out')}
        />

      </KeyboardAvoidingView>
    );
  }

  // Create response callback.
  _responseInfoCallback = (error, result) => {
    if (error) {
      alert(`Error fetching data: ${error.toString()}`);
    } else {
      // alert(`Result Name: ${result.name}`);

      const myInit = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      };
      fetch(`${networkSetting.homepage}/user/${result.email}`, myInit)
        .then(data => data.json())
        .then((user) => {
          if (user.id) {
            this.props.screenProps.onLogin(user);
          } else {
            this.props.navigation.navigate('Register', { userProps: { name: result.name, email: result.email } });
          }
        }).catch(() => alert('Network error'));
    }
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((t) => {
      const token = JSON.parse(t);

      if (token != null) {
        const myInit = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        };
        fetch(`${networkSetting.homepage}/validate`, myInit).then(res => res.json())
          .then((user) => {
            console.warn(user);
            if (user.id) {
              this.props.screenProps.onLogin(user);
            }
          })
          .catch(() => this.getFacebookUser());
      }
    });
  }

  getFacebookUser() {
    AccessToken.getCurrentAccessToken().then((data) => {
      if (data == null) return;
      const infoRequest = new GraphRequest(
        '/me?fields=name,picture,email,first_name,last_name',
        null,
        this._responseInfoCallback,
      );
      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  }
}

export default StackNavigator({

  Login: {
    screen: Login,
    navigationOptions: navigationHeaderStyle('Login Page'),
  },
  Register: {
    screen: Register,
    navigationOptions: navigationHeaderStyle('Register Page'),
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

