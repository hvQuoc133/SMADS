import { getDictionary } from "../../../lib/dictionaries";
import ContactContent from "./ContactContent";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

async function getContactData(locale) {
  const query = `*[_type == "contactPage" && language == $lang][0]{
        pageTitle,
        language,
        // SEO DATA FROM SEO ANALYSIS
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

    // GET TITLE & DESCRIPTION
    const title = locale === 'vi'
      ? data?.seo?.metaTitle || data?.pageTitle || "Liên hệ - SMADS"
      : data?.seo?.metaTitleEn || data?.pageTitle || "Contact - SMADS";

    const description = locale === 'vi'
      ? data?.seo?.metaDescription || "Liên hệ với SMADS để được tư vấn và hỗ trợ"
      : data?.seo?.metaDescriptionEn || "Contact SMADS for consultation and support";

    const keywords = locale === 'vi'
      ? data?.seo?.keywords
      : data?.seo?.keywordsEn;

    // ✅ OG IMAGE SEO IMAGES SECTION
    const ogImage = data?.seoImages?.ogImage?._ref
      ? urlFor(data.seoImages.ogImage).width(1200).height(630).url()
      : '/images/og-default.jpg';

    const twitterImage = data?.seoImages?.twitterImage?._ref
      ? urlFor(data.seoImages.twitterImage).width(1200).height(600).url()
      : ogImage;

    // ✅ OG TITLE & DESCRIPTION
    const ogTitle = data?.seo?.ogTitle || title;
    const ogDescription = data?.seo?.ogDescription || description;
    const twitterTitle = data?.seo?.twitterTitle || title;
    const twitterDescription = data?.seo?.twitterDescription || description;

    const baseUrl = 'https://smads.com.vn';
    const url = `${baseUrl}/${locale}/contact`;

    return {
      metadataBase: metadataBase,
      title: title,
      description: description,
      keywords: keywords,

      // OPEN GRAPH
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
            alt: data?.seoImages?.ogImage?.alt || title,
          },
        ],
      },

      // TWITTER CARDS
      twitter: {
        card: data?.seo?.twitterCardType || 'summary_large_image',
        title: twitterTitle,
        description: twitterDescription,
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
      robots: data?.seo?.metaRobots || 'index, follow',

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
      title: locale === 'vi' ? "Liên hệ - SMADS" : "Contact - SMADS",
      description: locale === 'vi'
        ? "Liên hệ với SMADS để được tư vấn và hỗ trợ"
        : "Contact SMADS for consultation and support",
      openGraph: {
        title: locale === 'vi' ? "Liên hệ - SMADS" : "Contact - SMADS",
        description: locale === 'vi'
          ? "Liên hệ với SMADS để được tư vấn và hỗ trợ"
          : "Contact SMADS for consultation and support",
        url: url,
        siteName: 'SMADS',
        type: 'website',
        locale: locale === 'vi' ? 'vi_VN' : 'en_US',
        images: [
          {
            url: `${baseUrl}/images/og-default.jpg`,
            width: 1200,
            height: 630,
            alt: locale === 'vi' ? 'Liên hệ SMADS' : 'Contact SMADS',
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