"use client";
import { useEffect, useState } from "react";
import BgAllPage from '../../../../components/BgAllPage';
import ScrollToTop from '../../../../components/ScrollToTop';
import styles from '../../../../styles/ServiceSeo.module.css';
import AOS from "aos";
import 'aos/dist/aos.css';

export default function ServiceSEO({ locale, dict }) {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Initialize AOS - Đơn giản hóa
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            AOS.init({
                duration: 800,
                once: true,
            });
        }
    }, []);

    return (
        <>
            <BgAllPage title="Dịch vụ SEO" parent="SMADS" />

            <div className={styles.wrapper}>
                {/* HERO SECTION - Chỉ 2 AOS */}
                <section className={`${styles.section} ${styles.heroSeo}`}>
                    <div className={styles.container}>
                        <div className={styles.heroSeoContent}>
                            <div className={styles.heroText} data-aos="fade-right">
                                <h1>Dịch vụ SEO Tổng thể - Đưa Website Lên TOP Google</h1>
                                <p>Smads cung cấp giải pháp SEO chuyên sâu, tối ưu toàn diện từ Onpage, Offpage đến Technical SEO. Cam kết kết quả rõ ràng, báo cáo minh bạch.</p>

                                <div className={styles.seoMetrics}>
                                    <div className={styles.metric}>
                                        <span className={styles.metricValue}>+450%</span>
                                        <span className={styles.metricLabel}>Traffic Growth</span>
                                    </div>
                                    <div className={styles.metric}>
                                        <span className={styles.metricValue}>TOP 1-3</span>
                                        <span className={styles.metricLabel}>Google Ranking</span>
                                    </div>
                                    <div className={styles.metric}>
                                        <span className={styles.metricValue}>24/7</span>
                                        <span className={styles.metricLabel}>Monitoring</span>
                                    </div>
                                </div>

                                <div className={styles.heroActions}>
                                    <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                        Nhận Audit Website Miễn Phí
                                    </a>
                                    <a href="#pricing" className={styles.btnSecondary}>
                                        Xem Báo Giá
                                    </a>
                                </div>
                            </div>

                            <div className={styles.heroVisual} data-aos="fade-left">
                                <div className={styles.googleResults}>
                                    <div className={styles.searchResult}>
                                        <div className={styles.resultUrl}>smads.com.vn › dịch-vụ-seo</div>
                                        <div className={styles.resultTitle}>Dịch vụ SEO chuyên nghiệp - Đứng top Google | Smads</div>
                                        <div className={styles.resultDesc}>Smads cung cấp dịch vụ SEO tổng thể, tối ưu website lên top Google nhanh chóng và bền vững. Đội ngũ SEO 10+ năm kinh nghiệm.</div>
                                    </div>
                                    <div className={styles.searchResult}>
                                        <div className={styles.resultUrl}>smads.com.vn › seo-website</div>
                                        <div className={styles.resultTitle}>SEO Website - Tăng traffic tự nhiên 300% | Smads</div>
                                        <div className={styles.resultDesc}>Chiến lược SEO data-driven, tối ưu conversion rate và tăng doanh thu từ organic traffic. Cam kết kết quả rõ ràng.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEO SERVICES GRID - 1 AOS cho cả grid */}
                <section className={`${styles.section} ${styles.seoServices}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>Dịch vụ SEO Chuyên sâu</h2>
                        <div className={styles.servicesGrid}>
                            <div className={styles.serviceCard}>
                                <div className={styles.serviceIcon}>🔍</div>
                                <h3>Technical SEO</h3>
                                <p>Tối ưu tốc độ, cấu trúc website, schema markup, và fix lỗi kỹ thuật</p>
                                <ul>
                                    <li>Site Speed Optimization</li>
                                    <li>Mobile First Indexing</li>
                                    <li>Structured Data</li>
                                </ul>
                            </div>

                            <div className={styles.serviceCard}>
                                <div className={styles.serviceIcon}>📝</div>
                                <h3>Content SEO</h3>
                                <p>Xây dựng content strategy, keyword research và content optimization</p>
                                <ul>
                                    <li>Keyword Research</li>
                                    <li>Content Planning</li>
                                    <li>On-page Optimization</li>
                                </ul>
                            </div>

                            <div className={styles.serviceCard}>
                                <div className={styles.serviceIcon}>🚀</div>
                                <h3>Off-page SEO</h3>
                                <p>Xây dựng backlink chất lượng, brand mention và social signals</p>
                                <ul>
                                    <li>Link Building</li>
                                    <li>Guest Posting</li>
                                    <li>Social Signals</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEO PROCESS - 1 AOS cho cả section */}
                <section className={`${styles.section} ${styles.process}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>Quy trình SEO 4 bước của Smads</h2>
                        <div className={styles.processTimeline}>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineContent}>
                                    <div className={styles.timelineNumber}>1</div>
                                    <div className={styles.timelineText}>
                                        <h3>Audit & Phân tích</h3>
                                        <p>Đánh giá toàn diện website, phân tích competitor, research từ khoá chiến lược và xác định mục tiêu SEO</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineContent}>
                                    <div className={styles.timelineNumber}>2</div>
                                    <div className={styles.timelineText}>
                                        <h3>Tối ưu Technical SEO</h3>
                                        <p>Fix lỗi kỹ thuật, tối ưu tốc độ website, cấu trúc URL, meta tags và trải nghiệm người dùng trên mọi thiết bị</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineContent}>
                                    <div className={styles.timelineNumber}>3</div>
                                    <div className={styles.timelineText}>
                                        <h3>Content & Onpage SEO</h3>
                                        <p>Xây dựng content strategy, tối ưu onpage, phát triển content chất lượng cao và internal linking</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineContent}>
                                    <div className={styles.timelineNumber}>4</div>
                                    <div className={styles.timelineText}>
                                        <h3>Offpage & Reporting</h3>
                                        <p>Xây dựng backlink chất lượng, monitoring ranking, phân tích traffic và báo cáo kết quả chi tiết hàng tháng</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEO RESULTS - Card Grid - 1 AOS */}
                <section className={`${styles.section} ${styles.seoResults}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>Kết quả SEO thực tế</h2>
                        <div className={styles.resultsGrid}>
                            <div className={styles.resultCard}>
                                <div className={styles.resultMetric}>+450%</div>
                                <div className={styles.resultLabel}>Organic Traffic</div>
                                <div className={styles.resultComparison}>
                                    <div className={styles.beforeResult}>
                                        <div className={styles.beforeLabel}>Trước</div>
                                        <div className={styles.beforeValue}>250/tháng</div>
                                    </div>
                                    <div className={styles.afterResult}>
                                        <div className={styles.afterLabel}>Sau 6 tháng</div>
                                        <div className={styles.afterValue}>1,200/tháng</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.resultCard}>
                                <div className={styles.resultMetric}>TOP 1-3</div>
                                <div className={styles.resultLabel}>Keyword Ranking</div>
                                <div className={styles.resultComparison}>
                                    <div className={styles.beforeResult}>
                                        <div className={styles.beforeLabel}>Trước</div>
                                        <div className={styles.beforeValue}>2 từ khoá</div>
                                    </div>
                                    <div className={styles.afterResult}>
                                        <div className={styles.afterLabel}>Sau 6 tháng</div>
                                        <div className={styles.afterValue}>15 từ khoá</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.resultCard}>
                                <div className={styles.resultMetric}>+217%</div>
                                <div className={styles.resultLabel}>Conversion Rate</div>
                                <div className={styles.resultComparison}>
                                    <div className={styles.beforeResult}>
                                        <div className={styles.beforeLabel}>Trước</div>
                                        <div className={styles.beforeValue}>1.2%</div>
                                    </div>
                                    <div className={styles.afterResult}>
                                        <div className={styles.afterLabel}>Sau 6 tháng</div>
                                        <div className={styles.afterValue}>3.8%</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.resultCard}>
                                <div className={styles.resultMetric}>+17</div>
                                <div className={styles.resultLabel}>Domain Authority</div>
                                <div className={styles.resultComparison}>
                                    <div className={styles.beforeResult}>
                                        <div className={styles.beforeLabel}>Trước</div>
                                        <div className={styles.beforeValue}>18</div>
                                    </div>
                                    <div className={styles.afterResult}>
                                        <div className={styles.afterLabel}>Sau 6 tháng</div>
                                        <div className={styles.afterValue}>35</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEO PRICING - Card Grid - 1 AOS */}
                <section id="pricing" className={`${styles.section} ${styles.seoPricing}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>Bảng giá dịch vụ SEO</h2>
                        <div className={styles.pricingPlans}>
                            <div className={styles.planCard}>
                                <div className={styles.planHeader}>
                                    <h3>SEO Basic</h3>
                                    <div className={styles.planPrice}>15.000.000<small>/tháng</small></div>
                                </div>
                                <ul className={styles.planFeatures}>
                                    <li>50 từ khoá chiến lược</li>
                                    <li>5 bài content chuẩn SEO</li>
                                    <li>10 backlink chất lượng</li>
                                    <li>Báo cáo hàng tháng</li>
                                    <li>Support 8h/ngày</li>
                                </ul>
                                <button className={styles.planBtn}>Chọn Gói</button>
                            </div>

                            <div className={`${styles.planCard} ${styles.popular}`}>
                                <div className={styles.planBadge}>Phổ Biến</div>
                                <div className={styles.planHeader}>
                                    <h3>SEO Pro</h3>
                                    <div className={styles.planPrice}>25.000.000<small>/tháng</small></div>
                                </div>
                                <ul className={styles.planFeatures}>
                                    <li>100+ từ khoá chiến lược</li>
                                    <li>10 bài content chất lượng</li>
                                    <li>25 backlink chất lượng cao</li>
                                    <li>Technical SEO audit</li>
                                    <li>Báo cáo hàng tuần</li>
                                    <li>Support 24/7</li>
                                </ul>
                                <button className={styles.planBtn}>Chọn Gói</button>
                            </div>

                            <div className={styles.planCard}>
                                <div className={styles.planHeader}>
                                    <h3>SEO Enterprise</h3>
                                    <div className={styles.planPrice}>Liên hệ</div>
                                </div>
                                <ul className={styles.planFeatures}>
                                    <li>Từ khoá không giới hạn</li>
                                    <li>Content strategy đa kênh</li>
                                    <li>Link building strategy</li>
                                    <li>Competitor analysis</li>
                                    <li>Real-time dashboard</li>
                                    <li>Dedicated account manager</li>
                                </ul>
                                <button className={styles.planBtn}>Liên Hệ</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ SECTION - 1 AOS */}
                <section className={`${styles.section} ${styles.faq}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>Câu hỏi thường gặp về SEO</h2>
                        <div className={styles.faqList}>
                            <div className={`${styles.faqItem} ${openFaq === 0 ? styles.active : ""}`}>
                                <button className={styles.faqQuestion} onClick={() => toggleFaq(0)}>
                                    <span>SEO mất bao lâu để lên top?</span>
                                    <span className={styles.faqIcon}>
                                        {openFaq === 0 ? "−" : "+"}
                                    </span>
                                </button>
                                <div className={styles.faqAnswer}>
                                    <p>Tuỳ ngành và độ cạnh tranh: 3-6 tháng cho từ khoá ít cạnh tranh, 6-12 tháng cho từ khoá cao cấp. Chúng tôi cam kết báo cáo tiến độ hàng tháng.</p>
                                </div>
                            </div>
                            <div className={`${styles.faqItem} ${openFaq === 1 ? styles.active : ""}`}>
                                <button className={styles.faqQuestion} onClick={() => toggleFaq(1)}>
                                    <span>Có cam kết kết quả không?</span>
                                    <span className={styles.faqIcon}>
                                        {openFaq === 1 ? "−" : "+"}
                                    </span>
                                </button>
                                <div className={styles.faqAnswer}>
                                    <p>Chúng tôi cam kết tăng trưởng traffic, vị trí từ khoá và performance theo từng giai đoạn. Báo cáo minh bạch mọi chỉ số.</p>
                                </div>
                            </div>
                            <div className={`${styles.faqItem} ${openFaq === 2 ? styles.active : ""}`}>
                                <button className={styles.faqQuestion} onClick={() => toggleFaq(2)}>
                                    <span>Chi phí SEO bao gồm những gì?</span>
                                    <span className={styles.faqIcon}>
                                        {openFaq === 2 ? "−" : "+"}
                                    </span>
                                </button>
                                <div className={styles.faqAnswer}>
                                    <p>Bao gồm: Technical audit, keyword research, content creation, link building, monitoring và báo cáo. Không phát sinh thêm chi phí ẩn.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA SECTION - 1 AOS */}
                <section className={`${styles.section} ${styles.cta}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>Sẵn sàng chinh phục TOP Google?</h2>
                        <p>Đăng ký ngay để nhận Audit Website MIỄN PHÍ và tư vấn chiến lược SEO phù hợp</p>
                        <div className={styles.ctaActions}>
                            <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                Đăng ký tư vấn ngay
                            </a>
                            <a href="tel:+842800000000" className={styles.btnSecondary}>
                                📞 028 0000 0000
                            </a>
                        </div>
                    </div>
                </section>
            </div>

            <ScrollToTop />
        </>
    );
}