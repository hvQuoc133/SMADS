import { getDictionary } from "../../../../lib/dictionaries";
import ServiceWebDesignContent from "./ServiceWebDesignContent";
import { client } from "../../../../sanity/lib/client";
import { urlFor } from "../../../../sanity/lib/image";

async function getServiceWebDesignData(locale) {
    const query = `*[_type == "serviceWebDesignPage" && language == $lang][0]{
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
            cta,
            heroImage {
                asset->,
                alt
            }
        },
        heroBenefits[] {
            text
        },
        whyUs {
            title
        },
        features[] {
            title,
            description
        },
        pricing {
            title,
            subtitle,
            popularBadge
        },
        pricingPlans[] {
            name,
            price,
            description,
            features
        },
        process {
            title
        },
        processSteps[] {
            title,
            description
        },
        cta {
            title,
            description,
            ctaButton
        },
        faq {
            title
        },
        faqItems[] {
            question,
            answer
        }
    }`;

    return await client.fetch(query, { lang: locale });
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const metadataBase = new URL('https://smads.com.vn');

    try {
        const data = await getServiceWebDesignData(locale);

        if (!data) {
            throw new Error('No service web design data found');
        }

        // SEO TITLE & DESCRIPTION
        const title = data?.seo?.metaTitle || data?.pageTitle || "Thiết kế Website Chuyên nghiệp - SMADS";
        const description = data?.seo?.metaDescription || "Dịch vụ thiết kế website chuyên nghiệp, responsive, chuẩn SEO, tối ưu trải nghiệm người dùng";
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
        const url = `${baseUrl}/${locale}/services/web-design`;

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
                        alt: data?.seo?.ogImage?.alt || data?.hero?.heroImage?.alt || 'Thiết kế Website SMADS',
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
                    'vi': `${baseUrl}/vi/services/web-design`,
                    'en': `${baseUrl}/en/services/web-design`,
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
        console.error('Error generating service web design metadata:', error);
        const baseUrl = 'https://smads.com.vn';
        const url = `${baseUrl}/${locale}/services/web-design`;

        return {
            metadataBase: metadataBase,
            title: "Thiết kế Website Chuyên nghiệp - SMADS",
            description: "Dịch vụ thiết kế website chuyên nghiệp, responsive, chuẩn SEO, tối ưu trải nghiệm người dùng",
            openGraph: {
                title: "Thiết kế Website Chuyên nghiệp - SMADS",
                description: "Dịch vụ thiết kế website chuyên nghiệp, responsive, chuẩn SEO, tối ưu trải nghiệm người dùng",
                url: url,
                siteName: 'SMADS',
                type: 'website',
                locale: locale === 'vi' ? 'vi_VN' : 'en_US',
                images: [
                    {
                        url: `${baseUrl}/images/og-default.jpg`,
                        width: 1200,
                        height: 630,
                        alt: 'Thiết kế Website SMADS',
                    },
                ],
            },
            alternates: {
                canonical: url,
                languages: {
                    'vi': `${baseUrl}/vi/services/web-design`,
                    'en': `${baseUrl}/en/services/web-design`,
                },
            },
        };
    }
}

export const revalidate = 3600; // 1 hour

export default async function ServiceWebDesignPage({ params }) {
    const { locale } = await params;
    const [dict, pageData] = await Promise.all([
        getDictionary(locale),
        getServiceWebDesignData(locale).catch(() => null)
    ]);

    return <ServiceWebDesignContent pageData={pageData} dict={dict} locale={locale} />;
}