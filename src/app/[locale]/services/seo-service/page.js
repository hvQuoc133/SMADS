import { getDictionary } from "../../../../lib/dictionaries";
import ServiceSeoContent from "./ServiceSeoContent";
import { client } from "../../../../sanity/lib/client";
import { urlFor } from "../../../../sanity/lib/image";

async function getServiceSeoData(locale) {
    const query = `*[_type == "serviceSeoPage" && language == $lang][0]{
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
        const title = data?.seo?.metaTitle || data?.pageTitle || "Dịch vụ SEO Tổng thể - Đưa Website Lên TOP Google";
        const description = data?.seo?.metaDescription || "Smads cung cấp giải pháp SEO chuyên sâu, tối ưu toàn diện từ Onpage, Offpage đến Technical SEO";
        const keywords = data?.seo?.keywords;

        // OG IMAGE
        const ogImage = data?.seo?.ogImage?._ref
            ? urlFor(data.seo.ogImage).width(1200).height(630).url()
            : '/images/og-default.jpg';

        const twitterImage = data?.seo?.twitterImage?._ref
            ? urlFor(data.seo.twitterImage).width(1200).height(600).url()
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
                        alt: data?.seo?.ogImage?.alt || 'Dịch vụ SEO SMADS',
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
                    'vi': `${baseUrl}/vi/services/seo`,
                    'en': `${baseUrl}/en/services/seo`,
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
        console.error('Error generating service SEO metadata:', error);
        const baseUrl = 'https://smads.com.vn';
        const url = `${baseUrl}/${locale}/services/seo`;

        return {
            metadataBase: metadataBase,
            title: "Dịch vụ SEO Tổng thể - Đưa Website Lên TOP Google",
            description: "Smads cung cấp giải pháp SEO chuyên sâu, tối ưu toàn diện từ Onpage, Offpage đến Technical SEO",
            openGraph: {
                title: "Dịch vụ SEO Tổng thể - Đưa Website Lên TOP Google",
                description: "Smads cung cấp giải pháp SEO chuyên sâu, tối ưu toàn diện từ Onpage, Offpage đến Technical SEO",
                url: url,
                siteName: 'SMADS',
                type: 'website',
                locale: locale === 'vi' ? 'vi_VN' : 'en_US',
                images: [
                    {
                        url: `${baseUrl}/images/og-default.jpg`,
                        width: 1200,
                        height: 630,
                        alt: 'Dịch vụ SEO SMADS',
                    },
                ],
            },
            alternates: {
                canonical: url,
                languages: {
                    'vi': `${baseUrl}/vi/services/seo`,
                    'en': `${baseUrl}/en/services/seo`,
                },
            },
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