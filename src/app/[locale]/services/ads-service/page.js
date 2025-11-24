import { getDictionary } from "../../../../lib/dictionaries";
import ServiceAdsContent from "./ServiceAdsContent";
import { client } from "../../../../sanity/lib/client";
import { urlFor } from "../../../../sanity/lib/image";

async function getServiceAdsData(locale) {
    const query = `*[_type == "serviceAdsPage" && language == $lang][0]{
        pageTitle,
        language,
        // SEO ANALYSIS 
        seo {
            metaTitle,
            metaTitleEn,
            metaDescription, 
            metaDescriptionEn,
            keywords,
            keywordsEn,
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
            content,
            contentEn,
            readingTime,
            seoPriority
        },
        // SEO IMAGES 
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
        const title = locale === 'vi'
            ? data?.seo?.metaTitle || data?.pageTitle || "Dịch vụ Quảng cáo Google Ads - SMADS"
            : data?.seo?.metaTitleEn || data?.pageTitle || "Google Ads Advertising Service - SMADS";

        const description = locale === 'vi'
            ? data?.seo?.metaDescription || "Dịch vụ quảng cáo Google Ads chuyên nghiệp, tối ưu chi phí và tăng doanh thu"
            : data?.seo?.metaDescriptionEn || "Professional Google Ads advertising service, cost optimization and revenue growth";

        const keywords = locale === 'vi'
            ? data?.seo?.keywords
            : data?.seo?.keywordsEn;

        // OG IMAGE & TWITTER IMAGE
        const ogImage = data?.seoImages?.ogImage?._ref
            ? urlFor(data.seoImages.ogImage).width(1200).height(630).url()
            : data?.hero?.heroImage?._ref
                ? urlFor(data.hero.heroImage).width(1200).height(630).url()
                : '/images/og-default.jpg';

        const twitterImage = data?.seoImages?.twitterImage?._ref
            ? urlFor(data.seoImages.twitterImage).width(1200).height(600).url()
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
                title: data?.seo?.ogTitle || title,
                description: data?.seo?.ogDescription || description,
                url: url,
                siteName: 'SMADS',
                type: 'website',
                locale: locale === 'vi' ? 'vi_VN' : 'en_US',
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt: data?.seoImages?.ogImage?.alt || data?.hero?.heroImage?.alt || 'Dịch vụ Quảng cáo SMADS',
                    },
                ],
            },

            // TWITTER CARDS
            twitter: {
                card: data?.seo?.twitterCardType || 'summary_large_image',
                title: data?.seo?.twitterTitle || title,
                description: data?.seo?.twitterDescription || description,
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
            robots: data?.seo?.metaRobots || 'index, follow',

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
            title: locale === 'vi' ? "Dịch vụ Quảng cáo Google Ads - SMADS" : "Google Ads Advertising Service - SMADS",
            description: locale === 'vi'
                ? "Dịch vụ quảng cáo Google Ads chuyên nghiệp, tối ưu chi phí và tăng doanh thu"
                : "Professional Google Ads advertising service, cost optimization and revenue growth",
            openGraph: {
                title: locale === 'vi' ? "Dịch vụ Quảng cáo Google Ads - SMADS" : "Google Ads Advertising Service - SMADS",
                description: locale === 'vi'
                    ? "Dịch vụ quảng cáo Google Ads chuyên nghiệp, tối ưu chi phí và tăng doanh thu"
                    : "Professional Google Ads advertising service, cost optimization and revenue growth",
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
            robots: 'index, follow',
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