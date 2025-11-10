import ServiceSEO from './ServiceSEO';
import { getDictionary } from "../../../../lib/dictionaries";

export default async function ServicePage({ params }) {
    const { locale } = params;
    const dict = await getDictionary(locale);

    return <ServiceSEO locale={locale} dict={dict} />;
}

export async function generateMetadata({ params }) {
    const { locale } = params;
    const dict = await getDictionary(locale);

    return {
        title: dict.serviceSEO?.hero?.title || 'Dịch vụ SEO Tổng thể',
        description: dict.serviceSEO?.hero?.description || 'Dịch vụ SEO chuyên nghiệp, đưa website lên top Google'
    };
}