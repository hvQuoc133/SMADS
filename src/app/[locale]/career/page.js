import { getDictionary } from "../../../lib/dictionaries";
import CareerContent from "./CareerContent";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

async function getCareerData(locale) {
  const query = `*[_type == "careerPage" && language == $lang][0]{
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
        intro {
            title,
            description
        },
        positions {
            title
        },
        jobs[] {
            _key,
            title,
            description,
            details {
                jobDescription,
                requirements,
                benefits,
                deadline
            }
        },
        actions {
            viewDetails,
            hideDetails,
            applyNow,
            applyFormTitle,
            submit
        },
        form {
            name,
            email,
            phone,
            cv,
            note,
            notePlaceholder,
            sending
        },
        toast {
            invalidEmail,
            emailNotFound,
            checkFail,
            invalidPhone,
            fileTooLarge,
            success,
            fail,
            sendError
        },
        details {
            desc,
            require,
            benefit,
            deadline
        }
    }`;

  return await client.fetch(query, { lang: locale });
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const metadataBase = new URL('https://smads.com.vn');

  try {
    const data = await getCareerData(locale);

    if (!data) {
      throw new Error('No career data found');
    }

    // SEO TITLE & DESCRIPTION
    const title = data?.seo?.metaTitle || data?.pageTitle || "Tuyển dụng - SMADS";
    const description = data?.seo?.metaDescription || "Cơ hội nghề nghiệp tại SMADS - Tham gia đội ngũ chuyên nghiệp của chúng tôi";
    const keywords = data?.seo?.keywords;

    // OG IMAGE
    const ogImage = data?.seo?.ogImage?._ref
      ? urlFor(data.seo.ogImage).width(1200).height(630).url()
      : '/images/og-default.jpg';

    const twitterImage = data?.seo?.twitterImage?._ref
      ? urlFor(data.seo.twitterImage).width(1200).height(600).url()
      : ogImage;

    const baseUrl = 'https://smads.com.vn';
    const url = `${baseUrl}/${locale}/career`;

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
            alt: data?.seo?.ogImage?.alt || 'Tuyển dụng SMADS',
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
          'vi': `${baseUrl}/vi/career`,
          'en': `${baseUrl}/en/career`,
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
    console.error('Error generating career metadata:', error);
    const baseUrl = 'https://smads.com.vn';
    const url = `${baseUrl}/${locale}/career`;

    return {
      metadataBase: metadataBase,
      title: "Tuyển dụng - SMADS",
      description: "Cơ hội nghề nghiệp tại SMADS - Tham gia đội ngũ chuyên nghiệp của chúng tôi",
      openGraph: {
        title: "Tuyển dụng - SMADS",
        description: "Cơ hội nghề nghiệp tại SMADS - Tham gia đội ngũ chuyên nghiệp của chúng tôi",
        url: url,
        siteName: 'SMADS',
        type: 'website',
        locale: locale === 'vi' ? 'vi_VN' : 'en_US',
        images: [
          {
            url: `${baseUrl}/images/og-default.jpg`,
            width: 1200,
            height: 630,
            alt: 'Tuyển dụng SMADS',
          },
        ],
      },
      alternates: {
        canonical: url,
        languages: {
          'vi': `${baseUrl}/vi/career`,
          'en': `${baseUrl}/en/career`,
        },
      },
    };
  }
}

export const revalidate = 3600; // 1 hour

export default async function CareerPage({ params }) {
  const { locale } = await params;
  const [dict, pageData] = await Promise.all([
    getDictionary(locale),
    getCareerData(locale).catch(() => null)
  ]);

  return <CareerContent pageData={pageData} dict={dict} locale={locale} />;
}