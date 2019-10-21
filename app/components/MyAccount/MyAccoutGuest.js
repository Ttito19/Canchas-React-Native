import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Button, Image } from "react-native-elements";
export default class MyAccountGuest extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { goToScreen } = this.props;
    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/cuenta.jpg")}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <View style={styles.viewText}>
          <Text style={styles.title}>Consulta tu Perfil </Text>
          <Text style={styles.descripcion}>
            Busca y visualiza las mejores canchas de todo Lima de una forma mas
            sencilla, vota cual te ha gustado más y comenta con ha sido tu
            experiencia.
          </Text>
          <Button
            buttonStyle={styles.btnViewProfile}
            title="Ver tu perfil"
            onPress={() => goToScreen("Login")}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#003B94"
  },
  image: {
    height: 150,
    marginBottom: 30
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10
  },
  viewText: {
    alignItems: "center",
    justifyContent: "center"
  },
  descripcion: {
    textAlign: "center",
    marginBottom: 20
  },
  btnViewProfile: {
    backgroundColor: "#00a680",
    paddingRight: 70,
    paddingLeft: 70,
    borderRadius: 50
  }
});
