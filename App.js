import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import UserNavigator from "./app/navigations/User";
import { firebaseApp } from "./app/utils/FireBase";
import { Header } from "react-native-elements";
export default class App extends Component {
  render() {
    return <UserNavigator />;
  }
}
