import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Image } from "react-native-elements";
import ActionButton from "react-native-action-button";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
export default class Canchas extends Component {
  constructor() {
    super();
    this.state = {
      //variables
      login: false,
      canchas: null,
      startCanchas: null,
      limitCanchas: 8,
      isLoading: true
    };
  }
  componentDidMount() {
    this.checkLogin();
    this.loadCanchas();
  }
  //metodos
  checkLogin = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          login: true
        });
      } else {
        this.setState({
          login: false
        });
      }
    });
  };

  loadActionButton = () => {
    const { login } = this.state;
    if (login) {
      return (
        <ActionButton
          buttonColor="#0078AA"
          onPress={() =>
            this.props.navigation.navigate("AddDatosCanchasScreen", {
              loadCanchas: this.loadCanchas
            })
          }
        />
      );
    }
    return null;
  };
  loadCanchas = async () => {
    const { limitCanchas } = this.state;
    let resultCanchas = [];
    const canchas = db
      .collection("Canchas")
      .orderBy("createAt", "desc")
      .limit(limitCanchas);
    await canchas.get().then(response => {
      this.setState({
        startCanchas: response.docs[response.docs.length - 1]
      });
      response.forEach(doc => {
        let cancha = doc.data();
        cancha.id = doc.id;
        resultCanchas.push({ cancha });
      });
      this.setState({
        canchas: resultCanchas
      });
    });
  };

  handleLoadMore = async () => {
    const { limitCanchas, startCanchas } = this.state;
    let resultCanchas = [];
    this.state.canchas.forEach(doc => {
      resultCanchas.push(doc);
    });
    const canchasDb = db
      .collection("Canchas")
      .orderBy("createAt", "desc")
      .startAfter(startCanchas.data().createAt)
      .limit(limitCanchas);
    await canchasDb.get().then(response => {
      if (response.docs.length > 0) {
        this.setState({
          startCanchas: response.docs[response.docs.length - 1]
        });
      } else {
        this.setState({
          isLoading: false
        });
      }
      response.forEach(doc => {
        let cancha = doc.data();
        cancha.id = doc.id;
        resultCanchas.push({ cancha });
      });
      this.setState({
        canchas: resultCanchas
      });
    });
  };
  renderRow = cancha => {
    const { name, city, address, description, image } = cancha.item.cancha;
    return (
      <TouchableOpacity onPress={() => this.clickCancha(cancha)}>
        <View style={styles.viewCanchas}>
          <View style={styles.viewCanchasImage}>
            <Image
              resizeMode="cover"
              source={{ uri: image }}
              style={styles.imageCanchas}
            />
          </View>
          <View>
            <Text style={styles.flatListName}>{name}</Text>
            <Text style={styles.flatListAddress}>
              {city}, {address}
            </Text>
            <Text style={styles.flatDescription}>
              {description.substr(0, 60)}...
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderFooter = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.loaderCanchas}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.loaderNotCanchas}>
          <Text>No quedan Canchas por cargar</Text>
        </View>
      );
    }
  };

  renderFlatList = canchas => {
    if (canchas) {
      return (
        <FlatList
          data={this.state.canchas}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          ListFooterComponent={this.renderFooter}
        />
      );
    } else {
      return (
        <View style={styles.startLoadCanchas}>
          <ActivityIndicator size="large" />
          <Text>Cargando las Canchas</Text>
        </View>
      );
    }
  };
  clickCancha = canchaDep => {
    this.props.navigation.navigate("Cancha", { canchaDep });
  };
  render() {
    const { canchas } = this.state;
    return (
      <View style={styles.viewBody}>
        {this.renderFlatList(canchas)}
        {this.loadActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  startLoadCanchas: {
    marginTop: 20,
    alignItems: "center"
  },
  viewCanchas: {
    flexDirection: "row",
    margin: 10
  },
  imageCanchas: {
    width: 120,
    height: 60
  },

  viewCanchasImage: {
    fontWeight: "bold",
    marginRight: 20
  },
  flatListName: {
    fontWeight: "bold"
  },
  flatListAddress: {
    paddingTop: 2,
    color: "grey",
    marginRight: 10
  },
  flatDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300
  },
  loaderCanchas: {
    marginTop: 10,
    marginBottom: 10
  },
  loaderNotCanchas: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center"
  }
});
