import { getDictionary } from "../../../../lib/dictionaries";
import ServiceAdsContent from "./ServiceAdsContent";
import { client } from "../../../../sanity/lib/client";
import { urlFor } from "../../../../sanity/lib/image";

async function getServiceAdsData(locale) {
    const query = `*[_type == "serviceAdsPage" && language == $lang][0]{
        pageTitle,
        language,
        seo {
            metaTitle,
            metaDescription,
            keywords,
            ogImage {
                asset->,
                alt
            },
            twitterImage {
                asset->,
                alt
            },
            twitterHandle,
            canonicalUrl
        },
        hero {
            title1,
            title2,
            description,
            cta,
            viewPricing,
            heroImage {
                asset->,
                alt
            }
        },
        heroMetrics[] {
            value,
            label
        },
        whyUs {
            title
        },
        features[] {
            icon,
            title,
            description
        },
        adTypes {
            title
        },
        adTypesList[] {
            icon,
            name,
            description,
            features
        },
        process {
            title
        },
        steps[] {
            title,
            description
        },
        benefits {
            title
        },
        benefitsList[] {
            icon {
                asset->,
                alt
            },
            title,
            description
        },
        results {
            title,
            beforeLabel,
            afterLabel
        },
        resultsItems[] {
            metric,
            label,
            beforeValue,
            afterValue
        },
        pricing {
            title,
            popularBadge,
            signupButton
        },
        packages[] {
            name,
            price,
            highlight,
            features
        },
        faq {
            title
        },
        faqItems[] {
            question,
            answer
        },
        ctaSection {
            title,
            description,
            button
        }
    }`;

    return await client.fetch(query, { lang: locale });
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const metadataBase = new URL('https://smads.com.vn');

    try {
        const data = await getServiceAdsData(locale);

        if (!data) {
            throw new Error('No service ads data found');
        }

        // SEO TITLE & DESCRIPTION
        const title = data?.seo?.metaTitle || data?.pageTitle || "Dịch vụ Quảng cáo Google Ads - SMADS";
        const description = data?.seo?.metaDescription || "Dịch vụ quảng cáo Google Ads chuyên nghiệp, tối ưu chi phí và tăng doanh thu";
        const keywords = data?.seo?.keywords;

        // OG IMAGE
        const ogImage = data?.seo?.ogImage?._ref
            ? urlFor(data.seo.ogImage).width(1200).height(630).url()
            : data?.hero?.heroImage?._ref
                ? urlFor(data.hero.heroImage).width(1200).height(630).url()
                : '/images/og-default.jpg';

        const twitterImage = data?.seo?.twitterImage?._ref
            ? urlFor(data.seo.twitterImage).width(1200).height(600).url()
            : ogImage;

        const baseUrl = 'https://smads.com.vn';
        const url = `${baseUrl}/${locale}/services/ads`;

        return {
            metadataBase: metadataBase,
            title: title,
            description: description,
            keywords: keywords,

            // OPEN GRAPH
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
                        alt: data?.seo?.ogImage?.alt || data?.hero?.heroImage?.alt || 'Dịch vụ Quảng cáo SMADS',
                    },
                ],
            },

            // TWITTER CARDS
            twitter: {
                card: 'summary_large_image',
                title: title,
                description: description,
                images: [twitterImage],
                creator: data?.seo?.twitterHandle || '@smads',
            },

            // CANONICAL & ALTERNATES
            alternates: {
                canonical: data?.seo?.canonicalUrl || url,
                languages: {
                    'vi': `${baseUrl}/vi/services/ads`,
                    'en': `${baseUrl}/en/services/ads`,
                },
            },

            // ROBOTS
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

            // OTHER META
            authors: ['SMADS'],
            publisher: 'SMADS',
        };
    } catch (error) {
        console.error('Error generating service ads metadata:', error);
        const baseUrl = 'https://smads.com.vn';
        const url = `${baseUrl}/${locale}/services/ads`;

        return {
            metadataBase: metadataBase,
            title: "Dịch vụ Quảng cáo Google Ads - SMADS",
            description: "Dịch vụ quảng cáo Google Ads chuyên nghiệp, tối ưu chi phí và tăng doanh thu",
            openGraph: {
                title: "Dịch vụ Quảng cáo Google Ads - SMADS",
                description: "Dịch vụ quảng cáo Google Ads chuyên nghiệp, tối ưu chi phí và tăng doanh thu",
                url: url,
                siteName: 'SMADS',
                type: 'website',
                locale: locale === 'vi' ? 'vi_VN' : 'en_US',
                images: [
                    {
                        url: `${baseUrl}/images/og-default.jpg`,
                        width: 1200,
                        height: 630,
                        alt: 'Dịch vụ Quảng cáo SMADS',
                    },
                ],
            },
            alternates: {
                canonical: url,
                languages: {
                    'vi': `${baseUrl}/vi/services/ads`,
                    'en': `${baseUrl}/en/services/ads`,
                },
            },
        };
    }
}

export const revalidate = 3600; // 1 hour

export default async function ServiceAdsPage({ params }) {
    const { locale } = await params;
    const [dict, pageData] = await Promise.all([
        getDictionary(locale),
        getServiceAdsData(locale).catch(() => null)
    ]);

    return <ServiceAdsContent pageData={pageData} dict={dict} locale={locale} />;
}