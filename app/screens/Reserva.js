import * as React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Header } from "react-native-elements";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: []
    };
  }
  componentDidMount() {
    this.fetchMarkerData();
  }
  fetchMarkerData() {
    fetch("https://feeds.citibikenyc.com/stations/stations.json")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          markers: responseJson.stationBeanList
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        region={{
          // latitude: 40.76727216,
          // longitude: -73.99392888,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
          //coordenadas del lugar
          latitude: -16.39889,
          longitude: -71.535,
          //acercamiento del mapa
          latitudeDelta: 0.05,
          longitudeDelta: 0.02
        }}
      >
        {this.state.isLoading
          ? null
          : this.state.markers.map((marker, index) => {
              const coords = {
                latitude: marker.latitude,
                longitude: marker.longitude
              };

              const metadata = `Status: ${marker.statusValue}`;

              return (
                <MapView.Marker
                  key={index}
                  coordinate={coords}
                  title={marker.stationName}
                  description={metadata}
                />
              );
            })}
      </MapView>
    );
  }
}
export default App;
