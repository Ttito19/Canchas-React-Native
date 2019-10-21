import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, Image, Button, CheckBox } from "react-native-elements";




export default class ServiciosCanchas extends Component {

  constructor() {
    super();
    this.state = {
      checked: true,
    };

  }

  render() {
    return (
      <View>

        <CheckBox title="Baños"
          iconRight
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon='check'
          checkedColor='red'
          uncheckedColor='green'
          checked={this.state.checked} />
        <CheckBox title="Duchas"
          iconRight
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon='check'
          checkedColor='red'
          uncheckedColor='green'
          checked={this.state.checked}
        />
        <CheckBox title="Kiosco"
          iconRight
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon='check'
          checkedColor='red'
          uncheckedColor='green'
          checked={this.state.checked}
        />
        <CheckBox title="Chalecos"
          iconRight
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon='check'
          checkedColor='red'
          uncheckedColor='green'
          checked={this.state.checked}
        />
        <CheckBox title="Pelotas"
          iconRight
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon='check'
          checkedColor='red'
          uncheckedColor='green'
          checked={this.state.checked} />
        <CheckBox title="Estacionamiento"
          iconRight
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon='check'
          checkedColor='red'
          uncheckedColor='green'
          checked={this.state.checked}
        />
        <CheckBox title="Vestidor"
          iconRight
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon='check'
          checkedColor='red'
          uncheckedColor='green'
          checked={this.state.checked} />
        <CheckBox title="Mayas"
          iconRight
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon='check'
          checkedColor='red'
          uncheckedColor='green'
          checked={this.state.checked} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});
