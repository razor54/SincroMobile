/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView, TouchableOpacity,
  StyleSheet, FlatList, Dimensions, TextInput, ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { StackNavigator } from 'react-navigation';
import { Avatar, Button, CheckBox, FormInput, FormLabel, ListItem } from 'react-native-elements';
import { AccessToken, GraphRequest, GraphRequestManager, LoginButton } from 'react-native-fbsdk';
import theme_styles from '../config/styles';
import navigationHeaderStyle from '../config/NavigationOptionsThemed';
import networkSetting from '../config/serverConnectionSettings';

const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
    screenProps: {
        user: {
            id: number,
            email: String,
            name: String,
        }
    }
};

class Profile extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      userImage: null,
      visibleModal: false,
      plate: null,
      isPlateValid: false,
      subscribe: false,
      date: null,
      list: null,
      isDateTimePickerVisible: false,

    };

    this._renderButton = this._renderButton.bind(this);
    this._renderModalContent = this._renderModalContent.bind(this);
    this.handlePlate = this.handlePlate.bind(this);
    this._responseInfoCallback = this._responseInfoCallback.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.handleAddVehicle = this.handleAddVehicle.bind(this);

    this._renderList = this._renderList.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this._handleDatePicked = this._handleDatePicked.bind(this);
    this._hideDateTimePicker = this._hideDateTimePicker.bind(this);
    this._showDateTimePicker = this._showDateTimePicker.bind(this);
  }


  render() {
    const { user } = this.props.screenProps;

    return (
      <ScrollView>
        <View behavior="padding" style={theme_styles.wrapper}>

          <View style={theme_styles.containerRow}>
            <Avatar
              source={this.state.userImage ? { uri: this.state.userImage } : require('../../../public/image/user-1808597_1280.png')}
              large
              title="MI"
              rounded
              onPress={() => alert('Works!')}
              activeOpacity={0.7}
            />

            <Text style={theme_styles.textCenter}>
              {user.name}
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
            {user.email}
          </Text>
          <Text>Nif: {user.id} </Text>

          <LoginButton
            onLogoutFinished={() => alert('User logged out')}
          />
          {this._renderList()}

          {this._renderButton('Register a Vehicle', () => this.setState({ visibleModal: true }))}

          <Modal
            isVisible={this.state.visibleModal}
            backdropColor="black"
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
          >
            {this._renderModalContent()}
          </Modal>

        </View>
      </ScrollView>
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
    const userId = this.props.screenProps.user.id;
    const url = `${networkSetting.homepage}/vehicles/${userId}`;
    fetch(url).then(reply => reply.json())
      .then(list => this.setState({ list }));
  }


  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({ date });
    this._hideDateTimePicker();
  };


  renderItem = ({ item }) =>
    (<ListItem
      // key={item.plate}
      title={item.plate}
      subtitle={item.date}
      // onPress={() => this.onPress(item)}
    />);


  _renderList() {
    return (
      <FlatList renderItem={this.renderItem} data={this.state.list} keyExtractor={(item, index) => `${index}`} />
    );
  }
  handlePlate(plate) {
    const test = /^\d{2}-\d{2}-[A-Z]{2}|\d{2}-[A-Z]{2}-\d{2}|[A-Z]{2}-\d{2}-\d{2}$/;
    this.setState({
      plate,
      isplateValid: test.test(plate),
    });
  }

  handleSubscribe() {
    this.setState({ subscribe: !this.state.subscribe });
  }

  handleAddVehicle() {
    const url = `${networkSetting.homepage}/vehicle`;
    const plate = this.state.plate;
    const date = this.state.date;
    const userId = this.props.screenProps.user.id;
    const subscribe = this.state.subscribe;

    console.log(JSON.stringify({
      subscribed: subscribe,
      plate,
      registryDate: date,
      ownerId: userId,
    }));
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscribed: subscribe,
        plate,
        registryDate: date,
        ownerId: userId,
      }),
    })
      .then((response) => { if (response.status !== 200) alert('There was an error'); })
      .catch(() => {
        // this.setState({ isLoading: false });
        alert('There was an error');
      })
      .done();
    this.setState({ visibleModal: false });
  }

  _responseInfoCallback = (error, result) => {
    if (error) {

    } else {
      this.setState({ userImage: result.picture.data.url });
    }
  };

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>


      <FormLabel>Plate</FormLabel>
      <FormInput
        onChangeText={this.handlePlate}
        inputStyle={styles.inputStyle}
      />
      {null /* plateError */ }


      <FormLabel>Registration Date</FormLabel>

      <TouchableOpacity onPress={this._showDateTimePicker}>
        <Text style={styles.inputStyle}>PickDate</Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this._handleDatePicked}
        onCancel={this._hideDateTimePicker}
      />
      <CheckBox
        title="Subscribed"
        onPress={this.handleSubscribe}
        checked={this.state.subscribe}
      />
      {null /* passwordError */}
      {this._renderButton('Add', this.handleAddVehicle)}
      {this._renderButton('Close', () => this.setState({ visibleModal: false }))}
    </View>
  );
}

export default StackNavigator({

  List: {
    screen: Profile,

    navigationOptions: navigationHeaderStyle('User Profile'),
  },

});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  inputStyle: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    alignItems: 'center',
    width: SCREEN_WIDTH - 100,
    margin: 10,
    paddingLeft: 10,
  },
});
