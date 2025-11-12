import { getDictionary } from "../../../lib/dictionaries";
import About from "./About";
import { client } from "../../../sanity/lib/client";

// Func fetch data metadata
async function getAboutData(locale) {
    const query = `*[_type == "about" && language == $lang][0]{
    pageTitle,
    seo {
      metaTitle,
      metaDescription,
      keywords
    }
  }`;

    return await client.fetch(query, { lang: locale });
}

// Generate SEO metadata
export async function generateMetadata({ params }) {
    const { locale } = await params;

    try {
        const data = await getAboutData(locale);

        return {
            title: data?.seo?.metaTitle || data?.pageTitle || "About SMADS",
            description: data?.seo?.metaDescription || "Learn more about SMADS and our services",
            keywords: data?.seo?.keywords || "SMADS, about, company",
            openGraph: {
                title: data?.seo?.metaTitle || data?.pageTitle || "About SMADS",
                description: data?.seo?.metaDescription || "Learn more about SMADS and our services",
                type: 'website',
                locale: locale,
            },
        };
    } catch (error) {
        return {
            title: "About SMADS",
            description: "Learn more about SMADS and our services"
        };
    }
}

// Add revalidation  ISR
export const revalidate = 3600; // 1 hour

export const dynamic = 'force-dynamic';

export default async function AboutPage({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return <About dict={dict} />;
}