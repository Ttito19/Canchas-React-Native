import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import ScreenWrapper from '../shared/ScreenWrapper';

export default class Camera extends Component {
  // TODO: Pass parameters to AddEditItem so the correct item is shown
  render() {
    return (
      <ScreenWrapper>
        <Text style={styles.paragraph}>
          Camera Screen
        </Text>
        <Button 
          large
          backgroundColor="#4796EC"
          color="#ffffff"
          title="Take Photo" 
          onPress={() => this.props.navigation.navigate('AddEditItem')}
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