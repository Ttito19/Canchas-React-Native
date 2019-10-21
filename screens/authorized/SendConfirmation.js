import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import ScreenWrapper from '../shared/ScreenWrapper';

export default class SendConfirmation extends Component {
  render() {
    return (
      <ScreenWrapper>
        <Text style={styles.paragraph}>
          Send Confirmation Screen
        </Text>
        <Button 
          large
          backgroundColor="#4796EC"
          color="#ffffff"
          title="OK" 
          onPress={() => this.props.navigation.navigate('Send')}
        />
      </ScreenWrapper>
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
