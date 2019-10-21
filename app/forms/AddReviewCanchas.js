import t from "tcomb-form-native";
import inputTemplate from "./templates/Input";
import textareaTemplate from "./templates/Textarea";
export const AddReviewCanchasStruct = t.struct({
  title: t.String,
  review: t.String
});
export const AddReviewCanchasOptions = {
  fields: {
    title: {
      template: inputTemplate,
      config: {
        placeholder: "Titulo de la Opinión",
        iconType: "material-community",
        iconName: "pencil-outline"
      }
    },
    review: {
      template: textareaTemplate,
      config: {
        placeholder: "Opinión"
      }
    }
  }
};
