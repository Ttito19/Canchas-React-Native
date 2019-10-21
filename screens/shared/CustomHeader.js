import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';

const CustomHeader = () => (
  <View
    style={{
      flexDirection: "row",
      height: 60,
      backgroundColor: 'white',
      color: 'black',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: Platform.OS == "ios" ? 20 : 0, // only for IOS to give StatusBar Space
      justifyContent: 'space-apart',
      alignItems: 'center'
    }}
  >
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text> BACK </Text>
    </TouchableOpacity>
    <Text style={{
      alignSelf: 'flex-start'
    }}> My Header </Text>
  </View>
);