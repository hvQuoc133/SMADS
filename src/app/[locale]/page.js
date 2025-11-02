import HomeHero from "./HomeHero";

export default function Page({ params }) {
  const locale = params?.locale || "vi";
  return <HomeHero locale={locale} />;  
}
