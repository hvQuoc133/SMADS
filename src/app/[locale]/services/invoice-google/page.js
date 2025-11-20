import { getDictionary } from "../../../../lib/dictionaries";
import ServiceInvoiceContent from "./ServiceInvoiceContent";
import { client } from "../../../../sanity/lib/client";
import { urlFor } from "../../../../sanity/lib/image";

async function getServiceInvoiceData(locale) {
    const query = `*[_type == "serviceInvoicePage" && language == $lang][0]{
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
            button1,
            button2,
            metaStrong,
            metaText,
            heroImage {
                asset->,
                alt
            }
        },
        overview {
            title,
            description
        },
        benefits[] {
            title,
            description
        },
        advantages {
            title,
            description
        },
        advantagesList[] {
            text
        },
        pricing {
            title,
            description,
            noteTitle,
            noteText,
            ctaButton
        },
        feeTiers[] {
            label,
            rate
        }
    }`;

    return await client.fetch(query, { lang: locale });
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const metadataBase = new URL('https://smads.com.vn');

    try {
        const data = await getServiceInvoiceData(locale);

        if (!data) {
            throw new Error('No service invoice data found');
        }

        // SEO TITLE & DESCRIPTION 
        const title = locale === 'vi'
            ? data?.seo?.metaTitle || data?.pageTitle || "Dịch vụ Hóa đơn Điện tử - SMADS"
            : data?.seo?.metaTitleEn || data?.pageTitle || "E-Invoice Service - SMADS";

        const description = locale === 'vi'
            ? data?.seo?.metaDescription || "Dịch vụ hóa đơn điện tử chuyên nghiệp, đáp ứng đầy đủ quy định pháp luật về hóa đơn điện tử"
            : data?.seo?.metaDescriptionEn || "Professional e-invoice service, fully compliant with legal regulations on electronic invoices";

        const keywords = locale === 'vi'
            ? data?.seo?.keywords
            : data?.seo?.keywordsEn;

        // OG IMAGE & TWITTER IMAGE - từ seoImages mới
        const ogImage = data?.seoImages?.ogImage?._ref
            ? urlFor(data.seoImages.ogImage).width(1200).height(630).url()
            : data?.hero?.heroImage?._ref
                ? urlFor(data.hero.heroImage).width(1200).height(630).url()
                : '/images/og-default.jpg';

        const twitterImage = data?.seoImages?.twitterImage?._ref
            ? urlFor(data.seoImages.twitterImage).width(1200).height(600).url()
            : ogImage;

        const baseUrl = 'https://smads.com.vn';
        const url = `${baseUrl}/${locale}/services/invoice`;

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
                        alt: data?.seoImages?.ogImage?.alt || data?.hero?.heroImage?.alt || 'Dịch vụ Hóa đơn Điện tử SMADS',
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
                    'vi': `${baseUrl}/vi/services/invoice`,
                    'en': `${baseUrl}/en/services/invoice`,
                },
            },

            // ROBOTS - metaRobots
            robots: data?.seo?.metaRobots || 'index, follow',

            // OTHER META
            authors: ['SMADS'],
            publisher: 'SMADS',
        };
    } catch (error) {
        console.error('Error generating service invoice metadata:', error);
        const baseUrl = 'https://smads.com.vn';
        const url = `${baseUrl}/${locale}/services/invoice`;

        return {
            metadataBase: metadataBase,
            title: locale === 'vi' ? "Dịch vụ Hóa đơn Điện tử - SMADS" : "E-Invoice Service - SMADS",
            description: locale === 'vi'
                ? "Dịch vụ hóa đơn điện tử chuyên nghiệp, đáp ứng đầy đủ quy định pháp luật về hóa đơn điện tử"
                : "Professional e-invoice service, fully compliant with legal regulations on electronic invoices",
            openGraph: {
                title: locale === 'vi' ? "Dịch vụ Hóa đơn Điện tử - SMADS" : "E-Invoice Service - SMADS",
                description: locale === 'vi'
                    ? "Dịch vụ hóa đơn điện tử chuyên nghiệp, đáp ứng đầy đủ quy định pháp luật về hóa đơn điện tử"
                    : "Professional e-invoice service, fully compliant with legal regulations on electronic invoices",
                url: url,
                siteName: 'SMADS',
                type: 'website',
                locale: locale === 'vi' ? 'vi_VN' : 'en_US',
                images: [
                    {
                        url: `${baseUrl}/images/og-default.jpg`,
                        width: 1200,
                        height: 630,
                        alt: 'Dịch vụ Hóa đơn Điện tử SMADS',
                    },
                ],
            },
            alternates: {
                canonical: url,
                languages: {
                    'vi': `${baseUrl}/vi/services/invoice`,
                    'en': `${baseUrl}/en/services/invoice`,
                },
            },
            robots: 'index, follow',
        };
    }
}

export const revalidate = 3600; // 1 hour

export default async function ServiceInvoicePage({ params }) {
    const { locale } = await params;
    const [dict, pageData] = await Promise.all([
        getDictionary(locale),
        getServiceInvoiceData(locale).catch(() => null)
    ]);

    return <ServiceInvoiceContent pageData={pageData} dict={dict} locale={locale} />;
}