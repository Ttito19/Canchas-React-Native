import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import {
  Icon,
  Image,
  Button,
  Text,
  Overlay,
  CheckBox,
  ListItem
} from "react-native-elements";
import t from "tcomb-form-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Toast, { DURATION } from "react-native-easy-toast";
import { uploadImage } from "../../utils/UploadImage";
const Form = t.form.Form;
import { AddCanchasStruct, AddCanchasOptions } from "../../forms/AddCanchas";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
export default class AddCanchas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUriCanchas: "",
      formData: {
        name: "",
        city: "",
        address: "",
        description: ""
      }
    };
  }
  isImageCancha = image => {
    if (image) {
      return (
        <Image source={{ uri: image }} style={{ width: 500, height: 170 }} />
      );
    } else {
      return (
        <Image
          source={require("../../../assets/img/futbol2.jpg")}
          style={{ width: 410, height: 170 }}
        />
      );
    }
  };
  uploadImage = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (resultPermission.status === "denied") {
      this.refs.toast.show(
        "Es necesario aceptar los permisos de la galeria",
        1500
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });
      if (result.cancelled) {
        this.refs.toast.show("Has cerrado la galeria de imagenes", 1500);
      } else {
        this.setState({
          imageUriCanchas: result.uri
        });
      }
    }
  };
  onChangeFormAddresCanchas = formValue => {
    this.setState({
      formData: formValue
    });
  };
  addCanchas = () => {
    const { navigation } = this.props;
    const datosCancha = navigation.getParam("val", "");
    const Combo = navigation.getParam("item", "");
    const { imageUriCanchas } = this.state;
    const { name, city, address, description } = this.state.formData;
    if (imageUriCanchas && name && city && address && description) {
      this.setState({
        loading: true
      });
      db.collection("Canchas")
        .add({
          Combo,
          datosCancha,
          name,
          city,
          address,
          description,
          image: "",
          rating: 0,
          ratingTotal: 0,
          quantityVoting: 0,
          createAt: new Date()
        })
        .then(resolve => {
          const canchaId = resolve.id;
          uploadImage(imageUriCanchas, canchaId, "Canchas")
            .then(resolve => {
              const canchaRef = db.collection("Canchas").doc(canchaId);

              canchaRef
                .update({ image: resolve })
                .then(() => {
                  this.setState({
                    loading: false
                  });
                  this.refs.toast.show(
                    "Cancha creado correctamente",
                    100,
                    () => {
                      //ejecuta el metodo de Canchas
                      this.props.navigation.state.params.loadCanchas();
                      //vuelve atras
                      this.props.navigation.navigate("Canchas");
                      ///this.props.navigation.goBack();
                    }
                  );
                })
                .catch(() => {
                  this.refs.toast.show("Error de servidor intentelo mas tarde");
                  this.setState({
                    loading: false
                  });
                });
            })
            .catch(() => {
              this.refs.toast.show("Error de servidor intentelo mas tarde");
              this.setState({
                loading: false
              });
            });
        })
        .catch(() => {
          this.refs.toast.show("Error de servidor intentelo mas tarde");
          this.setState({
            loading: false
          });
        });
    } else {
      this.refs.toast.show("Tienes que rellenar todos los campos");
    }
  };

  render() {
    const { imageUriCanchas, loading } = this.state;
    return (
      <View style={styles.viewBody}>
        <View style={styles.viewPhoto}>
          {this.isImageCancha(imageUriCanchas)}
        </View>
        <View style={styles.viewIconUpload}>
          <Icon
            name="camera"
            type="material-community"
            color="#7A7A7A"
            iconStyle={styles.addPhotoIcon}
            onPress={() => this.uploadImage()}
          />
        </View>
        <View>
          <Form
            ref="addCanchasForm"
            type={AddCanchasStruct}
            options={AddCanchasOptions}
            value={this.state.formData}
            onChange={formValue => this.onChangeFormAddresCanchas(formValue)}
          />
        </View>

        <View style={styles.viewBtnCanchas}>
          <Button
            buttonStyle={styles.btnStyle}
            title="Crear Cancha"
            onPress={() => this.addCanchas()}
          />
        </View>
        <Overlay
          overlayStyle={styles.overlayLoading}
          isVisible={loading}
          width="auto"
          height="auto"
        >
          <View>
            <Text style={styles.overlayLoadinText}>Creando Cancha</Text>
            <ActivityIndicator size="large" color="#00a680" />
          </View>
        </Overlay>
        <Toast
          ref="toast"
          position="bottom"
          positionValue={320}
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
  viewBody: {
    flex: 1
  },

  viewPhoto: {
    alignItems: "center",
    height: 140
  },
  viewIconUpload: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 12,
    alignItems: "center"
  },
  addPhotoIcon: {
    backgroundColor: "#e3e3e3",
    padding: 15,
    paddingBottom: 13,
    margin: 0,
    marginTop: 2
  },

  viewBtnCanchas: {
    flex: 1,
    justifyContent: "flex-end"
  },
  btnStyle: {
    backgroundColor: "#00a680",
    marginBottom: 10,
    marginRight: 70,
    marginLeft: 70,
    borderRadius: 50
  },
  overlayLoading: {
    padding: 20
  },
  overlayLoadinText: {
    //  color: "#00a680",
    marginBottom: 20,
    fontSize: 20
  }
});
