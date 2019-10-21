import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { AirbnbRating, Button, Overlay, Text } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";
import t from "tcomb-form-native";
const Form = t.form.Form;
import {
  AddReviewCanchasStruct,
  AddReviewCanchasOptions
} from "../../forms/AddReviewCanchas";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default class AddReviewCancha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  sendReview = () => {
    const ratingValue = this.refs.rating.state.position;
    const user = firebase.auth().currentUser;
    this.setState({ loading: true });
    if (ratingValue == 0) {
      this.refs.toast.show("Tienes que puntuar la cancha", 1500);
      this.setState({ loading: false });
    } else {
      const validate = this.refs.AddReviewCanchaForm.getValue();
      if (!validate) {
        this.refs.toast.show("Completa el formulario", 1500);
        this.setState({ loading: false });
      } else {
        //traer los datos del usuario
        const user = firebase.auth().currentUser;
        //crear objeto
        const data = {
          idUser: user.uid,
          avatarUser: user.photoURL,
          idCancha: this.props.navigation.state.params.id,
          title: validate.title,
          review: validate.review,
          rating: ratingValue,
          createAt: new Date()
        };
        //donde insertar este data
        db.collection("reviews")
          .add(data)
          .then(() => {
            const canchaRef = db
              .collection("Canchas")
              .doc(this.props.navigation.state.params.id);
            canchaRef.get().then(response => {
              // la puntucion a firebase
              const canchaData = response.data();
              const ratingTotal = canchaData.ratingTotal + ratingValue; //ha sido votado por cuantos clientes
              const quantityVoting = canchaData.quantityVoting + 1; //cuanto le pusode estrellas
              const rating = ratingTotal / quantityVoting; // el total de estrellas
              canchaRef
                .update({ rating, ratingTotal, quantityVoting })
                .then(() => {
                  this.setState({ loading: false });
                  this.refs.toast.show(
                    "Comentario enviado correctamente",
                    50,
                    () => {
                      //  antes de ir atras recarga el comentario y las estrellas, el método esta en Cancha
                      this.props.navigation.state.params.loadReview();
                      this.props.navigation.goBack();
                    }
                  );
                });
            });
          })
          .catch(() => {
            this.refs.toast.show(
              "Error al enviar comentario, intentelo mas tarde",
              1500
            );
          });
      }
    }
  };
  render() {
    const { loading } = this.state;
    return (
      <View style={styles.viewBody}>
        <View style={styles.viewRating}>
          <AirbnbRating
            ref="rating"
            count={5}
            reviews={[
              "Pésimo",
              "Deficiente",
              "Normal",
              "Muy Bueno",
              "Execelente"
            ]}
            defaultRating={0}
            size={35}
          />
        </View>
        <View style={styles.formView}>
          <Form
            ref="AddReviewCanchaForm"
            type={AddReviewCanchasStruct}
            options={AddReviewCanchasOptions}
          />
        </View>
        <View styles={styles.sendReview}>
          <Button
            buttonStyle={styles.sendButtonReview}
            onPress={() => this.sendReview()}
            title="Publicar Comentario"
          />
        </View>
        <Overlay
          overlayStyle={styles.overlayLoading}
          isVisible={loading}
          width="auto"
          height="auto"
        >
          <View>
            <Text style={styles.overlayLoadingText}>Enviando Comentario</Text>
            <ActivityIndicator size="large" color="00a680" />
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
  viewRating: {
    // height: 110,
    backgroundColor: "#f2f2f2"
  },
  formView: {
    margin: 10,
    marginTop: 50
  },
  sendReview: {
    flex: 1,
    justifyContent: "flex-end"
  },
  sendButtonReview: {
    backgroundColor: "#00a680",
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 13,
    paddingBottom: 13,
    borderRadius: 50
  },
  overlayLoading: {
    padding: 20
  },
  overlayLoadingText: {
    marginBottom: 20,
    fontSize: 20
  }
});
