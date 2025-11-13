// app/api/slug-mapping/route.js
import { client } from '@/sanity/lib/client';

export async function GET() {
    try {
        // Query tất cả activities để lấy mapping
        const query = `*[_type == "activity"]{
      slugVi,
      slugEn
    }`;

        const activities = await client.fetch(query);
        const mapping = {};

        activities.forEach(activity => {
            if (activity.slugVi && activity.slugEn) {
                mapping[activity.slugVi] = activity.slugEn;
                mapping[activity.slugEn] = activity.slugVi;
            }
        });

        return Response.json({
            success: true,
            mapping
        });
    } catch (error) {
        return Response.json({
            success: false,
            mapping: {}
        }, { status: 500 });
    }
}