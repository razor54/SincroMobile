/* eslint-disable no-alert */
/* global alert:false */
import { Avatar, ListItem } from 'react-native-elements';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { AccessToken } from 'react-native-fbsdk';
import Modal from 'react-native-modal';
import styles from '../../../config/styles';
import networkSettings from '../../../config/serverConnectionSettings';


type Props = {
    user: any,
}

export default class UserInfo extends Component<Props> {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);


    this.state = {
      user: props.user,
      userImage: null,
      visibleModal: false,
      requestList: [],
    };
  }


  componentDidMount() {
    AccessToken.getCurrentAccessToken().then((token) => {
      if (token != null) {
        const url = `${networkSettings.homepage}/vehicles/delegate/`;
        const data = {
          body: JSON.stringify({
          }),
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        };

        fetch(url, data)
          .then((res) => {
            if (res.ok) return res.json();
            alert('Error');
          })
          .then(requestList => this.setState({ requestList }));
      } else {
        // redirect to login screen
      }
    });
  }

  showMoreInfo() {
    this.setState({ visibleModal: true });
  }

  closeMoreInfo() {
    this.setState({ visibleModal: false });
  }

  onPress(item) {

  }

  renderItem = ({ item }) =>
    (<ListItem
      title={item.plate}
      onPress={() => this.onPress(item)}
      subtitle={item.date}
    />);

  renderModalContent = () => (
    <View style={styles.modalContent} >

      <FlatList
        renderItem={this.renderItem}
        data={this.state.requestList}
        keyExtractor={(item, index) => `${index}`}
        onRefresh={this.doRefresh}
        refreshing={this.state.refreshing}
      />
    </View>
  );


  render() {
    return (
      <View style={styles.userIcon}>
        <Avatar
          source={this.state.userImage ? { uri: this.state.userImage } : require('../../../../../public/image/user-1808597_1280.png')}
          large
          title="MI"
          rounded
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
