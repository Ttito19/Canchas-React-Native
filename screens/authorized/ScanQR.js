import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import ScreenWrapper from '../shared/ScreenWrapper';

export default class ViewItem extends Component {
  // TODO: Make this screen navigate to the correct screen depending on parameters passed in
  render() {
    return (
      <ScreenWrapper>
        <Text style={styles.paragraph}>
          Scan QR Screen
        </Text>
        <Button 
          large
          backgroundColor="#4796EC"
          color="#ffffff"
          title="Scan QR Code" 
          onPress={() => this.props.navigation.navigate('ViewItem')}
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
