import { getDictionary } from "../../../../lib/dictionaries";
import ActivityDetailContent from "./ActivityDetailContent";
import { client } from "../../../../sanity/lib/client";
import { urlFor } from "../../../../sanity/lib/image";

async function getActivityDetailData(slug) {
  const query = `*[_type == "activity" && (slugVi == $slug || slugEn == $slug)][0]{
    title,
    titleEn,
    description,
    descriptionEn,
    content,
    contentEn,
    slugVi,
    slugEn,
    image {
      asset->,
      alt
    },
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
    publishedAt,
    _updatedAt
  }`;

  const data = await client.fetch(query, { slug });
  return data;
}

async function getRelatedActivities(currentSlug, locale) {
  const query = `*[_type == "activity" && slugVi != $currentSlug && slugEn != $currentSlug] | order(publishedAt desc)[0...3]{
    title,
    titleEn,
    description,
    descriptionEn,
    image {
      asset->,
      alt
    },
    slugVi,
    slugEn
  }`;

  const activities = await client.fetch(query, { currentSlug });

  return activities.map((item, index) => ({
    id: item._id || index + 1,
    title: locale === 'vi' ? item.title : item.titleEn,
    desc: locale === 'vi' ? item.description : item.descriptionEn,
    image: item.image,
    slug: locale === 'vi' ? item.slugVi : item.slugEn,
    alt: item.image?.alt || (locale === 'vi' ? item.title : item.titleEn),
  }));
}

export async function generateStaticParams() {
  const query = `*[_type == "activity"]{
    slugVi,
    slugEn
  }`;

  const activities = await client.fetch(query);

  const params = [];
  activities.forEach(activity => {
    if (activity.slugVi) {
      params.push({ locale: 'vi', slug: activity.slugVi });
    }
    if (activity.slugEn) {
      params.push({ locale: 'en', slug: activity.slugEn });
    }
  });

  return params;
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  try {
    const data = await getActivityDetailData(slug);

    if (!data) {
      throw new Error('Activity not found');
    }

    // TITLE & DESCRIPTION 
    const title = locale === 'vi'
      ? data?.seo?.metaTitle || data?.title || "Chi tiết hoạt động - SMADS"
      : data?.seo?.metaTitleEn || data?.titleEn || "Activity Detail - SMADS";

    const description = locale === 'vi'
      ? data?.seo?.metaDescription || data?.description || "Khám phá chi tiết hoạt động của SMADS"
      : data?.seo?.metaDescriptionEn || data?.descriptionEn || "Explore SMADS activity details";

    const keywords = locale === 'vi'
      ? data?.seo?.keywords
      : data?.seo?.keywordsEn;

    // OG IMAGE SEO IMAGES
    const ogImage = data?.seoImages?.ogImage?._ref
      ? urlFor(data.seoImages.ogImage).width(1200).height(630).url()
      : data?.image?._ref
        ? urlFor(data.image).width(1200).height(630).url()
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
    const currentSlug = locale === 'vi' ? data?.slugVi : data?.slugEn;
    const url = `${baseUrl}/${locale}/activities/${currentSlug || slug}`;

    return {
      metadataBase: new URL('https://smads.com.vn'),
      title: title,
      description: description,
      keywords: keywords,

      // OPEN GRAPH
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: url,
        siteName: 'SMADS',
        type: 'article',
        locale: locale === 'vi' ? 'vi_VN' : 'en_US',
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: data?.seoImages?.ogImage?.alt || data?.image?.alt || title,
          },
        ],
        publishedTime: data?.publishedAt,
        modifiedTime: data?._updatedAt,
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
          'vi': `${baseUrl}/vi/activities/${data?.slugVi || slug}`,
          'en': `${baseUrl}/en/activities/${data?.slugEn || slug}`,
        },
      },

      // ROBOTS
      robots: data?.seo?.metaRobots || 'index, follow',

      // OTHER META
      authors: ['SMADS'],
      publisher: 'SMADS',
    };

  } catch (error) {
    console.error('Error generating activity metadata:', error);
    const baseUrl = 'https://smads.com.vn';
    const url = `${baseUrl}/${locale}/activities/${slug}`;

    return {
      metadataBase: new URL('https://smads.com.vn'),
      title: locale === 'vi' ? "Chi tiết hoạt động - SMADS" : "Activity Detail - SMADS",
      description: locale === 'vi'
        ? "Khám phá chi tiết hoạt động của SMADS"
        : "Explore SMADS activity details",
      openGraph: {
        title: locale === 'vi' ? "Chi tiết hoạt động - SMADS" : "Activity Detail - SMADS",
        description: locale === 'vi'
          ? "Khám phá chi tiết hoạt động của SMADS"
          : "Explore SMADS activity details",
        url: url,
        siteName: 'SMADS',
        type: 'article',
        locale: locale === 'vi' ? 'vi_VN' : 'en_US',
        images: [
          {
            url: `${baseUrl}/images/og-default.jpg`,
            width: 1200,
            height: 630,
            alt: locale === 'vi' ? 'Hoạt động SMADS' : 'SMADS Activity',
          },
        ],
      },
      alternates: {
        canonical: url,
        languages: {
          'vi': `${baseUrl}/vi/activities/${slug}`,
          'en': `${baseUrl}/en/activities/${slug}`,
        },
      },
    };
  }
}

export default async function ActivityDetailPage({ params }) {
  const { slug, locale } = await params;
  const [dict, activityData, relatedActivities] = await Promise.all([
    getDictionary(locale),
    getActivityDetailData(slug).catch(() => null),
    getRelatedActivities(slug, locale).catch(() => [])
  ]);

  return (
    <ActivityDetailContent
      activityData={activityData}
      dict={dict}
      locale={locale}
      relatedActivities={relatedActivities}
    />
  );
}