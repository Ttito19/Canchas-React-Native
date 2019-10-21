import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';
const { height, width } = Dimensions.get('window');

const ScreenWrapper = ({ children }) => (
    <View style={styles.container}>
      {children}
    </View>
);

const styles = StyleSheet.create({
  container: {
    height: height,
    //marginTop: Constants.statusBarHeight,
    backgroundColor: '#c8ccce',
    color: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ScreenWrapper;