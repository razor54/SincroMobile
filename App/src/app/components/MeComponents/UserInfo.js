/* global alert:false */
import { Avatar, Button } from 'react-native-elements';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { AccessToken, GraphRequest, GraphRequestManager, LoginButton } from 'react-native-fbsdk';
import theme_styles from '../../config/styles';


type Props = {
    user: any,
}

export default class UserInfo extends Component<Props> {
  constructor(props) {
    super(props);

    this.responseInfoCallback = this.responseInfoCallback.bind(this);

    this.state = {
      user: props.user,
      userImage: null,
    };
  }


  componentDidMount() {
    AccessToken.getCurrentAccessToken().then(() => {
      const infoRequest = new GraphRequest(
        '/me?fields=picture.height(480)&redirect=false,public_profile',
        null,
        this.responseInfoCallback,
      );
      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  }
  responseInfoCallback = (error, result) => {
    if (error) alert(error.toString());
    else this.setState({ userImage: result.picture.data.url });
  };


  render() {
    return (
      <View>
        <View style={theme_styles.containerRow}>
          <Avatar
            source={this.state.userImage ? { uri: this.state.userImage } : require('../../../../public/image/user-1808597_1280.png')}
            large
            title="MI"
            rounded
            onPress={() => alert('Works!')}
            activeOpacity={0.7}
          />

          <Text style={theme_styles.textCenter}>
            {this.state.user.name}
          </Text>


          <Button
            title="Info"
            buttonStyle={theme_styles.textBtn}
            color="rgba(78, 116, 289, 1)"
            onPress={() => alert('More info')}
          >
              Info
          </Button>


        </View>

        <Text style={theme_styles.textCenter}>
          {this.state.user.email}
        </Text>
        <Text>Nif: {this.state.user.id} </Text>

        <LoginButton
          onLogoutFinished={() => alert('User logged out')}
        />
      </View>);
  }
}

