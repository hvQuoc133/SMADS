import { getDictionary } from "../../../lib/dictionaries";
import About from "./About";

export default async function AboutPage({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return <About dict={dict} />;
}

