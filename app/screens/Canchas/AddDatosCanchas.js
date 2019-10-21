import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import {
  Icon,
  Image,
  Button,
  Text,
  ListItem,
  Overlay
} from "react-native-elements";
import t from "tcomb-form-native";
const Form = t.form.Form;
import Toast, { DURATION } from "react-native-easy-toast";
import {
  AddDatosCanchaOptions,
  AddDatosCanchaStruct
} from "../../forms/AddDatosCanchas";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
import MultiSelect from "react-native-multiple-select";
const db = firebase.firestore(firebaseApp);
const items = [
  {
    id: "1 ",
    name: "Lunes "
  },
  {
    id: "2 ",
    name: "Martes "
  },
  {
    id: "3 ",
    name: "Miercoles "
  },
  {
    id: "4 ",
    name: "Jueves "
  },
  {
    id: "5 ",
    name: "Viernes "
  },
  {
    id: "6 ",
    name: "Sábado "
  },
  {
    id: "7 ",
    name: "Domingo "
  }
];
export default class addDatosCanchas extends Component {
  //crear metodo para redirigir al otro layout con campos

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      date: new Date(),
      selectedItems: [],
      formData: {
        cantidad: "",
        dimensión: "",
        turno: "",
        //  dias: "",
        precio: "",
        selectedItems: ""
      }
    };
  }
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    //console.log(selectedItems)
  };

  addDatosCanchas = () => {
    const { cantidad, dimensión, turno, precio } = this.state.formData;
    const { selectedItems } = this.state.selectedItems;

    if (cantidad && dimensión && turno && precio && this.state.selectedItems.length > 0) {

      this.props.navigation.navigate("AddCanchas", {
        val: this.state.formData,
        loadCanchas: this.loadCanchas,
        item: this.state.selectedItems
      });


    } else {
      this.refs.toast.show("Tienes que rellenar todos los campos");
    }


  };

  onChangeFormAddresCanchas = formValue => {
    this.setState({
      formData: formValue
    });
  };
  render() {
    const { selectedItems } = this.state;
    const { loading } = this.state;
    return (
      <View >
        <View style={{ marginRight: 20, marginLeft: 20 }}>
          <MultiSelect
            // hideTags
            items={items}
            uniqueKey="name"
            ref={component => {
              this.multiSelect = component;
            }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText=" Seleccionar Dias"
            // searchInputPlaceholderText="Search Items..."
            onChangeInput={text => console.log(text)}
            // tagRemoveIconColor="#CCC"
            // tagBorderColor="#CCC"
            // tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#00a680"
            itemTextColor="#000"
            displayKey="name"
            // searchInputStyle={{ color: "#CCC", }}
            submitButtonColor="#00a680"
            submitButtonText="Seleccionar"
          />
        </View>
        <Form
          ref="adDatosCanchasForm"
          type={AddDatosCanchaStruct}
          options={AddDatosCanchaOptions}
          value={this.state.formData}
          onChange={formValue => this.onChangeFormAddresCanchas(formValue)}
        />
        <ListItem
          rightIcon={
            <Image
              source={require("../../../assets/img/chevron-right.png")}
              style={{ width: 30, height: 30 }}
            />
          }
          onPress={() => this.addDatosCanchas()}
        />
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
  overlayLoadinText: {
    //  color: "#00a680",
    marginBottom: 20,
    fontSize: 20
  },
  btnStyle: {
    backgroundColor: "#00a680",
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 13,
    paddingBottom: 13,
    borderRadius: 50
  }
});
