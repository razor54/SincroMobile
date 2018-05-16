/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView, TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Avatar, Button } from 'react-native-elements';
import { AccessToken, GraphRequest, GraphRequestManager, LoginButton } from 'react-native-fbsdk';
import styles from '../config/styles';
import navigationHeaderStyle from '../config/NavigationOptionsThemed';
import networkSetting from '../config/serverConnectionSettings';


type Props = {
  screenProps : {
    user : {
      id : number,
      email : String,
      name : String,
    }
  }
};
class Profile extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      userImage: null,
    };
  }

  render() {
    const { user } = this.props.screenProps;

    return (
      <View behavior="padding" style={styles.wrapper}>

        <View style={styles.containerRow}>
          <Avatar
            source={this.state.userImage ? { uri: this.state.userImage } : require('../../../public/image/user-1808597_1280.png')}
            large
            title="MI"
            rounded
            onPress={() => alert('Works!')}
            activeOpacity={0.7}
          />

          <Text style={styles.textCenter}>
            {user.name} - {user.id}
          </Text>

          <Text style={styles.textCenter}>
            {user.email}
          </Text>


          <Button
            title="Info"
            buttonStyle={styles.textBtn}
            color="rgba(78, 116, 289, 1)"
            onPress={() => alert('More info')}
          >
                Info
          </Button>


        </View>

        <LoginButton
          onLogoutFinished={() => alert('User logged out')}
        />

      </View>
    );
  }

  componentDidMount() {
    AccessToken.getCurrentAccessToken().then((data) => {
      const infoRequest = new GraphRequest(
        '/me?fields=picture.height(480)&redirect=false,public_profile',
        null,
        this._responseInfoCallback,
      );
      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  }
  _responseInfoCallback = (error, result) => {
    if (error) {

    } else {
      // console.warn(result);
      // http://graph.facebook.com/id/picture?type=square
      // console.warn(`http://graph.facebook.com/${result.id}/picture?type=square&redirect=0&width=100&height=100`);
      this.setState({ userImage: result.picture.data.url });
    }
  };
}

export default StackNavigator({

  List: {
    screen: Profile,

    navigationOptions: navigationHeaderStyle('User Profile'),
  },

});
