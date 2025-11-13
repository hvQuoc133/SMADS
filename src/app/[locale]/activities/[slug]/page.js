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

    const title = locale === 'vi' ? data?.title : data?.titleEn;
    const description = locale === 'vi' ? data?.description : data?.descriptionEn;

    // OG Image
    const ogImage = data?.image
      ? urlFor(data.image).width(1200).height(630).url()
      : '/images/og-default.jpg';

    const baseUrl = 'https://smads.com.vn';
    const currentSlug = locale === 'vi' ? data?.slugVi : data?.slugEn;
    const url = `${baseUrl}/${locale}/activities/${currentSlug || slug}`;

    return {
      metadataBase: new URL('https://smads.com.vn'),
      title: title || "Activity Detail - SMADS",
      description: description || "Activity details",

      // Open Graph
      openGraph: {
        title: title || "Activity Detail - SMADS",
        description: description || "Activity details",
        url: url,
        siteName: 'SMADS',
        type: 'article',
        locale: locale === 'vi' ? 'vi_VN' : 'en_US',
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: data?.image?.alt || title || 'SMADS Activity',
          },
        ],
        publishedTime: data?.publishedAt,
        modifiedTime: data?._updatedAt,
      },

      // Twitter Cards
      twitter: {
        card: 'summary_large_image',
        title: title || "Activity Detail - SMADS",
        description: description || "Activity details",
        images: [ogImage],
        creator: '@smads',
      },

      // Canonical & Alternates
      alternates: {
        canonical: url,
        languages: {
          'vi': `${baseUrl}/vi/activities/${data?.slugVi || slug}`,
          'en': `${baseUrl}/en/activities/${data?.slugEn || slug}`,
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

      // Other meta
      authors: ['SMADS'],
      publisher: 'SMADS',
    };

  } catch (error) {
    const baseUrl = 'https://smads.com.vn';
    const url = `${baseUrl}/${locale}/activities/${slug}`;

    return {
      metadataBase: new URL('https://smads.com.vn'),
      title: "Activity Detail - SMADS",
      description: "Activity details",
      openGraph: {
        title: "Activity Detail - SMADS",
        description: "Activity details",
        url: url,
        siteName: 'SMADS',
        type: 'article',
        locale: locale === 'vi' ? 'vi_VN' : 'en_US',
        images: [
          {
            url: `${baseUrl}/images/og-default.jpg`,
            width: 1200,
            height: 630,
            alt: 'SMADS Activity',
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