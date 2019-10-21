import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import ScreenWrapper from '../shared/ScreenWrapper';


export default class Send extends Component {
  state = {
    isModalVisible: false,
    modalContent: null
  };

  renderItemPickerModalContent = () => (
    <View>
      <Text>Pick an Item</Text>
      <Button 
        large
        backgroundColor="#4796EC"
        color="#ffffff"
        title="Pick Item to Send" 
        onPress={() => this.setState({ 
          isModalVisible: false,
          modalContent: null 
        })}
      />
      <Button 
        large
        backgroundColor="#4796EC"
        color="#ffffff"
        title="Cancel" 
        onPress={() => this.setState({ 
          isModalVisible: false,
          modalContent: null 
        })}
      />
    </View>
  )

  renderWalletPasswordModalContent = () => (
    <View>
      <Text>Enter Wallet Password</Text>
      <Button 
        large
        backgroundColor="#4796EC"
        color="#ffffff"
        title="Send" 
        onPress={() => {
          this.setState({ 
            isModalVisible: false,
            modalContent: null  
          });
          this.props.navigation.navigate('SendConfirmation')
        }}
      />
      <Button 
        large
        backgroundColor="#4796EC"
        color="#ffffff"
        title="Cancel" 
        onPress={() => this.setState({ 
          isModalVisible: false,
          modalContent: null 
        })}
      />
    </View>
  )

  // TODO: Pass parameters to QRCode screen so it knows to redirect back to the send screen with the decoded QR code
  render() {
    return (
      <View>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            {this.state.modalContent}
          </View>
        </Modal>
        <ScreenWrapper>
          <Text style={styles.paragraph}>
            Send Screen
          </Text>
          <Button 
            large
            backgroundColor="#4796EC"
            color="#ffffff"
            title="Choose Item in dropdown" 
            onPress={() => this.setState({ 
              isModalVisible: true, 
              modalContent: this.renderItemPickerModalContent() 
            })}
          />
          <Button 
            large
            backgroundColor="#4796EC"
            color="#ffffff"
            title="Go to Scan QR code" 
            onPress={() => this.props.navigation.navigate('ScanQR')}
          />
          <Button 
            large
            backgroundColor="#4796EC"
            color="#ffffff"
            title="Send" 
            onPress={() => this.setState({ 
              isModalVisible: true, 
              modalContent: this.renderWalletPasswordModalContent() 
            })}
          />
        </ScreenWrapper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});