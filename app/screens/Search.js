import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
const db = firebase.firestore(firebaseApp);
import { FireSQL } from "firesql";
const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });
export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      canchas: null
    };
  }
  searchCancha = async value => {
    this.setState({ search: value });
    let resultCanchas = null;
    const canchas = fireSQL.query(`
    SELECT * FROM Canchas WHERE name LIKE '${value}%'
    `);
    await canchas
      .then(response => {
        resultCanchas = response;
      })
      .catch(() => {});
    this.setState({
      canchas: resultCanchas
    });
  };
  renderListCanchas = canchas => {
    if (canchas) {
      return (
        <View>
          {canchas.map((cancha, index) => {
            let canchaClick = {
              item: {
                cancha: null
              }
            };
            canchaClick.item.cancha = cancha;
            return (
              <ListItem
                key={index}
                title={cancha.name}
                leftAvatar={{ source: { uri: cancha.image } }}
                rightIcon={
                  <Icon type="material-community" name="chevron-right" />
                }
                onPress={() => this.clickCancha(canchaClick)}
              />
            );
          })}
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.notFonudText}>Busca tus canchas...</Text>
        </View>
      );
    }
  };
  clickCancha = canchaDep => {
    this.props.navigation.navigate("Cancha", { canchaDep });
  };
  render() {
    const { search, canchas } = this.state;
    return (
      <View style={styles.viewBody}>
        <SearchBar
          placeholder="Buscar Canchas"
          onChangeText={this.searchCancha}
          value={search}
          containerStyle={styles.searchBar}
          lightTheme={true}
        />
        {this.renderListCanchas(canchas)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  searchBar: {
    marginBottom: 20
  },
  notFonudText: {
    textAlign: "center"
  }
});
