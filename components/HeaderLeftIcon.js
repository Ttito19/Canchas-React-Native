import React from 'react';
import { Image, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { some as _some, isUndefined as _isUndefined, noop as _noop } from 'lodash';
import { withNavigation } from 'react-navigation';

const ICONS = {
  CLOSE: 'close',
  MENU: 'menu',
  BACK: 'chevron-left',
  TEST: 'account-circle'
}

const getHeaderLeftButtonProperties = (navigation) => {
  //console.log('navigation._childrenNavigation.ItemStack', navigation._childrenNavigation.ItemStack);
  const isOnConsecutiveScreenOfStack = _some(navigation._childrenNavigation, (stack) => {
    //console.log('in loop', _isUndefined(stack.state.index) && stack.state.index !== 0); 
    return !_isUndefined(stack.state.index) && stack.state.index !== 0;
  });

  const isDrawerOpen = navigation.state.isDrawerOpen;

  //console.log('isOnConsecutiveScreenOfStack', isOnConsecutiveScreenOfStack);
  //console.log('Is Drawer Open', isDrawerOpen);

  // If the screen is part of a child stack and it is not the first screen of the stack, the action is to go back to the last screen in the stack
  if (isOnConsecutiveScreenOfStack) {
    console.log(navigation);
    navigation._childrenNavigation.ItemStack.goBack();
    const action = navigation._childrenNavigation.goBack || _noop;
    return {
      icon: ICONS.BACK,
      action
    }
  }

  // If the screen is the first of a stack (or not part of a stack) and the drawer is open, the action is to close the drawer
  if (!isOnConsecutiveScreenOfStack && isDrawerOpen) {
    return {
      icon: ICONS.CLOSE,
      action: navigation.toggleDrawer
    }
  }

  // If the screen is the first of a stack (or not part of a stack) and the drawer is closed, the action is to open the drawer
  if (!isOnConsecutiveScreenOfStack && !isDrawerOpen) {
    if (_isUndefined(navigation._childrenNavigation)) {
      return {
        icon: ICONS.BACK,
        action: _noop
      }
    }
    return {
      icon: ICONS.MENU,
      action: navigation.toggleDrawer
    }
  }
}

const HeaderLeftIcon = ({ navigation }) => {
  //console.log('navigation in HeaderLeftIcon', navigation);
  const headerLeftButtonProperties = getHeaderLeftButtonProperties(navigation);
  console.log(headerLeftButtonProperties.action);
  return (
    <View 
      style={{
        paddingLeft: 10,
      }}
    >
      <Icon 
        name={headerLeftButtonProperties.icon} 
        color="#2F6BAE"
        onPress={() => {
          headerLeftButtonProperties.action();
        }} 
      />
    </View>
  );
};

export default withNavigation(HeaderLeftIcon);