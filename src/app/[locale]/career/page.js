import { getDictionary } from "../../../lib/dictionaries";
import Career from "./Career";

export default async function Page({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <Career dict={dict} />;
}
