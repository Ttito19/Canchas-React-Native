import React from "react";
import { Image } from "react-native";

const Logo = props => {
  return (
    <Image
      style={{ width: 30, height: 30 }}
      source={require("../assets/images/logo.png")}
    />
  );
};

export default Logo;
