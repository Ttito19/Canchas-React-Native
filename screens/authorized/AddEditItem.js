import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import ScreenWrapper from '../shared/ScreenWrapper';

export default class AddEditItem extends Component {
  // TODO: Make this screen display the correct screen title and button text
  // If this is the edit screen, then the button should take the user to the view item page with the new information in there
  render() {
    return (
      <ScreenWrapper>
        <Text style={styles.paragraph}>
          Add/Edit Item Screen *
        </Text>
        <Button 
          large
          backgroundColor="#4796EC"
          color="#ffffff"
          title="Save Changes" 
          onPress={() => this.props.navigation.navigate('Items')}
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
