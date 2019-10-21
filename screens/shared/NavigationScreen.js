import React, { Component, createContext } from 'react';
import ScreenWrapper from './ScreenWrapper';

export const NavigationContext = createContext();

const NavigationContextScreen = (props) => (
  <NavigationContext.Provider value={props.navigation}>
    {props.children}
  </NavigationContext.Provider>
);

export default class NavigationScreen extends Component {
  render() {
    return (
      <ScreenWrapper>
        <NavigationContextScreen>
          {this.props.children}
        </NavigationContextScreen>
      </ScreenWrapper>
    );
  }
}