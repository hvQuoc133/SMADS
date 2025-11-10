import vi from "./vi.json";
import en from "./en.json";

// Cache object
const dictionaryCache = new Map();

export const getDictionary = async (locale) => {
  // Check cache
  if (dictionaryCache.has(locale)) {
    return dictionaryCache.get(locale);
  }

  let dictionary;
  switch (locale) {
    case "vi":
      dictionary = vi;
      break;
    case "en":
      dictionary = en;
      break;
    default:
      dictionary = vi;
  }

  // Save cache
  dictionaryCache.set(locale, dictionary);
  return dictionary;
};
