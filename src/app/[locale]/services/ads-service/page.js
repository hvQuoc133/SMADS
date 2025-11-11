import { getDictionary } from "../../../../lib/dictionaries";
import ServiceAds from "./ServiceAds";

export default async function Page({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return <ServiceAds dict={dict} locale={locale} />;
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return {
        title: dict.serviceAds?.pageTitle || 'Dịch vụ Quảng cáo Google Ads',
        description: dict.serviceAds?.desc || 'Dịch vụ quảng cáo Google Ads chuyên nghiệp, tối ưu chi phí và tăng doanh thu'
    };
}