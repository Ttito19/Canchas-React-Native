import t from "tcomb-form-native";
import formValidation from "../utils/Validation";
import inputTemplate from "./templates/Input";
export const RegisterStruct = t.struct({
  name: t.String,
  email: formValidation.email,
  //phoneNumber: t.String,
  password: formValidation.password,
  passwordConfirmation: formValidation.password
});

export const RegisterOptions = {
  fields: {
    name: {
      template: inputTemplate,
      config: {
        placeholder: "Escribe Tus Nombres y Apellidos",
        iconType: "material-community",
        iconName: "account-outline"
      }
    },
    email: {
      template: inputTemplate,
      config: {
        placeholder: "Escribe Tu Email",
        iconType: "material-community",
        iconName: "at"
      }
    },

    // phoneNumber: {
    //   template: inputTemplate,
    //   config: {
    //     placeholder: "Escribe Tu celular",
    //     iconType: "material-community",
    //     iconName: "cellphone"
    //   }
    // },
    password: {
      template: inputTemplate,
      config: {
        placeholder: "Escribe Tu Contraseña",
        password: true,
        secureTextEntry: true,
        iconType: "material-community",
        iconName: "lock-outline"
      }
    },

    passwordConfirmation: {
      template: inputTemplate,
      config: {
        placeholder: "Repite Tu Contraseña",
        password: true,
        secureTextEntry: true,
        iconType: "material-community",
        iconName: "lock-reset"
      }
    }
  }
};
