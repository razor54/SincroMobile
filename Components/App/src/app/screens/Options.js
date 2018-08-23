import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Avatar, Button, Text } from 'react-native-elements';
import {
  View,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
  Button as Button2, ActivityIndicator,
} from 'react-native';
import styles from '../config/styles';
import navigationHeaderStyle from '../config/NavigationOptionsThemed';
import About from '../components/OptionsComponents/About';
import { getUser } from '../service/userService';
import languages from '../config/languages';

type Props = {
  navigation:{
    navigate: any,
  }
};

class Options extends Component<Props> {
  constructor(props) {
    super(props);


    this.showAlertDecision = this.showAlertDecision.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.logout = this.logout.bind(this);
    this.gotToAbout = this.gotToAbout.bind(this);


    this.state = {
      userLoaded: false,
      user: {
        name: null,
        id: null,
        email: null,
      },
    };
  }
  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    AsyncStorage.getItem('token').then((token) => {
      if (token == null) { throw Error('No token'); }

      return JSON.parse(token);
    }).then((token) => {
      getUser(token)
        .then(res => res.json())
        .then((user) => {
          if (!user.id) throw Error('No valid user');
          this.setState({ user, userLoaded: true });
        });
    }).catch(this.logout);
  }


  showAlertDecision() {
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        { text: 'Yes', onPress: () => this.logout() },
        { text: 'Cancel', onPress: () => {} },
      ],
      { cancelable: false },
    );
  }


  logout() {
    AsyncStorage.removeItem('token').then(() => this.props.navigation.navigate('Auth'));
  }

  gotToAbout() {
    this.props.navigation.navigate('About');
  }


  render() {
    return (this.state.userLoaded ?
      (
        <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
          <Button2
            styles={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'flex-end' }}
            title="Log Out"
            onPress={this.showAlertDecision}
          />
          <View style={styles.container}>

            <View style={styles.userIcon}>

              <Avatar
                source={this.state.userImage ? { uri: this.state.userImage } : require('../../../public/image/user_icon.png')}
                title="MI"
                large
                overlayContainerStyle={{ backgroundColor: 'transparent' }}
                onPress={this.showMoreInfo}
                activeOpacity={2}
              />

            </View>

            <Text style={styles.btnText}>{this.state.user.name}</Text>
            <Text style={styles.btnText}>{this.state.user.id} </Text>
            <Text style={{ ...styles.btnText }}>{this.state.user.email}</Text>

            <View style={{ alignItems: 'center', justifyContent: 'flex-end', padding: 5 }}>
              <Button
                buttonStyle={styles.button2}
                rounded
                onPress={this.gotToAbout}
                title={languages().aboutUs}
              />
            </View>

          </View>
        </KeyboardAvoidingView>

      ) :
      (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      ));
  }
}


export default StackNavigator({
  Options: {
    screen: Options,
    navigationOptions: navigationHeaderStyle(languages().options),
  },
  About: {
    screen: About,
    navigationOptions: navigationHeaderStyle(languages().about),
  },

});

