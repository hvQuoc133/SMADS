import { getDictionary } from "../../../lib/dictionaries";
import AboutContent from "./AboutContent"; // ← ĐỔI THÀNH AboutContent
import { client } from "../../../sanity/lib/client";

// Hàm fetch data ĐẦY ĐỦ cho component
async function getAboutData(locale) {
    const query = `*[_type == "about" && language == $lang][0]{
        pageTitle,
        seo {
            metaTitle,
            metaDescription,
            keywords
        },
        section1 {
            title,
            p1,
            p2,
            readMore,
            image {
                asset->,
                alt
            }
        },
        section2 {
            title,
            desc,
            list,
            image {
                asset->,
                alt
            }
        }
    }`; // ← THÊM ĐẦY ĐỦ FIELDS

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

export const revalidate = 3600; // 1 hour

export default async function AboutPage({ params }) {
    const { locale } = await params;
    const [dict, aboutData] = await Promise.all([
        getDictionary(locale),
        getAboutData(locale).catch(() => null) // ← THÊM ERROR HANDLING
    ]);

    return <AboutContent aboutData={aboutData} dict={dict} locale={locale} />; // ← ĐỔI THÀNH AboutContent
}