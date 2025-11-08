import HomeHero from "./HomeHero";

export default async function Page({ params }) {
  const { locale } = await params; // ← Thêm await
  return <HomeHero locale={locale} />;
}