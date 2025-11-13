import { getDictionary } from "../../../lib/dictionaries";
import AboutContent from "./AboutContent";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

// Hàm fetch data ĐẦY ĐỦ cho component
async function getAboutData(locale) {
    const query = `*[_type == "about"][0]{
        pageTitle,
        pageTitleEn,
        seo {
            metaTitle,
            metaTitleEn,
            metaDescription,
            metaDescriptionEn,
            keywords,
            keywordsEn,
            ogImage {
                asset->,
                alt
            },
            twitterHandle
        },
        section1 {
            title,
            titleEn,
            p1,
            p1En,
            p2,
            p2En,
            readMore,
            readMoreEn,
            image {
                asset->,
                alt
            }
        },
        section2 {
            title,
            titleEn,
            desc,
            descEn,
            list,
            listEn,
            image {
                asset->,
                alt
            }
        }
    }`;

    return await client.fetch(query);
}

// Generate SEO metadata
export async function generateMetadata({ params }) {
    const { locale } = await params;

    try {
        const data = await getAboutData(locale);

        if (!data) {
            throw new Error('No about data found');
        }

        // Dùng field theo ngôn ngữ
        const title = locale === 'vi'
            ? data?.seo?.metaTitle || data?.pageTitle
            : data?.seo?.metaTitleEn || data?.pageTitleEn || "About SMADS";

        const description = locale === 'vi'
            ? data?.seo?.metaDescription
            : data?.seo?.metaDescriptionEn || "Learn more about SMADS and our services";

        const keywords = locale === 'vi'
            ? data?.seo?.keywords
            : data?.seo?.keywordsEn;

        // OG Image từ SEO section (ưu tiên) hoặc section1
        const ogImage = data?.seo?.ogImage
            ? urlFor(data.seo.ogImage).width(1200).height(630).url()
            : data?.section1?.image
                ? urlFor(data.section1.image).width(1200).height(630).url()
                : '/images/og-default.jpg';

        const baseUrl = 'https://smads.com.vn';
        const url = `${baseUrl}/${locale}/about`;

        return {
            metadataBase: new URL('https://smads.com.vn'),
            title: title,
            description: description,
            keywords: keywords,

            // Open Graph
            openGraph: {
                title: title,
                description: description,
                url: url,
                siteName: 'SMADS',
                type: 'website',
                locale: locale === 'vi' ? 'vi_VN' : 'en_US',
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt: data?.seo?.ogImage?.alt || data?.section1?.image?.alt || 'About SMADS',
                    },
                ],
            },

            // Twitter Cards
            twitter: {
                card: 'summary_large_image',
                title: title,
                description: description,
                images: [ogImage],
                creator: data?.seo?.twitterHandle || '@smads',
            },

            // Canonical & Alternates
            alternates: {
                canonical: url,
                languages: {
                    'vi': `${baseUrl}/vi/about`,
                    'en': `${baseUrl}/en/about`,
                },
            },

            // Robots
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },

            // Other meta
            authors: ['SMADS'],
            publisher: 'SMADS',
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        const baseUrl = 'https://smads.com.vn';
        const url = `${baseUrl}/${locale}/about`;

        return {
            metadataBase: new URL('https://smads.com.vn'),
            title: "About SMADS",
            description: "Learn more about SMADS and our services",
            openGraph: {
                title: "About SMADS",
                description: "Learn more about SMADS and our services",
                url: url,
                siteName: 'SMADS',
                type: 'website',
                locale: locale === 'vi' ? 'vi_VN' : 'en_US',
                images: [
                    {
                        url: `${baseUrl}/images/og-default.jpg`,
                        width: 1200,
                        height: 630,
                        alt: 'About SMADS',
                    },
                ],
            },
            alternates: {
                canonical: url,
                languages: {
                    'vi': `${baseUrl}/vi/about`,
                    'en': `${baseUrl}/en/about`,
                },
            },
        };
    }
}

export const revalidate = 3600; // 1 hour

export default async function AboutPage({ params }) {
    const { locale } = await params;
    const [dict, aboutData] = await Promise.all([
        getDictionary(locale),
        getAboutData(locale).catch(() => null)
    ]);

    return <AboutContent aboutData={aboutData} dict={dict} locale={locale} />;
}