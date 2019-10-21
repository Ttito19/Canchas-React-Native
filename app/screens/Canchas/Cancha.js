import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList
} from "react-native";
import {
  Image,
  Icon,
  ListItem,
  Button,
  Text,
  Rating,
  Avatar
} from "react-native-elements";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
import Toast, { DURATION } from "react-native-easy-toast";
const db = firebase.firestore(firebaseApp);
export default class Cancha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
      startReview: null,
      // limitReviews: 5,
      isLoading: true,
      rating: 0
    };
  }
  componentDidMount() {
    this.loadReviews();
  }
  checkUserLogin = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  };
  //enviar comentarios
  checkAddReviewUser = () => {
    const user = firebase.auth().currentUser;
    const idUser = user.uid;
    const idCancha = this.props.navigation.state.params.canchaDep.item.cancha
      .id;
    const reviewRef = db.collection("reviews");
    const queryRef = reviewRef
      .where("idUser", "==", idUser)
      .where("idCancha", "==", idCancha);
    return queryRef.get().then(resolve => {
      const counReview = resolve.size;
      if (counReview > 0) {
        return true;
      } else {
        return false;
      }
    });
  };
  goToScreenAddReview = () => {
    this.checkAddReviewUser().then(resolve => {
      if (resolve) {
        this.refs.toast.show(
          "Ya has hecho un comentario acerca de esta cancha",
          2000
        );
      } else {
        const {
          id,
          name
        } = this.props.navigation.state.params.canchaDep.item.cancha;
        this.props.navigation.navigate("AddReviewCancha", {
          id,
          name,
          //agregado cargar comentarion cuando regrese hacia atras
          loadReview: this.loadReviews
        });
      }
    });
  };
  loadButtonAddReview = () => {
    if (!this.checkUserLogin()) {
      return (
        <Text>
          Debes iniciar sesión, puedes hacerlo{" "}
          <Text
            onPress={() => this.props.navigation.navigate("Login")}
            style={styles.textLinkLogin}
          >
            AQUÍ
          </Text>
        </Text>
      );
    } else {
      return (
        <Button
          title="Escribe una Reseña"
          onPress={() => this.goToScreenAddReview()}
          buttonStyle={styles.btnAddReview}
        />
      );
    }
  };
  loadReviews = async () => {
    const { limitReviews } = this.state;
    const { id } = this.props.navigation.state.params.canchaDep.item.cancha;
    let resultReviews = [];
    let arrayRating = [];
    const reviews = db.collection("reviews").where("idCancha", "==", id);
    //  .limit(limitReviews);
    return await reviews.get().then(response => {
      this.setState({
        startReview: response.docs[response.docs.length - 1]
      });
      response.forEach(doc => {
        let review = doc.data();
        resultReviews.push(review);
        //recorrer la puntuacion
        arrayRating.push(doc.data().rating);
      });
      //calcular cuantas estrellas hay
      let numSum = 0;
      arrayRating.map(value => {
        numSum = numSum + value;
      });
      const countRating = arrayRating.length;
      const resultRating = numSum / countRating;
      const resultRatingFinish = resultRating ? resultRating : 0;
      this.setState({
        reviews: resultReviews,
        rating: resultRatingFinish
      });
    });
  };
  renderFlatList = reviews => {
    if (reviews) {
      return (
        <FlatList
          data={reviews}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0}
        />
      );
    } else {
      return (
        <View style={styles.startLoadReview}>
          <ActivityIndicator size="large" />
          <Text>Cargando Comentarios</Text>
        </View>
      );
    }
  };
  renderRow = reviewData => {
    const {
      title,
      review,
      rating,
      idUser,
      createAt,
      avatarUser
    } = reviewData.item;
    const createReview = new Date(createAt.seconds * 1000);
    const avatar = avatarUser
      ? avatarUser
      : "http://pdg.pe/appelotear/imagen-no.jpg";

    return (
      <View styles={styles.viewReview}>
        <View style={styles.viewImage}>
          <Avatar
            source={{
              uri: avatar
            }}
            size="large"
            rounded
            containerStyle={styles.imageAvatar}
          />
        </View>
        <View style={styles.viewInfo}>
          <Text style={styles.reviewTitle}>{title}</Text>
          <Text style={styles.reviewText}>{review}</Text>
          <Rating
            imageSize={15}
            startingValue={rating}
            readonly
            ratingColor="#3498db"
            ratingBackgroundColor="#c8c7c8"
          />
          <Text style={styles.reviewDate}>
            {createReview.getDate()}/{createReview.getMonth() + 1}/
            {createReview.getFullYear()} - {createReview.getHours()}:
            {createReview.getMinutes()}
          </Text>
        </View>
      </View>
    );
  };
  render() {
    const { reviews, rating } = this.state;
    const {
      id,
      name,
      city,
      address,
      description,
      image,
      datosCancha,
      Combo
    } = this.props.navigation.state.params.canchaDep.item.cancha;
    const listExtraInfo = [
      {
        text: `${city}, ${address}`,
        iconName: "map-marker",
        iconType: "material-community",

        action: null
      }
      // {
      //   text: "999 999 999",
      //   iconName: "phone",
      //   iconType: "material-community",
      //   action: null
      // }
    ];

    return (
      <ScrollView View style={styles.viewBody}>
        <View style={styles.viewImage}>
          <Image
            source={{ uri: image }}
            PlaceholderContent={<ActivityIndicator />}
            style={styles.imageCancha}
          />
        </View>
        <View style={styles.viewCanchaBasic}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.nameCancha}>{name}</Text>

            <Rating
              style={{ position: "absolute", right: 0, marginTop: 5 }}
              imageSize={20}
              readonly
              startingValue={parseFloat(rating)}
              ratingColor="#3498db"
              ratingBackgroundColor="#c8c7c8"
            />
          </View>
          <Text style={styles.DescriptionCancha}>{description}</Text>
          <Text style={styles.Datos}>Canchas: {datosCancha.cantidad}</Text>
          {/* {Combo.map((Comb, i) => {
            return (

              <Text key={i}>Dias:{Comb}</Text>

            )
          })} */}
          <Text style={styles.Datos}>Dias: {Combo}</Text>

          <Text style={styles.Datos}>Dimensión: {datosCancha.dimensión}</Text>
          <Text style={styles.Datos}>Precio: {datosCancha.precio} soles</Text>
          <Text style={styles.Datos}>Turno: {datosCancha.turno}</Text>
        </View>
        <View style={styles.viewCanchaExtraInfo}>
          <Text style={styles.textInfo}>Informacion sobre la Cancha</Text>
          {listExtraInfo.map((item, index) => (
            <ListItem
              key={index}
              title={item.text}
              leftIcon={
                <Icon
                  name={item.iconName}
                  type={item.iconType}
                  color="#003B94"
                />
              }
            />
          ))}
        </View>
        <View style={styles.viewBtnAddReview}>
          {this.loadButtonAddReview()}
        </View>

        <Text style={styles.commentTitle}>Comentarios</Text>

        {this.renderFlatList(reviews)}
        <Toast
          ref="toast"
          position="bottom"
          positionValue={250}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewImage: {
    width: "100%"
  },
  imageCancha: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  viewCanchaBasic: {
    margin: 15
  },
  nameCancha: {
    fontSize: 20,
    fontWeight: "bold"
  },
  DescriptionCancha: {
    fontSize: 17,

    color: "grey"
  },
  viewCanchaExtraInfo: {
    margin: 15,
    marginTop: 20
  },
  textInfo: {
    fontSize: 20,
    fontWeight: "bold"
  },
  viewBtnAddReview: {
    margin: 10
  },
  btnAddReview: {
    backgroundColor: "#00a680",
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 13,
    paddingBottom: 13,
    borderRadius: 50
  },
  textLinkLogin: {
    color: "#00a680",
    fontWeight: "normal"
  },
  startLoadReview: {
    marginTop: 20,
    alignItems: "center"
  },
  commentTitle: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
    fontWeight: "bold"
  },
  viewReview: {
    flexDirection: "row",
    margin: 10,
    paddingBottom: 20,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
    marginLeft: 30
  },
  viewInfo: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 60,
    marginTop: -50,
    marginBottom: 10
  },
  imageAvatar: {
    width: 50,
    height: 50,
    marginLeft: 5
  },

  reviewTitle: {
    fontWeight: "bold"
  },
  reviewText: {
    paddingTop: 2,
    color: "grey"
  },
  reviewDate: {
    top: 5,
    color: "grey",
    fontSize: 12
  },
  Datos: {
    marginTop: 2,
    color: "grey",
    fontSize: 15
  }
});
