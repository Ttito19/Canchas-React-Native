import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import ScreenWrapper from '../shared/ScreenWrapper';

export default class ViewItem extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerMode: 'float',
  //     headerLeft: (
  //         <View 
  //           style={{
  //             paddingLeft: 90,
  //           }}
  //         >
  //           <Icon 
  //             name={navigation.state.isDrawerOpen ? 'close' : 'menu'} 
  //             color="#2F6BAE"
  //             onPress={() => {
  //               navigation.toggleDrawer();
  //             }} 
  //           />
  //         </View>
  //       )
  //   };
  // };
  
  render() {
    return (
      <ScreenWrapper>
        <Text style={styles.paragraph}>
          View Item Screen
        </Text>
        <Button 
          large
          backgroundColor="#4796EC"
          color="#ffffff"
          title="Edit Item" 
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
