import { getDictionary } from "../../../../lib/dictionaries";
import ServiceWebDesignContent from "./ServiceWebDesignContent";
import { client } from "../../../../sanity/lib/client";
import { urlFor } from "../../../../sanity/lib/image";

async function getServiceWebDesignData(locale) {
    const query = `*[_type == "serviceWebDesignPage" && language == $lang][0]{
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
        const title = locale === 'vi'
            ? data?.seo?.metaTitle || data?.pageTitle || "Thiết kế Website Chuyên nghiệp - SMADS"
            : data?.seo?.metaTitleEn || data?.pageTitle || "Professional Website Design - SMADS";

        const description = locale === 'vi'
            ? data?.seo?.metaDescription || "Dịch vụ thiết kế website chuyên nghiệp, responsive, chuẩn SEO, tối ưu trải nghiệm người dùng"
            : data?.seo?.metaDescriptionEn || "Professional website design service, responsive, SEO-friendly, optimized user experience";

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
        const url = `${baseUrl}/${locale}/services/web-design`;

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
                        alt: data?.seoImages?.ogImage?.alt || data?.hero?.heroImage?.alt || 'Thiết kế Website SMADS',
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
                    'vi': `${baseUrl}/vi/services/web-design`,
                    'en': `${baseUrl}/en/services/web-design`,
                },
            },

            // ROBOTS 
            robots: data?.seo?.metaRobots || 'index, follow',

            // OTHER META
            authors: ['SMADS'],
            publisher: 'SMADS',
        };
    } catch (error) {
        console.error('Error generating service web design metadata:', error);
        const baseUrl = 'https://smads.com.vn';
        const url = `${baseUrl}/${locale}/services/web-design`;

        const ogImage = `${baseUrl}/images/og-default.jpg`;
        const twitterImage = ogImage;

        return {
            metadataBase: metadataBase,
            title: locale === 'vi' ? "Thiết kế Website Chuyên nghiệp - SMADS" : "Professional Website Design - SMADS",
            description: locale === 'vi'
                ? "Dịch vụ thiết kế website chuyên nghiệp, responsive, chuẩn SEO, tối ưu trải nghiệm người dùng"
                : "Professional website design service, responsive, SEO-friendly, optimized user experience",
            openGraph: {
                title: locale === 'vi' ? "Thiết kế Website Chuyên nghiệp - SMADS" : "Professional Website Design - SMADS",
                description: locale === 'vi'
                    ? "Dịch vụ thiết kế website chuyên nghiệp, responsive, chuẩn SEO, tối ưu trải nghiệm người dùng"
                    : "Professional website design service, responsive, SEO-friendly, optimized user experience",
                url: url,
                siteName: 'SMADS',
                type: 'website',
                locale: locale === 'vi' ? 'vi_VN' : 'en_US',
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt: 'Thiết kế Website SMADS',
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: locale === 'vi' ? "Thiết kế Website Chuyên nghiệp - SMADS" : "Professional Website Design - SMADS",
                description: locale === 'vi'
                    ? "Dịch vụ thiết kế website chuyên nghiệp, responsive, chuẩn SEO, tối ưu trải nghiệm người dùng"
                    : "Professional website design service, responsive, SEO-friendly, optimized user experience",
                images: [twitterImage],
                creator: '@smads',
            },
            alternates: {
                canonical: url,
                languages: {
                    'vi': `${baseUrl}/vi/services/web-design`,
                    'en': `${baseUrl}/en/services/web-design`,
                },
            },
            robots: 'index, follow',
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