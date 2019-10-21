import t from "tcomb-form-native";
import textareaTemplate from "./templates/Textarea";
import inputTemplate from "./templates/Input";
export const AddCanchasStruct = t.struct({
  name: t.String,
  city: t.String,
  address: t.String,
  description: t.String
});
export const AddCanchasOptions = {
  fields: {
    name: {
      template: inputTemplate,
      config: {
        placeholder: "Nombre de la Cancha",
        iconType: "material-community",
        iconName: "soccer"
      }
    },
    city: {
      template: inputTemplate,
      config: {
        placeholder: "Ciudad de la Cancha",
        iconType: "material-community",
        iconName: "city"
      }
    },
    address: {
      template: inputTemplate,
      config: {
        placeholder: "Dirección de la Cancha",
        iconType: "material-community",
        iconName: "map-marker"
      }
    },
    description: {
      template: textareaTemplate,
      config: {
        placeholder: "Descripción de la cancha"
      }
    }
  }
};
