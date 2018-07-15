/* eslint-disable no-alert */
/* global alert:false */
import { Avatar } from 'react-native-elements';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import Modal from 'react-native-modal';
import styles from '../../config/styles';


type Props = {
    user: any,
}

export default class UserInfo extends Component<Props> {
  constructor(props) {
    super(props);

    this.responseInfoCallback = this.responseInfoCallback.bind(this);
    this.showMoreInfo = this.showMoreInfo.bind(this);
    this.closeMoreInfo = this.closeMoreInfo.bind(this);

    this.state = {
      user: props.user,
      userImage: null,
      visibleModal: false,
    };
  }


  componentDidMount() {
    AccessToken.getCurrentAccessToken().then((token) => {
      if (!token) return;
      const infoRequest = new GraphRequest(
        '/me?fields=picture.height(480)&redirect=false,public_profile',
        null,
        this.responseInfoCallback,
      );
      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  }

  showMoreInfo() {
    this.setState({ visibleModal: true });
  }

  closeMoreInfo() {
    this.setState({ visibleModal: false });
  }


  responseInfoCallback = (error, result) => {
    if (error) alert('An error fetching user image');
    else this.setState({ userImage: result.picture.data.url });
  };


  renderModalContent = () => (
    <View style={styles.modalContent} >

      <View>
        <Avatar
          source={require('../../../../public/image/closebutton.png')}
          xsmall
          rounded
          title="Close"
          onPress={this.closeMoreInfo}
          activeOpacity={2}
        />
      </View>

      <View style={styles.userIcon}>
        <Avatar
          source={this.state.userImage ? { uri: this.state.userImage } : require('../../../../public/image/user_icon.png')}
          xlarge
          rounded
          title="MI"
          onPress={this.showMoreInfo}
          activeOpacity={2}
        />

      </View>
      <Text style={styles.textCenter}>{this.state.user.name}</Text>
      <Text style={styles.textCenter}>{this.state.user.id} </Text>
      <Text style={styles.textCenter}>{this.state.user.email}</Text>
    </View>
  );


  render() {
    return (
      <View style={styles.userIcon}>
        <Avatar
          source={this.state.userImage ? { uri: this.state.userImage } : require('../../../../public/image/user_icon.png')}
          large
          title="MI"
          rounded
          overlayContainerStyle={{ backgroundColor: 'transparent' }}
          onPress={this.showMoreInfo}
          activeOpacity={2}
        />
        <Modal
          isVisible={this.state.visibleModal}
          backdropColor="black"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={500}
          animationOutTiming={500}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={500}
          onRequestClose={this.closeMoreInfo}
        >
          {this.renderModalContent()}
        </Modal>
      </View>
    );
  }
}


/*

         */
