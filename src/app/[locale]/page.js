import { getDictionary } from "../../lib/dictionaries";
import HomeContent from "./HomeContent";
import { client } from "../../sanity/lib/client";

async function getHomeData(locale) {
  const query = `*[_type == "home" && language == $lang][0]{
    pageTitle,
    seo {
      metaTitle,
      metaDescription,
      keywords
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
  try {
    const data = await getHomeData(locale);

    return {
      title: data?.seo?.metaTitle || data?.pageTitle || "SMADS - Home",
      description: data?.seo?.metaDescription || "Welcome to SMADS",
      keywords: data?.seo?.keywords,
      openGraph: {
        title: data?.seo?.metaTitle || data?.pageTitle || "SMADS - Home",
        description: data?.seo?.metaDescription || "Welcome to SMADS",
        type: 'website',
        locale: locale,
      },
    };
  } catch (error) {
    return {
      title: "SMADS - Home",
      description: "Welcome to SMADS"
    };
  }
}

export const revalidate = 3600;

export default async function Page({ params }) {
  const { locale } = await params;
  const [dict, homeData] = await Promise.all([
    getDictionary(locale),
    getHomeData(locale).catch(() => null)
  ]);

  return <HomeContent homeData={homeData} dict={dict} locale={locale} />;
}