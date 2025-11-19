import { getDictionary } from "../../../lib/dictionaries";
import ActivitiesContent from "./ActivitiesContent";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

async function getActivitiesPageData() {
  const query = `*[_type == "activitiesPage"][0]{
    pageTitle,
    pageTitleEn,
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
      titleEn
    }
  }`;

  return await client.fetch(query);
}

async function getAllActivities() {
  const query = `*[_type == "activity"] | order(publishedAt desc){
    _id,
    title,
    titleEn,
    description,
    descriptionEn,
    slugVi,
    slugEn,
    image {
      asset->,
      alt
    },
    publishedAt,
    category
  }`;

  return await client.fetch(query);
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const metadataBase = new URL('https://smads.com.vn');

  try {
    const data = await getActivitiesPageData();

    if (!data) {
      throw new Error('No activities page data found');
    }

    // TITLE & DESCRIPTION 
    const metaTitle = locale === 'vi'
      ? data?.seo?.metaTitle || data?.pageTitle || "Hoạt động - SMADS"
      : data?.seo?.metaTitleEn || data?.pageTitleEn || "Activities - SMADS";

    const metaDescription = locale === 'vi'
      ? data?.seo?.metaDescription || "Khám phá các hoạt động và dự án của SMADS"
      : data?.seo?.metaDescriptionEn || "Explore SMADS activities and projects";

    const keywords = locale === 'vi'
      ? data?.seo?.keywords
      : data?.seo?.keywordsEn;

    // SEO IMAGES SECTION 
    const ogImage = data?.seoImages?.ogImage?._ref
      ? urlFor(data.seoImages.ogImage).width(1200).height(630).url()
      : '/images/og-default.jpg';

    const twitterImage = data?.seoImages?.twitterImage?._ref
      ? urlFor(data.seoImages.twitterImage).width(1200).height(600).url()
      : ogImage;

    // OG TITLE & DESCRIPTION 
    const ogTitle = data?.seo?.ogTitle || metaTitle;
    const ogDescription = data?.seo?.ogDescription || metaDescription;
    const twitterTitle = data?.seo?.twitterTitle || metaTitle;
    const twitterDescription = data?.seo?.twitterDescription || metaDescription;

    const baseUrl = 'https://smads.com.vn';
    const url = `${baseUrl}/${locale}/activities`;

    return {
      metadataBase: metadataBase,
      title: metaTitle,
      description: metaDescription,
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
            alt: data?.seoImages?.ogImage?.alt || metaTitle,
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
          'vi': `${baseUrl}/vi/activities`,
          'en': `${baseUrl}/en/activities`,
        },
      },

      // ROBOTS
      robots: data?.seo?.metaRobots || 'index, follow',

      // OTHER META
      authors: ['SMADS'],
      publisher: 'SMADS',
    };
  } catch (error) {
    console.error('Error generating activities metadata:', error);
    const baseUrl = 'https://smads.com.vn';
    const url = `${baseUrl}/${locale}/activities`;

    return {
      metadataBase: metadataBase,
      title: locale === 'vi' ? "Hoạt động - SMADS" : "Activities - SMADS",
      description: locale === 'vi'
        ? "Khám phá các hoạt động và dự án của SMADS"
        : "Explore SMADS activities and projects",
      openGraph: {
        title: locale === 'vi' ? "Hoạt động - SMADS" : "Activities - SMADS",
        description: locale === 'vi'
          ? "Khám phá các hoạt động và dự án của SMADS"
          : "Explore SMADS activities and projects",
        url: url,
        siteName: 'SMADS',
        type: 'website',
        locale: locale === 'vi' ? 'vi_VN' : 'en_US',
        images: [
          {
            url: `${baseUrl}/images/og-default.jpg`,
            width: 1200,
            height: 630,
            alt: locale === 'vi' ? 'Hoạt động SMADS' : 'SMADS Activities',
          },
        ],
      },
      alternates: {
        canonical: url,
        languages: {
          'vi': `${baseUrl}/vi/activities`,
          'en': `${baseUrl}/en/activities`,
        },
      },
    };
  }
}

export const revalidate = 3600; // 1 hour

export default async function ActivitiesPage({ params }) {
  const { locale } = await params;
  const [dict, pageData, activitiesData] = await Promise.all([
    getDictionary(locale),
    getActivitiesPageData().catch(() => null),
    getAllActivities().catch(() => [])
  ]);

  return (
    <ActivitiesContent
      pageData={pageData}
      activitiesData={activitiesData}
      dict={dict}
      locale={locale}
    />
  );
}