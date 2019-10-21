import React from "react";
import { View, Text } from "react-native";
import { Icon, Image, Header } from "react-native-elements";
import SvgUri from "expo-svg-uri";
import SafeAreaView from "react-native-safe-area-view";
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
  StackActions,
  NavigationActions
} from "react-navigation";

//Screens
import ReservaScreen from "../screens/Reserva";
import SearchScreen from "../screens/Search";
import ComunidadScreen from "../screens/Comunidad";
///Screens MyAccount
import MyAccountScreen from "../screens/MyAccount/MyAccount";
import RegisterScreen from "../screens/MyAccount/Register";
import LoginScreen from "../screens/MyAccount/Login";
///Screens Canchas
import CanchasScreen from "../screens/Canchas/Canchas";
import addCanchasScreen from "../screens/Canchas/AddCanchas";
import AddDatosCanchasScreen from "../screens/Canchas/AddDatosCanchas";
import ServiciosCanchasScreen from "../screens/Canchas/ServiciosCanchas";
import CanchaScreen from "../screens/Canchas/Cancha";
import AddReviewCanchaScreen from "../screens/Canchas/AddReviewCancha";
import Logo from "../../components/Logo"; // Version can be specified in package.json
//import LoginScreen from "../../screens/unauthorized/Login";
// import SignUpScreen from "../../screens/unauthorized/SignUp";
// import EmailVerifiedScreen from "../../screens/unauthorized/EmailVerified";
// import WalletSecurityScreen from "../../screens/unauthorized/WalletSecurity";
// import PhoneValidationScreen from "../../screens/unauthorized/PhoneValidation";

/*** Authorized Screens ***/
//import CanchasScreen from "../../screens/authorized/Items";
//import addCanchasScreen from "../../screens/authorized/Camera";
//import AddDatosCanchasScreen from "../../screens/authorized/ViewItem";
//import CanchaScreen from "../../screens/authorized/AddEditItem";
//import AddReviewCanchaScreen from "../../screens/authorized/Send";
//import ReservaScreen from "../../screens/authorized/ScanQR";
//import ComunidadScreen from "../../screens/authorized/SendConfirmation";

const OnboardingStack = createStackNavigator(
  {
    Login: { screen: LoginScreen }
    // SignUp: { screen: SignUpScreen },
    // EmailVerified: { screen: EmailVerifiedScreen },
    // WalletSecurity: { screen: WalletSecurityScreen },
    // PhoneValidation: { screen: PhoneValidationScreen }
  },
  {
    headerMode: "none",

    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

/**
 * Item Stack
 * Follows the Items Flow chart
 */
const ItemStack = createStackNavigator(
  {
    Items: { screen: CanchasScreen },
    AddCanchas: { screen: addCanchasScreen },
    AddDatosCanchasScreen: { screen: AddDatosCanchasScreen },
    Cancha: { screen: CanchaScreen },
    AddReviewCancha: { screen: AddReviewCanchaScreen }
  },
  {
    headerMode: "none",

    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

/**
 * Send Stack
 * Follows the Send Flow chart
 */
const SendStack = createStackNavigator(
  {
    Send: { screen: ReservaScreen },
    // ScanQR: { screen: ReservaScreen },
    SendConfirmation: { screen: ComunidadScreen }
  },
  {
    headerMode: "none",

    navigationOptions: {
      gesturesEnabled: false
    }
  }
);
const ComunidadStack = createStackNavigator(
  {
    Comunidad: { screen: ComunidadScreen }
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);
const SearchStack = createStackNavigator(
  {
    Search: { screen: SearchScreen }
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

const MyAccountStack = createStackNavigator(
  {
    MyAccount: { screen: MyAccountScreen }
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);
/**
 * Authorized Drawer
 * Used to set the labels in the drawer and enable drawer
 */
const AuthorizedDrawer = createDrawerNavigator(
  {
    // ScanQR: {
    //   //    screen: ScanQRScreen,
    //   navigationOptions: {
    //     drawerLabel: "Scan"
    //   }
    // },
    ItemStack: {
      screen: ItemStack,
      navigationOptions: {
        drawerLabel: "Inicio"
      }
    },
    SendStack: {
      screen: SendStack,
      navigationOptions: {
        drawerLabel: "Reservas",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="star-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      }
    },
    ComunidadStack: {
      screen: ComunidadStack,
      navigationOptions: {
        drawerLabel: "Comunidad",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="account-multiple"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      }
    },
    SearchStack: {
      screen: SearchStack,
      navigationOptions: {
        drawerLabel: "Buscar",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="magnify"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      }
    },
    MyAccountStack: {
      screen: MyAccountStack,
      navigationOptions: {
        drawerLabel: "Mi Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="home-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    initialRouteName: "ItemStack",
    contentComponent: props => (
      <DrawerItems
        {...{
          ...props,
          onItemPress: routes => {
            console.log("routes", routes);
            const isButtonInCurrentStack = routes.focused;
            const routeName = routes.route.routes
              ? routes.route.routes[0].routeName
              : routes.route.routeName;
            if (isButtonInCurrentStack) {
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName })]
              });
              props.navigation.dispatch(resetAction);
            } else {
              props.navigation.navigate(routeName);
            }
          }
        }}
      />
    )
  }
);

/**
 * Authorized Drawer Stack
 * Put the drawer inside a stack so the header can be added and styled
 */
const AuthorizedDrawerStack = createStackNavigator(
  {
    AuthorizedDrawer: { screen: AuthorizedDrawer }
  },
  {
    headerMode: "float",

    navigationOptions: ({ navigation, screenProps, navigationOptions }) => {
      return {
        headerLeft: (
          <View
            style={{
              paddingLeft: 10
            }}
          >
            <Icon
              type="material-community"
              name={navigation.state.isDrawerOpen ? "close" : "menu"}
              color="#2F6BAE"
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </View>
        ),
        headerTitle: <Logo />
      };
    }
  }
);

/**
 * Root Stack
 * Contains all the stacks so you can link from links within one stack to links in the other stack
 */
const RootStack = createStackNavigator(
  {
    //OnboardingStack: { screen: OnboardingStack },
   // Register: { screen: RegisterScreen },
    AuthorizedStack: { screen: AuthorizedDrawerStack }
  },
  {
    headerMode: "none"
  }
);

export default RootStack;
