import { getDictionary } from "../../lib/dictionaries";
import HomeContent from "./HomeContent";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image"; // THÊM IMPORT NÀY

async function getHomeData(locale) {
  const query = `*[_type == "home" && language == $lang][0]{
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
      canonicalUrl,
      robotsIndex
    },
    hero {
      title1,
      highlight,
      desc,
      readMore,
      image {
        asset->,
        alt
      }
    },
    startup {
      title,
      desc,
      button,
      image {
        asset->,
        alt
      }
    },
    features {
      subtitle,
      title,
      desc,
      items[] {
        title,
        desc,
        icon {
          asset->,
          alt
        }
      }
    },
    stats {
      happyCustomer,
      awardWin,
      projectComplete,
      image {
        asset->,
        alt
      }
    },
    optimization {
      title,
      desc,
      items[] {
        title,
        text,
        icon {
          asset->,
          alt
        }
      },
      clientsSubtitle,
      clientsTitle
    },
    cta {
      title,
      desc,
      button
    }
  }`;

  return await client.fetch(query, { lang: locale });
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const metadataBase = new URL('https://smads.com.vn');

  try {
    const data = await getHomeData(locale);

    if (!data) {
      throw new Error('No home data found');
    }

    // SEO TITLE & DESCRIPTION
    const title = data?.seo?.metaTitle || data?.pageTitle || "SMADS - Home";
    const description = data?.seo?.metaDescription || "Welcome to SMADS";
    const keywords = data?.seo?.keywords;

    // OG IMAGE & TWITTER IMAGE
    const ogImage = data?.seo?.ogImage?._ref
      ? urlFor(data.seo.ogImage).width(1200).height(630).url()
      : data?.hero?.image?._ref
        ? urlFor(data.hero.image).width(1200).height(630).url()
        : '/images/og-default.jpg';

    const twitterImage = data?.seo?.twitterImage?._ref
      ? urlFor(data.seo.twitterImage).width(1200).height(600).url()
      : ogImage;



    const baseUrl = 'https://smads.com.vn';
    const url = `${baseUrl}/${locale}`;

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
            alt: data?.seo?.ogImage?.alt || data?.hero?.image?.alt || 'SMADS Home',
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
          'vi': `${baseUrl}/vi`,
          'en': `${baseUrl}/en`,
        },
      },

      // ROBOTS
      robots: {
        index: data?.seo?.robotsIndex !== false,
        follow: true,
        googleBot: {
          index: data?.seo?.robotsIndex !== false,
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
    console.error('Error generating metadata:', error);
    const baseUrl = 'https://smads.com.vn';

    return {
      metadataBase: metadataBase,
      title: "SMADS - Home",
      description: "Welcome to SMADS",
      openGraph: {
        title: "SMADS - Home",
        description: "Welcome to SMADS",
        url: `${baseUrl}/${locale}`,
        siteName: 'SMADS',
        type: 'website',
        locale: locale === 'vi' ? 'vi_VN' : 'en_US',
        images: [
          {
            url: `${baseUrl}/images/og-default.jpg`,
            width: 1200,
            height: 630,
            alt: 'SMADS Home',
          },
        ],
      },
      alternates: {
        canonical: `${baseUrl}/${locale}`,
        languages: {
          'vi': `${baseUrl}/vi`,
          'en': `${baseUrl}/en`,
        },
      },
    };
  }
}

export const revalidate = 3600; // 1 hour

export default async function Page({ params }) {
  const { locale } = await params;
  const [dict, homeData] = await Promise.all([
    getDictionary(locale),
    getHomeData(locale).catch(() => null)
  ]);

  return <HomeContent homeData={homeData} dict={dict} locale={locale} />;
}