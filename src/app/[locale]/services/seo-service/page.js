import ServiceSEO from './ServiceSeo';
import { getDictionary } from "../../../../lib/dictionaries";

export default async function ServicePage({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return <ServiceSEO locale={locale} dict={dict} />;
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return {
        title: dict.serviceSeo?.pageTitle || 'Dịch vụ SEO Tổng thể - Đưa Website Lên TOP Google',
        description: dict.serviceSeo?.hero?.desc || 'Smads cung cấp giải pháp SEO chuyên sâu, tối ưu toàn diện từ Onpage, Offpage đến Technical SEO'
    };
}