/* global fetch:false */
/* global alert:false */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Avatar, CheckBox, FormInput, FormLabel, Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import networkSettings from '../../config/serverConnectionSettings';


type Props = {
    user : any,
    callback: any,
}
const SCREEN_WIDTH = Dimensions.get('window').width;


const addButtonIcon = {
  name: 'add-circle',
  type: 'ionicons',
  color: 'black',
  size: 35,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4ba5ff',
    color: '#ffffff',
    padding: 10,
    margin: 20,
    textAlign: 'center',
    fontFamily: 'arial',
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
    textAlign: 'center',
    borderColor: 'lightgrey',
    alignItems: 'center',
    width: SCREEN_WIDTH - 100,
    margin: 10,
    paddingLeft: 10,
  },
});


export default class RegisterVehicleForm extends Component<Props> {
  constructor(props) {
    super(props);

    this.renderModalContent = this.renderModalContent.bind(this);
    this.handlePlate = this.handlePlate.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.handleAddVehicle = this.handleAddVehicle.bind(this);
    this.handleDatePicked = this.handleDatePicked.bind(this);
    this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
    this.showDateTimePicker = this.showDateTimePicker.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.callback = props.callback;

    this.state = {
      user: props.user,
      userId: props.user.id,
      visibleModal: false,
      plate: null,
      isPlateValid: false,
      subscribe: false,
      date: new Date(),
      isDateTimePickerVisible: false,
    };
  }


  componentDidMount() {
  }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (date) => {
      this.setState({ date });
      this.hideDateTimePicker();
    };

    handleAddVehicle() {
      const url = `${networkSettings.homepage}/vehicle`;
      AsyncStorage.getItem('token').then((t) => {
        const token = JSON.parse(t);

        if (token != null) {
          fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `${token.token_type} ${token.access_token}`,
            },
            body: JSON.stringify({
              subscribed: this.state.subscribe,
              plate: this.state.plate,
              registryDate: this.state.date,
              ownerId: this.state.userId,
            }),
          })
            .then((response) => {
              if (response.status !== 200) alert('There was an error');
              this.callback();
            })
            .catch(() => {
              // this.setState({ isLoading: false });
              alert('There was an error');
            })
            .finally(() => {
              this.setState({ visibleModal: false });
            })
            .done();
        }
      });
    }


    handleSubscribe() {
      this.setState({ subscribe: !this.state.subscribe });
    }


    handlePlate(plate) {
      const test = /^\d{2}-\d{2}-[A-Z]{2}|\d{2}-[A-Z]{2}-\d{2}|[A-Z]{2}-\d{2}-\d{2}$/;
      this.setState({
        plate,
        isplateValid: test.test(plate),
      });
    }


    closeModal() {
      this.setState({ visibleModal: false });
    }


    // noinspection JSAnnotator
    renderModalContent = () => (
      <View>
        <View>
          <Avatar
            source={require('../../../../public/image/closebutton.png')}
            xsmall
            rounded
            title="Close"
            onPress={this.closeModal}
            activeOpacity={2}
          />
        </View>
        <View style={styles.modalContent}>

          <FormLabel>Plate</FormLabel>
          <FormInput
            onChangeText={this.handlePlate}
            inputStyle={styles.inputStyle}
          />
          {null /* plateError */ }


          <FormLabel> Date </FormLabel>

          {null /* plateError */ }

          <TouchableOpacity onPress={this.showDateTimePicker}>
            <Text style={styles.inputStyle}>
              {this.state.date.getDate()} /
              {this.state.date.getMonth()} /
              {this.state.date.getFullYear()}
            </Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
          <CheckBox
            title="Subscribed"
            onPress={this.handleSubscribe}
            checked={this.state.subscribe}
          />
          {null /* passwordError */}

          <Button title="Add" onPress={this.handleAddVehicle} />
        </View>
      </View>

    );


    render() {
      return (
        <View >
          <Button
            transparent
            icon={addButtonIcon}
            onPress={() => this.setState({ visibleModal: true })}
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
            onRequestClose={this.closeModal}
          >
            {this.renderModalContent()}
          </Modal>
        </View>
      );
    }
}

