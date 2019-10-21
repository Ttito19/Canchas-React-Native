//importar los componentes de React
import React, { Component } from "react";
//importar componentes de React Native
import { StyleSheet, View, ActivityIndicator } from "react-native";
//importar elementos de React Native
import { Button, Text, Image } from "react-native-elements";
//importar tiempo de duracion de mensaje
import Toast, { DURATION } from "react-native-easy-toast";
//importar el estilo de un  formulario
import t from "tcomb-form-native";
const Form = t.form.Form;
//importar los atributos del imput
import { RegisterStruct, RegisterOptions } from "../../forms/Register";
//import y conectarse con firebase en la nube
import * as firebase from "firebase";
export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      registerStruct: RegisterStruct,
      registerOptions: RegisterOptions,
      //objeto
      formData: {
        name: "",
        email: "",
        // phoneNumber: "",
        password: "",
        passwordConfirmation: ""
      },
      formErrorMessage: ""
    };
  }
  //metodo para registrarse
  register = () => {
    //pasar los states a constantes
    const { password, passwordConfirmation } = this.state.formData;
    // si la contraseña es igual al confirmar contraseña entonces me validara form
    if (password === passwordConfirmation) {
      //me obtiene el formulario validado de email y password
      const validate = this.refs.registerForm.getValue();
      //me valida el form
      if (validate) {
        this.setState({
          //si no hay error entonces retorna vacio
          formErrorMessage: ""
        });
        //validare con la bd de firebase
        firebase
          .auth()
          .createUserWithEmailAndPassword(validate.email, validate.password)
          .then(response => {
            //si el registro fue exitoso mandara un mensaje y desaparecea en 2 ms
            this.refs.toast.show("Registro Correcto", 150, () => {
              this.props.navigation.goBack();
            });
          })
          .catch(error => {
            //si hay email existente entonces saldra un mensaje durante 1 m y medio
            this.refs.toast.show("El email ya esta en uso", 1500);
          });
      } else {
        //valida que el email tenga un @ y que la clave sea mayor a 6
        this.setState({
          formErrorMessage: "Formulario Incorrecto"
        });
      }
    } else {
      //valida que las contraseñas sean igualess
      this.setState({
        formErrorMessage: "Las Contraseñas no son Iguales"
      });
    }
  };
  onChangeFormRegister = formValue => {
    this.setState({
      formData: formValue
    });
  };

  render() {
    const { registerStruct, registerOptions, formErrorMessage } = this.state;
    return (
      <View style={styles.viewBody}>
        {/* <View style={styles.viewHead}>
          <Image
            source={require("../../../assets/img/futbol.png")}
            style={styles.logo}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode="contain"
          />
        </View> */}
        <Form
          ref="registerForm"
          type={registerStruct}
          options={registerOptions}
          value={this.state.formData}
          onChange={formValue => this.onChangeFormRegister(formValue)}
        />
        <Button
          buttonStyle={styles.buttonRegisterContainer}
          title="Unirse"
          onPress={() => this.register()}
        />
        <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
        <Toast
          ref="toast"
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
//estilos al formulario Register
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
    marginLeft: 20,
    marginRight: 20
  },
  buttonRegisterContainer: {
    backgroundColor: "#00a680",
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10
  },
  formErrorMessage: {
    color: "#f00",
    textAlign: "center"
  },
  // viewHead: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 10
  // },
  logo: {
    width: 110,
    height: 110
  }
});
