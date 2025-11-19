import { getDictionary } from "../../../lib/dictionaries";
import CareerContent from "./CareerContent";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

async function getCareerData(locale) {
  const query = `*[_type == "careerPage" && language == $lang][0]{
        pageTitle,
        language,
        // ✅ SEO DATA  ANALYSIS 
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
        // ✅ SEO IMAGES 
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

    // TITLE & DESCRIPTION 
    const title = locale === 'vi'
      ? data?.seo?.metaTitle || data?.pageTitle || "Tuyển dụng - SMADS"
      : data?.seo?.metaTitleEn || data?.pageTitle || "Careers - SMADS";

    const description = locale === 'vi'
      ? data?.seo?.metaDescription || "Cơ hội nghề nghiệp tại SMADS - Tham gia đội ngũ chuyên nghiệp của chúng tôi"
      : data?.seo?.metaDescriptionEn || "Career opportunities at SMADS - Join our professional team";

    const keywords = locale === 'vi'
      ? data?.seo?.keywords
      : data?.seo?.keywordsEn;

    // OG IMAGE SEO IMAGES SECTION
    const ogImage = data?.seoImages?.ogImage?._ref
      ? urlFor(data.seoImages.ogImage).width(1200).height(630).url()
      : '/images/og-default.jpg';

    const twitterImage = data?.seoImages?.twitterImage?._ref
      ? urlFor(data.seoImages.twitterImage).width(1200).height(600).url()
      : ogImage;

    // OG TITLE & DESCRIPTION
    const ogTitle = data?.seo?.ogTitle || title;
    const ogDescription = data?.seo?.ogDescription || description;
    const twitterTitle = data?.seo?.twitterTitle || title;
    const twitterDescription = data?.seo?.twitterDescription || description;

    const baseUrl = 'https://smads.com.vn';
    const url = `${baseUrl}/${locale}/career`;

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
          'vi': `${baseUrl}/vi/career`,
          'en': `${baseUrl}/en/career`,
        },
      },

      // ROBOTS 
      robots: data?.seo?.metaRobots || 'index, follow',

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
      title: locale === 'vi' ? "Tuyển dụng - SMADS" : "Careers - SMADS",
      description: locale === 'vi'
        ? "Cơ hội nghề nghiệp tại SMADS - Tham gia đội ngũ chuyên nghiệp của chúng tôi"
        : "Career opportunities at SMADS - Join our professional team",
      openGraph: {
        title: locale === 'vi' ? "Tuyển dụng - SMADS" : "Careers - SMADS",
        description: locale === 'vi'
          ? "Cơ hội nghề nghiệp tại SMADS - Tham gia đội ngũ chuyên nghiệp của chúng tôi"
          : "Career opportunities at SMADS - Join our professional team",
        url: url,
        siteName: 'SMADS',
        type: 'website',
        locale: locale === 'vi' ? 'vi_VN' : 'en_US',
        images: [
          {
            url: `${baseUrl}/images/og-default.jpg`,
            width: 1200,
            height: 630,
            alt: locale === 'vi' ? 'Tuyển dụng SMADS' : 'Careers SMADS',
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