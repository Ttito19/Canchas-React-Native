import t from "tcomb-form-native";
import inputTemplate from "./templates/Input";
export const AddDatosCanchaStruct = t.struct({
  cantidad: t.String,
  dimensión: t.String,
  turno: t.String,
  // dias: t.String,
  precio: t.String
});
export const AddDatosCanchaOptions = {
  fields: {
    cantidad: {
      template: inputTemplate,
      config: {
        placeholder: "Cantidad de Canchas",
        iconType: "material-community",
        iconName: "soccer"
      }
    },
    dimensión: {
      template: inputTemplate,
      config: {
        placeholder: "Dimensión de la Cancha",
        iconType: "material-community",
        iconName: "city"
      }
    },
    // dias: {
    //   template: inputTemplate,
    //   config: {
    //     placeholder: "Agregar Dias",
    //     iconType: "material-community",
    //     iconName: "map-marker"
    //   }
    // },
    turno: {
      template: inputTemplate,
      config: {
        placeholder: "Turno",
        iconType: "material-community",
        iconName: "map-marker"
      }
    },
    precio: {
      template: inputTemplate,
      config: {
        placeholder: "Precio por hora",
        iconType: "material-community",
        iconName: "cash"
      }
    }
  }
};
