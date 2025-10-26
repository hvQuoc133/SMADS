import { getDictionary } from "../../../lib/dictionaries";
import Contact from "./Contact";

export default async function ContactPage(props) {
  const { locale } = await props.params;

  // Get data dictionary
  const dict = await getDictionary(locale);

  return <Contact dict={dict} />;
}
