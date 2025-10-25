import vi from "./vi.json";
import en from "./en.json";

export const getDictionary = async (locale) => {
  switch (locale) {
    case "vi":
      return vi;
    case "en":
      return en;
    default:
      return vi;
  }
};
