import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Image, Button, Divider, SocialIcon } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";
import t from "tcomb-form-native";
const Form = t.form.Form;
import { LoginStruct, LoginOptions } from "../../forms/Login";
import * as firebase from "firebase";
import { FacebookApi } from "../../utils/Social";
import * as Facebook from "expo-facebook";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginStruct: LoginStruct,
      loginOptions: LoginOptions,
      loginData: {
        email: "",
        password: ""
      },
      loginErrorMessage: ""
    };
  }
  login = () => {
    const validate = this.refs.loginForm.getValue();
    if (!validate) {
      this.setState({
        loginErrorMessage: "Los Datos del Formulario Son Erroneos"
      });
    } else {
      this.setState({ loginErrorMessage: "" });

      firebase
        .auth()
        .signInWithEmailAndPassword(validate.email, validate.password)
        .then(() => {
          this.refs.toastLogin.show("Login Correcto", 200, () => {
            // this.props.navigation.goBack();
            this.props.navigation.navigate("Items");
          });
        })
        .catch(error => {
          this.refs.toastLogin.show("Login Incorrecto", 2000);
          // const errorCode = error.code;
          // if (errorCode === "auth/wrong-password") {
          //   console.log("La contraseña es incorrecta");
          // }
          // if (errorCode == "auth/user-not-found") {
          //   console.log("El usuario no existe");
          // }
        });
    }
  };

  loginFacebook = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      FacebookApi.application_id,
      { permissions: FacebookApi.permissions }
    );
    if (type == "success") {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          this.refs.toastLogin.show("Login Correcto", 100, () => {
            this.props.navigation.goBack();
          });
        })
        .catch(error => {
          this.refs.toastLogin.show("Error al acceder con Facebook", 300);
        });
    } else if (type == "cancel") {
      this.refs.toastLogin.show("Inicio de Sesión cancelado", 300);
    } else {
      this.refs.toastLogin.show(
        "Error desconocido, intentelo de nuevo mas tarde",
        300
      );
    }
  };

  onChangeFormLogin = formValue => {
    this.setState({
      loginData: formValue
    });
  };
  render() {
    const { loginStruct, loginOptions, loginErrorMessage } = this.state;
    return (
      <View style={styles.viewBody}>
        <View style={styles.viewHead}>
          <Image
            source={require("../../../assets/img/futbol.png")}
            style={styles.logo}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode="contain"
          />
        </View>
        <View style={styles.viewForm}>
          <SocialIcon
            title="Iniciar sesión con Facebook"
            button
            type="facebook"
            onPress={() => this.loginFacebook()}
          />
          {/* <Divider style={styles.divider} /> */}
          <Form
            ref="loginForm"
            type={loginStruct}
            options={loginOptions}
            //ayudara a capturar los valores del form
            value={this.state.loginData}
            //cuando cambie el form mandare el valor del fomulario al onChangeFormValue
            onChange={formValue => this.onChangeFormLogin(formValue)}
          />
          <Button
            buttonStyle={styles.buttonLogin}
            onPress={() => this.login()}
            title="Iniciar Sesión"
          />
          <Text style={styles.textRegister}>
            ¿Aún no tienes una cuenta?
            <Text
              style={styles.btnRegister}
              onPress={() => this.props.navigation.navigate("Register")}
            >
              {" "}
              Regístrate
            </Text>
          </Text>
          <Text style={styles.loginErrorMessage}>{loginErrorMessage}</Text>
        </View>
        <Toast
          ref="toastLogin"
          position="bottom"
          positionValue={250}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewHead: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12
  },
  viewBody: {
    backgroundColor: "#003B94",
    flex: 1
  },

  logo: {
    width: 135,
    height: 135
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10
  },
  buttonLogin: {
    backgroundColor: "#00a680",
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 13,
    paddingBottom: 13,
    borderRadius: 50
  },
  loginErrorMessage: {
    color: "#f00",
    textAlign: "center",
    marginTop: 5
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    color: "#fff"
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold"
  }
  // divider: {
  //   backgroundColor: "#00a680",
  //   marginTop: 20
  // }
});
