// lib/slugUtils.js
import { client } from '../sanity/lib/client';

export async function getSlugMapping() {
    try {
        const query = `*[_type == "activities"][0]{
      activitiesList[] {
        slugVi {
          current
        },
        slugEn {
          current
        },
        title,
        titleEn
      }
    }`;

        const data = await client.fetch(query);
        const mapping = {};

        data?.activitiesList?.forEach(activity => {
            if (activity.slugVi?.current && activity.slugEn?.current) {
                mapping[activity.slugVi.current] = activity.slugEn.current;
                mapping[activity.slugEn.current] = activity.slugVi.current;
            }
        });

        return mapping;
    } catch (error) {
        console.error('Error fetching slug mapping:', error);
        return {};
    }
}