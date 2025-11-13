import { getDictionary } from "../../../lib/dictionaries";
import ActivitiesContent from "./ActivitiesContent";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

async function getActivitiesPageData() {
  const query = `*[_type == "activitiesPage"][0]{
    pageTitle,
    pageTitleEn,
    seo {
      metaTitle,
      metaTitleEn,
      metaDescription,
      metaDescriptionEn,
      keywords,
      keywordsEn,
      ogImage {           
        asset->,
        alt
      },
      twitterHandle     
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
    title,
    titleEn,
    description,
    descriptionEn,
    slugVi,
    slugEn,
    image {
      asset->,
      alt
    }
  }`;

  return await client.fetch(query);
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const metadataBase = new URL('https://smads.com.vn');
  try {
    const data = await getActivitiesPageData();

    const metaTitle = locale === 'vi'
      ? data?.seo?.metaTitle || data?.pageTitle
      : data?.seo?.metaTitleEn || data?.pageTitleEn || "Activities - SMADS";

    const metaDescription = locale === 'vi'
      ? data?.seo?.metaDescription
      : data?.seo?.metaDescriptionEn || "Our activities and projects";

    const keywords = locale === 'vi'
      ? data?.seo?.keywords
      : data?.seo?.keywordsEn;

    // Get url sanity
    const ogImage = data?.seo?.ogImage
      ? urlFor(data.seo.ogImage).width(1200).height(630).url()
      : '/images/og-default.jpg';

    const baseUrl = 'https://smads.com.vn';
    const url = `${baseUrl}/${locale}/activities`;

    return {
      metadataBase: metadataBase,
      title: metaTitle,
      description: metaDescription,
      keywords: keywords,

      // Open Graph
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: url,
        siteName: 'SMADS',
        type: 'website',
        locale: locale === 'vi' ? 'vi_VN' : 'en_US',
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: data?.seo?.ogImage?.alt || 'SMADS Activities',
          },
        ],
      },

      // Twitter Cards
      twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: metaDescription,
        images: [ogImage],
        creator: data?.seo?.twitterHandle || '@smads',
      },

      // Canonical & Alternates
      alternates: {
        canonical: url,
        languages: {
          'vi': `${baseUrl}/vi/activities`,
          'en': `${baseUrl}/en/activities`,
        },
      },

      // Robots
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
    };
  } catch (error) {
    const baseUrl = 'https://smads.com.vn';
    return {
      metadataBase: new URL('https://smads.com.vn'),
      title: "Activities - SMADS",
      description: "Our activities and projects",
      openGraph: {
        title: "Activities - SMADS",
        description: "Our activities and projects",
        url: `${baseUrl}/${locale}/activities`,
        siteName: 'SMADS',
        type: 'website',
        locale: locale === 'vi' ? 'vi_VN' : 'en_US',
        images: [
          {
            url: `${baseUrl}/images/og-default.jpg`,
            width: 1200,
            height: 630,
            alt: 'SMADS Activities',
          },
        ],
      },
      alternates: {
        canonical: `${baseUrl}/${locale}/activities`,
        languages: {
          'vi': `${baseUrl}/vi/activities`,
          'en': `${baseUrl}/en/activities`,
        },
      },
    };
  }
}

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