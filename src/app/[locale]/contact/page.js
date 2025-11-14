import { getDictionary } from "../../../lib/dictionaries";
import ContactContent from "./ContactContent";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

async function getContactData(locale) {
  const query = `*[_type == "contactPage" && language == $lang][0]{
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
        contactInfo {
            getInTouch,
            subTitle,
            titleForm,
            description,
            address,
            email,
            phone
        },
        contactForm {
            name,
            email,
            subject,
            message,
            submit,
            sending
        },
        toast {
            fillAll,
            invalidEmail,
            emailNotFound,
            checkFail,
            success,
            fail,
            sendError
        },
        socialLinks {
            facebook,
            twitter,
            instagram,
            telegram
        },
        map {
            embedUrl,
            mapTitle
        }
    }`;

  return await client.fetch(query, { lang: locale });
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const metadataBase = new URL('https://smads.com.vn');

  try {
    const data = await getContactData(locale);

    if (!data) {
      throw new Error('No contact data found');
    }

    // SEO TITLE & DESCRIPTION
    const title = data?.seo?.metaTitle || data?.pageTitle || "Liên hệ - SMADS";
    const description = data?.seo?.metaDescription || "Liên hệ với SMADS để được tư vấn và hỗ trợ";
    const keywords = data?.seo?.keywords;

    // OG IMAGE
    const ogImage = data?.seo?.ogImage?._ref
      ? urlFor(data.seo.ogImage).width(1200).height(630).url()
      : '/images/og-default.jpg';

    const twitterImage = data?.seo?.twitterImage?._ref
      ? urlFor(data.seo.twitterImage).width(1200).height(600).url()
      : ogImage;

    const baseUrl = 'https://smads.com.vn';
    const url = `${baseUrl}/${locale}/contact`;

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
            alt: data?.seo?.ogImage?.alt || 'Liên hệ SMADS',
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
          'vi': `${baseUrl}/vi/contact`,
          'en': `${baseUrl}/en/contact`,
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
    console.error('Error generating contact metadata:', error);
    const baseUrl = 'https://smads.com.vn';
    const url = `${baseUrl}/${locale}/contact`;

    return {
      metadataBase: metadataBase,
      title: "Liên hệ - SMADS",
      description: "Liên hệ với SMADS để được tư vấn và hỗ trợ",
      openGraph: {
        title: "Liên hệ - SMADS",
        description: "Liên hệ với SMADS để được tư vấn và hỗ trợ",
        url: url,
        siteName: 'SMADS',
        type: 'website',
        locale: locale === 'vi' ? 'vi_VN' : 'en_US',
        images: [
          {
            url: `${baseUrl}/images/og-default.jpg`,
            width: 1200,
            height: 630,
            alt: 'Liên hệ SMADS',
          },
        ],
      },
      alternates: {
        canonical: url,
        languages: {
          'vi': `${baseUrl}/vi/contact`,
          'en': `${baseUrl}/en/contact`,
        },
      },
    };
  }
}

export const revalidate = 3600; // 1 hour

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const [dict, pageData] = await Promise.all([
    getDictionary(locale),
    getContactData(locale).catch(() => null)
  ]);

  return <ContactContent pageData={pageData} dict={dict} locale={locale} />;
}