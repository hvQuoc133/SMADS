import { getDictionary } from "../../../lib/dictionaries";
import AboutContent from "./AboutContent";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

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
            
            // FIELD SEO ANALYZER
            focusKeyword,
            focusKeywordEn,
            secondaryKeywords,
            secondaryKeywordsEn,
            ogTitle,
            ogDescription,
            twitterTitle, 
            twitterDescription,
            twitterCardType,
            canonicalUrl,
            metaRobots,
            structuredData,
            seoPriority,
            content,
            contentEn
        },
        seoImages {
            ogImage {
                asset->,
                alt
            },
            twitterImage {
                asset->,
                alt  
            }
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

        // SEO ANALYZER
        const title = locale === 'vi'
            ? data?.seo?.metaTitle || data?.pageTitle
            : data?.seo?.metaTitleEn || data?.pageTitleEn || "About SMADS";

        const description = locale === 'vi'
            ? data?.seo?.metaDescription
            : data?.seo?.metaDescriptionEn || "Learn more about SMADS and our services";

        const keywords = locale === 'vi'
            ? data?.seo?.keywords
            : data?.seo?.keywordsEn;

        // 👇 OG TITLE & DESCRIPTION 
        const ogTitle = locale === 'vi'
            ? data?.seo?.ogTitle || data?.seo?.metaTitle
            : data?.seo?.ogTitle || data?.seo?.metaTitleEn || data?.seo?.metaTitle;

        const ogDescription = locale === 'vi'
            ? data?.seo?.ogDescription || data?.seo?.metaDescription
            : data?.seo?.ogDescription || data?.seo?.metaDescriptionEn || data?.seo?.metaDescription;

        // 👇 TWITTER TITLE & DESCRIPTION 
        const twitterTitle = locale === 'vi'
            ? data?.seo?.twitterTitle || data?.seo?.metaTitle
            : data?.seo?.twitterTitle || data?.seo?.metaTitleEn || data?.seo?.metaTitle;

        const twitterDescription = locale === 'vi'
            ? data?.seo?.twitterDescription || data?.seo?.metaDescription
            : data?.seo?.twitterDescription || data?.seo?.metaDescriptionEn || data?.seo?.metaDescription;

        // Helper function 
        const isValidImage = (img) => img && typeof img === 'object' && img._ref;

        const ogImage = isValidImage(data?.seoImages?.ogImage)
            ? urlFor(data.seoImages.ogImage).width(1200).height(630).url()
            : isValidImage(data?.seo?.ogImage)
                ? urlFor(data.seo.ogImage).width(1200).height(630).url()
                : isValidImage(data?.section1?.image)
                    ? urlFor(data.section1.image).width(1200).height(630).url()
                    : '/images/og-default.jpg';

        const twitterImage = isValidImage(data?.seoImages?.twitterImage)
            ? urlFor(data.seoImages.twitterImage).width(1200).height(600).url()
            : ogImage;

        // 👇 CANONICAL URL 
        const canonicalUrl = data?.seo?.canonicalUrl || `https://smads.com.vn/${locale}/about`;

        // 👇 META ROBOTS 
        const metaRobots = data?.seo?.metaRobots || 'index, follow';

        // 👇 TWITTER CARD TYPE 
        const twitterCardType = data?.seo?.twitterCardType || 'summary_large_image';

        const baseUrl = 'https://smads.com.vn';
        const url = canonicalUrl;

        return {
            metadataBase: new URL('https://smads.com.vn'),
            title: title,
            description: description,
            keywords: keywords,

            // 👇 OPEN GRAPH 
            openGraph: {
                title: ogTitle,
                description: ogDescription,
                url: url,
                siteName: 'SMADS',
                type: 'website',
                locale: locale === 'vi' ? 'vi_VN' : 'en_US',
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt: data?.seoImages?.ogImage?.alt || data?.seo?.ogImage?.alt || data?.section1?.image?.alt || 'About SMADS',
                    },
                ],
            },

            //  TWITTER CARDS 
            twitter: {
                card: twitterCardType,
                title: twitterTitle,
                description: twitterDescription,
                images: [twitterImage],
                creator: data?.seo?.twitterHandle || '@smads',
            },

            // CANONICAL & ALTERNATES 
            alternates: {
                canonical: canonicalUrl,
                languages: {
                    'vi': `https://smads.com.vn/vi/about`,
                    'en': `https://smads.com.vn/en/about`,
                },
            },

            // ROBOTS
            robots: metaRobots,

            // Other meta
            authors: ['SMADS'],
            publisher: 'SMADS',

            // STRUCTURED DATA 
            ...(data?.seo?.structuredData && {
                other: {
                    'script:ld+json': data.seo.structuredData
                }
            })
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