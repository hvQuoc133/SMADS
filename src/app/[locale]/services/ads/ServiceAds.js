"use client";
import { useEffect, useState } from "react";
import BgAllPage from "../../../../components/BgAllPage";
import ScrollToTop from "../../../../components/ScrollToTop";
import Image from "next/image";
import "aos/dist/aos.css";
import styles from "../../../../styles/ServiceAds.module.css";

export default function ServiceAds({ dict, locale }) {
    const [openFaq, setOpenFaq] = useState(null);
    const t = dict.serviceAds;

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Initialize AOS - Đơn giản hóa
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            import("aos").then((AOS) => {
                AOS.init({ duration: 800, once: true });
            });
        }
    }, []);

    return (
        <>
            <BgAllPage title="Quảng cáo" parent="SMADS" />

            <div className={styles.wrapper}>
                {/* HERO - 1 AOS */}
                <section className={`${styles.section} ${styles.hero}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <div className={styles.heroContent}>
                            <div className={styles.heroText}>
                                <h1>{t.title1} <span>{t.title2}</span></h1>
                                <p>{t.desc}</p>

                                <div className={styles.heroMetrics}>
                                    <div className={styles.metric}>
                                        <span className={styles.metricValue}>+300%</span>
                                        <span className={styles.metricLabel}>ROAS</span>
                                    </div>
                                    <div className={styles.metric}>
                                        <span className={styles.metricValue}>TOP 1</span>
                                        <span className={styles.metricLabel}>Google Search</span>
                                    </div>
                                    <div className={styles.metric}>
                                        <span className={styles.metricValue}>24/7</span>
                                        <span className={styles.metricLabel}>Optimization</span>
                                    </div>
                                </div>

                                <div className={styles.heroActions}>
                                    <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                        {t.cta}
                                    </a>
                                    <a href="#pricing" className={styles.btnSecondary}>
                                        Xem Báo Giá
                                    </a>
                                </div>
                            </div>
                            <div className={styles.heroVisual}>
                                <Image src="/images/services/b_list02.jpg" alt="Google Ads" width={500} height={350} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* WHY CHOOSE US - 1 AOS */}
                <section className={`${styles.section} ${styles.whyUs}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>Tại sao chọn <span>Smads Ads</span>?</h2>
                        <div className={styles.featuresGrid}>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}>🎯</div>
                                <h3>Targeting Chính Xác</h3>
                                <p>Nhắm đúng đối tượng khách hàng tiềm năng dựa trên hành vi tìm kiếm, nhân khẩu học và sở thích</p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}>📊</div>
                                <h3>Data-Driven Optimization</h3>
                                <p>Tối ưu chiến dịch dựa trên data thực tế, phân tích hiệu suất và điều chỉnh theo thời gian thực</p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}>🚀</div>
                                <h3>ROAS Tối Đa</h3>
                                <p>Cam kết tỷ lệ hoàn vốn quảng cáo tối ưu, giúp doanh nghiệp đạt hiệu quả cao nhất với ngân sách</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* OVERVIEW - 1 AOS */}
                <section className={`${styles.section} ${styles.overview}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <div className={styles.overviewContent}>
                            <div className={styles.overviewText}>
                                <h2>{t.overviewTitle}</h2>
                                <p>{t.overviewDesc}</p>
                                <ul>
                                    {t.overviewList.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.overviewImage}>
                                <Image src="/images/services/b_list02.jpg" alt="Google Ads overview" width={500} height={350} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* AD TYPES - 1 AOS */}
                <section className={`${styles.section} ${styles.adTypes}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>Loại hình quảng cáo Google</h2>
                        <div className={styles.adTypesGrid}>
                            <div className={styles.adTypeCard}>
                                <div className={styles.adTypeIcon}>🔍</div>
                                <h3>Search Ads</h3>
                                <p>Xuất hiện trên kết quả tìm kiếm Google khi khách hàng tìm kiếm từ khóa liên quan</p>
                                <ul>
                                    <li>Hiển thị khi có intent tìm kiếm</li>
                                    <li>Tỷ lệ chuyển đổi cao</li>
                                    <li>Targeting theo từ khóa</li>
                                </ul>
                            </div>
                            <div className={styles.adTypeCard}>
                                <div className={styles.adTypeIcon}>📱</div>
                                <h3>Display Ads</h3>
                                <p>Quảng cáo banner hình ảnh trên mạng hiển thị Google, YouTube và website đối tác</p>
                                <ul>
                                    <li>Tiếp cận lượng audience rộng</li>
                                    <li>Tăng brand awareness</li>
                                    <li>Remarketing hiệu quả</li>
                                </ul>
                            </div>
                            <div className={styles.adTypeCard}>
                                <div className={styles.adTypeIcon}>🎥</div>
                                <h3>Video Ads</h3>
                                <p>Quảng cáo video trên YouTube và mạng hiển thị, thu hút sự chú ý bằng nội dung trực quan</p>
                                <ul>
                                    <li>Tương tác cao với video</li>
                                    <li>Storytelling hiệu quả</li>
                                    <li>Targeting theo interest</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BENEFITS - 1 AOS */}
                <section className={`${styles.section} ${styles.benefits}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{t.benefitsTitle}</h2>
                        <div className={styles.benefitsGrid}>
                            {t.benefits.map((b, i) => (
                                <div key={i} className={styles.benefitCard}>
                                    <Image src={b.icon} alt={b.title} width={64} height={64} />
                                    <h3>{b.title}</h3>
                                    <p>{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PROCESS TIMELINE - 1 AOS */}
                <section className={`${styles.section} ${styles.process}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>{t.stepsTitle}</h2>
                        <div className={styles.processTimeline}>
                            {t.steps.map((s, i) => (
                                <div key={i} className={styles.timelineItem}>
                                    <div className={styles.timelineContent}>
                                        <div className={styles.timelineNumber}>{i + 1}</div>
                                        <div className={styles.timelineText}>
                                            <h3>{s.title}</h3>
                                            <p>{s.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* RESULTS SHOWCASE - 1 AOS */}
                <section className={`${styles.section} ${styles.results}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>Kết quả thực tế</h2>
                        <div className={styles.resultsGrid}>
                            <div className={styles.resultCard}>
                                <div className={styles.resultMetric}>+450%</div>
                                <div className={styles.resultLabel}>Website Traffic</div>
                                <div className={styles.resultComparison}>
                                    <div className={styles.beforeResult}>
                                        <div className={styles.beforeLabel}>Trước</div>
                                        <div className={styles.beforeValue}>500 visits</div>
                                    </div>
                                    <div className={styles.afterResult}>
                                        <div className={styles.afterLabel}>Sau 3 tháng</div>
                                        <div className={styles.afterValue}>2,750 visits</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.resultCard}>
                                <div className={styles.resultMetric}>+320%</div>
                                <div className={styles.resultLabel}>Lead Generation</div>
                                <div className={styles.resultComparison}>
                                    <div className={styles.beforeResult}>
                                        <div className={styles.beforeLabel}>Trước</div>
                                        <div className={styles.beforeValue}>15 leads</div>
                                    </div>
                                    <div className={styles.afterResult}>
                                        <div className={styles.afterLabel}>Sau 3 tháng</div>
                                        <div className={styles.afterValue}>63 leads</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.resultCard}>
                                <div className={styles.resultMetric}>3.8x</div>
                                <div className={styles.resultLabel}>ROAS</div>
                                <div className={styles.resultComparison}>
                                    <div className={styles.beforeResult}>
                                        <div className={styles.beforeLabel}>Trước</div>
                                        <div className={styles.beforeValue}>1.2x ROAS</div>
                                    </div>
                                    <div className={styles.afterResult}>
                                        <div className={styles.afterLabel}>Sau 3 tháng</div>
                                        <div className={styles.afterValue}>3.8x ROAS</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PACKAGES - 1 AOS */}
                <section id="pricing" className={`${styles.section} ${styles.packages}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{t.packagesTitle}</h2>
                        <div className={styles.packagesGrid}>
                            {t.packages.map((p, i) => (
                                <div key={i} className={`${styles.packageCard} ${p.highlight ? styles.popular : ""}`}>
                                    {p.highlight && <div className={styles.packageBadge}>Phổ Biến</div>}
                                    <div className={styles.packageHeader}>
                                        <h3>{p.name}</h3>
                                        <div className={styles.packagePrice}>{p.price}</div>
                                    </div>
                                    <ul className={styles.packageFeatures}>
                                        {p.features.map((f, idx) => (
                                            <li key={idx}>{f}</li>
                                        ))}
                                    </ul>
                                    <button className={styles.packageBtn}>{t.btnSignup}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ - 1 AOS */}
                <section className={`${styles.section} ${styles.faq}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>Câu hỏi thường gặp về Google Ads</h2>
                        <div className={styles.faqList}>
                            <div className={`${styles.faqItem} ${openFaq === 0 ? styles.active : ""}`}>
                                <button className={styles.faqQuestion} onClick={() => toggleFaq(0)}>
                                    <span>Google Ads mất bao lâu để có kết quả?</span>
                                    <span className={styles.faqIcon}>
                                        {openFaq === 0 ? "−" : "+"}
                                    </span>
                                </button>
                                <div className={styles.faqAnswer}>
                                    <p>Thông thường từ 2-4 tuần để thấy kết quả ban đầu. Chiến dịch sẽ được tối ưu liên tục trong 3 tháng đầu để đạt hiệu suất cao nhất.</p>
                                </div>
                            </div>
                            <div className={`${styles.faqItem} ${openFaq === 1 ? styles.active : ""}`}>
                                <button className={styles.faqQuestion} onClick={() => toggleFaq(1)}>
                                    <span>Có cam kết về hiệu quả quảng cáo không?</span>
                                    <span className={styles.faqIcon}>
                                        {openFaq === 1 ? "−" : "+"}
                                    </span>
                                </button>
                                <div className={styles.faqAnswer}>
                                    <p>Chúng tôi cam kết tối ưu ROAS và cải thiện hiệu suất theo từng giai đoạn. Báo cáo minh bạch mọi chỉ số chi tiêu và kết quả.</p>
                                </div>
                            </div>
                            <div className={`${styles.faqItem} ${openFaq === 2 ? styles.active : ""}`}>
                                <button className={styles.faqQuestion} onClick={() => toggleFaq(2)}>
                                    <span>Chi phí có bao gồm ngân sách quảng cáo không?</span>
                                    <span className={styles.faqIcon}>
                                        {openFaq === 2 ? "−" : "+"}
                                    </span>
                                </button>
                                <div className={styles.faqAnswer}>
                                    <p>Chi phí dịch vụ và ngân sách quảng cáo là riêng biệt. Chúng tôi quản lý và tối ưu ngân sách quảng cáo của bạn một cách hiệu quả nhất.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA - 1 AOS */}
                <section className={`${styles.section} ${styles.cta}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>Sẵn sàng tăng trưởng doanh thu với Google Ads?</h2>
                        <p>Đăng ký ngay để nhận Audit tài khoản MIỄN PHÍ và chiến lược quảng cáo tối ưu</p>
                        <div className={styles.ctaActions}>
                            <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                Nhận tư vấn miễn phí
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