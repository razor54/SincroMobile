import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
  AsyncStorage,
  NativeModules,
  Platform,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import navigationHeaderStyle from '../../config/NavigationOptionsThemed';
import styl from '../../config/styles';
import Register from './Register';
import networkSetting from '../../config/serverConnectionSettings';
import validateNIF from '../../util/NifVerify';
import languages from '../../config/languages';


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

    this.onLogin = this.onLogin.bind(this);
    this.handleNif = this.handleNif.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

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
            if (user.id) {
              this.onLogin();
            }
          });
      }
    });
    // console.warn(this.getLanguageCode());
    // AsyncStorage.setItem('language', this.getLanguageCode());
  }


  onLogin() {
    this.props.navigation.navigate('Application');
  }

  handlePassword(password) {
    const test = /^[\s\S]{8,}$/;
    this.setState({ password, passwordValid: test.test(password) });
  }

  handleNif(nif) {
    const test = /^[0-9]{7,10}$/;
    this.setState({ nif, nifValid: test.test(nif) && validateNIF(nif) });
  }

  login = () => {
    if (!this.state.nifValid || !this.state.passwordValid) {
      return alert('Please insert valid params');
    }
    this.setState({ isLoading: true });

    AsyncStorage.getItem('playerId').then(playerId =>
      fetch(`${networkSetting.homepage}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: this.state.password,
          id: this.state.nif,
          playerId,
        }),
      })
        .then(response => response.json())
        .then((res) => {
          if (res.user) {
            AsyncStorage.setItem('token', JSON.stringify(res.token)).then(() => {
              // this.props.screenProps.onLogin(res.user);
              this.onLogin();
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
        .done());
  };

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
              // this.props.screenProps.onLogin(user);
              this.onLogin();
            } else {
              this.props.navigation.navigate('Register', { userProps: { name: result.name, email: result.email } });
            }
          }).catch(() => alert('Network error'));
      }
    };

    render() {
      const passwordError = this.state.passwordValid ? null :
      <FormValidationMessage>{languages().invalidPassword}</FormValidationMessage>;

      const nifError = this.state.nifValid ?
        null : <FormValidationMessage>{languages().invalidNif}</FormValidationMessage>;

      return (
        <KeyboardAvoidingView style={styles.container}>

          <FormLabel>NIF</FormLabel>
          <FormInput
            onChangeText={this.handleNif}
            inputStyle={styles.inputStyle}
          />
          {nifError}


          <FormLabel>{languages().password}</FormLabel>
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
            title={languages().accountDontHave}
            buttonStyle={styl.textBtn}
            color="rgba(78, 116, 289, 1)"
            onPress={() => this.props.navigation.navigate('Register')}
          >
          Info
          </Button>

        </KeyboardAvoidingView>
      );
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


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

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

