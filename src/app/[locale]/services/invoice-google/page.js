import { getDictionary } from "../../../../lib/dictionaries";
import ServiceInvoiceContent from "./ServiceInvoiceContent";
import { client } from "../../../../sanity/lib/client";
import { urlFor } from "../../../../sanity/lib/image";

async function getServiceInvoiceData(locale) {
    const query = `*[_type == "serviceInvoicePage" && language == $lang][0]{
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
        const title = data?.seo?.metaTitle || data?.pageTitle || "Dịch vụ Hóa đơn Điện tử - SMADS";
        const description = data?.seo?.metaDescription || "Dịch vụ hóa đơn điện tử chuyên nghiệp, đáp ứng đầy đủ quy định pháp luật về hóa đơn điện tử";
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
        const url = `${baseUrl}/${locale}/services/invoice`;

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
                        alt: data?.seo?.ogImage?.alt || data?.hero?.heroImage?.alt || 'Dịch vụ Hóa đơn Điện tử SMADS',
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
                    'vi': `${baseUrl}/vi/services/invoice`,
                    'en': `${baseUrl}/en/services/invoice`,
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
        console.error('Error generating service invoice metadata:', error);
        const baseUrl = 'https://smads.com.vn';
        const url = `${baseUrl}/${locale}/services/invoice`;

        return {
            metadataBase: metadataBase,
            title: "Dịch vụ Hóa đơn Điện tử - SMADS",
            description: "Dịch vụ hóa đơn điện tử chuyên nghiệp, đáp ứng đầy đủ quy định pháp luật về hóa đơn điện tử",
            openGraph: {
                title: "Dịch vụ Hóa đơn Điện tử - SMADS",
                description: "Dịch vụ hóa đơn điện tử chuyên nghiệp, đáp ứng đầy đủ quy định pháp luật về hóa đơn điện tử",
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