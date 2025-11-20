import { getDictionary } from "../../../../lib/dictionaries";
import ServiceSeoContent from "./ServiceSeoContent";
import { client } from "../../../../sanity/lib/client";
import { urlFor } from "../../../../sanity/lib/image";

async function getServiceSeoData(locale) {
    const query = `*[_type == "serviceSeoPage" && language == $lang][0]{
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
            title,
            description,
            ctaPrimary,
            ctaSecondary
        },
        heroMetrics[] {
            value,
            label
        },
        searchResults[] {
            url,
            title,
            description
        },
        seoServices {
            title
        },
        servicesList[] {
            icon,
            name,
            description,
            features
        },
        seoProcess {
            title
        },
        processSteps[] {
            title,
            description
        },
        seoResults {
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
            contactPrice,
            perMonth
        },
        pricingPlans[] {
            name,
            price,
            popular,
            buttonText,
            features
        },
        faq {
            title
        },
        faqItems[] {
            question,
            answer
        },
        cta {
            title,
            description,
            ctaPrimary
        }
    }`;

    return await client.fetch(query, { lang: locale });
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const metadataBase = new URL('https://smads.com.vn');

    try {
        const data = await getServiceSeoData(locale);

        if (!data) {
            throw new Error('No service SEO data found');
        }

        // SEO TITLE & DESCRIPTION
        const title = locale === 'vi'
            ? data?.seo?.metaTitle || data?.pageTitle || "Dịch vụ SEO Tổng thể - Đưa Website Lên TOP Google"
            : data?.seo?.metaTitleEn || data?.pageTitle || "Comprehensive SEO Service - Rank Website on Google TOP";

        const description = locale === 'vi'
            ? data?.seo?.metaDescription || "Smads cung cấp giải pháp SEO chuyên sâu, tối ưu toàn diện từ Onpage, Offpage đến Technical SEO"
            : data?.seo?.metaDescriptionEn || "Smads provides in-depth SEO solutions, comprehensive optimization from Onpage, Offpage to Technical SEO";

        const keywords = locale === 'vi'
            ? data?.seo?.keywords
            : data?.seo?.keywordsEn;

        // OG IMAGE
        const ogImage = data?.seoImages?.ogImage?._ref
            ? urlFor(data.seoImages.ogImage).width(1200).height(630).url()
            : '/images/og-default.jpg';

        const twitterImage = data?.seoImages?.twitterImage?._ref
            ? urlFor(data.seoImages.twitterImage).width(1200).height(600).url()
            : ogImage;

        const baseUrl = 'https://smads.com.vn';
        const url = `${baseUrl}/${locale}/services/seo`;

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
                        alt: data?.seoImages?.ogImage?.alt || 'Dịch vụ SEO SMADS',
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
                    'vi': `${baseUrl}/vi/services/seo`,
                    'en': `${baseUrl}/en/services/seo`,
                },
            },

            // ROBOTS
            robots: data?.seo?.metaRobots || 'index, follow',

            // OTHER META
            authors: ['SMADS'],
            publisher: 'SMADS',
        };
    } catch (error) {
        console.error('Error generating service SEO metadata:', error);
        const baseUrl = 'https://smads.com.vn';
        const url = `${baseUrl}/${locale}/services/seo`;

        // THÊM KHAI BÁO BIẾN
        const ogImage = `${baseUrl}/images/og-default.jpg`;
        const twitterImage = ogImage;

        return {
            metadataBase: metadataBase,
            title: locale === 'vi' ? "Dịch vụ SEO Tổng thể - Đưa Website Lên TOP Google" : "Comprehensive SEO Service - Rank Website on Google TOP",
            description: locale === 'vi'
                ? "Smads cung cấp giải pháp SEO chuyên sâu, tối ưu toàn diện từ Onpage, Offpage đến Technical SEO"
                : "Smads provides in-depth SEO solutions, comprehensive optimization from Onpage, Offpage to Technical SEO",
            openGraph: {
                title: locale === 'vi' ? "Dịch vụ SEO Tổng thể - Đưa Website Lên TOP Google" : "Comprehensive SEO Service - Rank Website on Google TOP",
                description: locale === 'vi'
                    ? "Smads cung cấp giải pháp SEO chuyên sâu, tối ưu toàn diện từ Onpage, Offpage đến Technical SEO"
                    : "Smads provides in-depth SEO solutions, comprehensive optimization from Onpage, Offpage to Technical SEO",
                url: url,
                siteName: 'SMADS',
                type: 'website',
                locale: locale === 'vi' ? 'vi_VN' : 'en_US',
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt: 'Dịch vụ SEO SMADS',
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: locale === 'vi' ? "Dịch vụ SEO Tổng thể - Đưa Website Lên TOP Google" : "Comprehensive SEO Service - Rank Website on Google TOP",
                description: locale === 'vi'
                    ? "Smads cung cấp giải pháp SEO chuyên sâu, tối ưu toàn diện từ Onpage, Offpage đến Technical SEO"
                    : "Smads provides in-depth SEO solutions, comprehensive optimization from Onpage, Offpage to Technical SEO",
                images: [twitterImage],
                creator: '@smads',
            },
            alternates: {
                canonical: url,
                languages: {
                    'vi': `${baseUrl}/vi/services/seo`,
                    'en': `${baseUrl}/en/services/seo`,
                },
            },
            robots: 'index, follow',
        };
    }
}

export const revalidate = 3600; // 1 hour

export default async function ServiceSeoPage({ params }) {
    const { locale } = await params;
    const [dict, pageData] = await Promise.all([
        getDictionary(locale),
        getServiceSeoData(locale).catch(() => null)
    ]);

    return <ServiceSeoContent pageData={pageData} dict={dict} locale={locale} />;
}