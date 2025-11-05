"use client";
import { useEffect } from "react";
import BgAllPage from "../../../../components/BgAllPage";
import ScrollToTop from "../../../../components/ScrollToTop";
import Image from "next/image";
import "aos/dist/aos.css";
import styles from "../../../../styles/ServiceAds.module.css";

export default function Service() {
    // Initialize AOS
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.innerWidth >= 768) {
                import("aos").then((AOS) => {
                    AOS.init({ duration: 1000, once: true });
                });
            } else {
                document.querySelectorAll("[data-aos]").forEach((el) => {
                    el.removeAttribute("data-aos");
                });
            }
        }
        return () => {
            if (typeof window !== "undefined" && window.AOS) {
                window.AOS.refreshHard();
            }
        };
    }, []);

    const benefits = [
        {
            icon: "/images/services/online.png",
            title: "Tiếp cận đúng khách hàng mục tiêu",
            desc: "Google Ads giúp doanh nghiệp của bạn hiển thị trước đúng người đang tìm kiếm sản phẩm hoặc dịch vụ tương tự.",
        },
        {
            icon: "/images/services/marketing.png",
            title: "Tối ưu chi phí quảng cáo",
            desc: "Chi tiêu hiệu quả nhờ khả năng kiểm soát ngân sách linh hoạt và đo lường hiệu suất chi tiết.",
        },
        {
            icon: "/images/services/increase.png",
            title: "Tăng doanh thu nhanh chóng",
            desc: "Chuyển đổi cao hơn nhờ nhắm đúng nhu cầu, thúc đẩy lượng khách hàng tiềm năng và doanh số.",
        },
    ];

    const steps = [
        "Phân tích thị trường & đối thủ",
        "Xây dựng chiến lược quảng cáo",
        "Triển khai chiến dịch & theo dõi",
        "Báo cáo, đánh giá & tối ưu",
    ];

    const packages = [
        {
            name: "Gói Cơ Bản",
            price: "3.000.000đ / tháng",
            features: ["Ngân sách quảng cáo < 10 triệu", "Báo cáo định kỳ hàng tuần", "Tối ưu từ khóa cơ bản"],
        },
        {
            name: "Gói Nâng Cao",
            price: "5.000.000đ / tháng",
            features: ["Ngân sách quảng cáo 10–30 triệu", "Báo cáo & tư vấn chuyên sâu", "Tối ưu chuyển đổi nâng cao"],
            highlight: true,
        },
        {
            name: "Gói Doanh Nghiệp",
            price: "8.000.000đ / tháng",
            features: ["Ngân sách quảng cáo > 30 triệu", "Quản lý tài khoản chuyên biệt", "Báo cáo chi tiết, đề xuất tăng trưởng"],
        },
    ];

    return (
        <>
            <BgAllPage title="Service" parent="SMADS" />

            <section className={styles.servicePage}>
                {/* HERO */}
                <div className={styles.hero}>
                    <div className={styles.container}>
                        <h1>Dịch Vụ Chạy Quảng Cáo <b>Google Ads</b> </h1>
                        <p>
                            Tối ưu chi phí – Tăng doanh thu – Dẫn đầu kết quả tìm kiếm với chiến lược quảng cáo Google hiệu quả.
                        </p>
                        <button className={styles.cta}>Nhận tư vấn miễn phí</button>
                    </div>
                </div>

                {/* OVERVIEW */}
                <div className={styles.overview}>
                    <div className={styles.containerFlex}>
                        <div className={styles.text}>
                            <h2>Tổng quan dịch vụ</h2>
                            <p>
                                Dịch vụ Google Ads giúp doanh nghiệp nhanh chóng tiếp cận khách hàng tiềm năng thông qua công cụ tìm kiếm
                                Google. Với đội ngũ chuyên gia có kinh nghiệm, chúng tôi đảm bảo quảng cáo của bạn đạt hiệu quả tối đa, thu
                                hút đúng đối tượng và mang lại lợi nhuận cao nhất.
                            </p>
                            <ul>
                                <li>Hiển thị đúng khách hàng đang có nhu cầu tìm kiếm</li>
                                <li>Đo lường và tối ưu chiến dịch theo thời gian thực</li>
                                <li>Cam kết hiệu quả – minh bạch chi phí</li>
                            </ul>
                        </div>
                        <div className={styles.image}>
                            <Image src="/images/services/blog-009.jpg" alt="Google Ads overview" width={500} height={350} />
                        </div>
                    </div>
                </div>

                {/* BENEFITS */}
                <div className={styles.benefits}>
                    <div className={styles.container}>
                        <h2>Lợi ích khi sử dụng dịch vụ Google Ads</h2>
                        <div className={styles.benefitGrid}>
                            {benefits.map((b, i) => (
                                <div key={i} className={styles.card}>
                                    <Image src={b.icon} alt={b.title} width={64} height={64} />
                                    <h3>{b.title}</h3>
                                    <p>{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* STEPS */}
                <div className={styles.steps}>
                    <div className={styles.container}>
                        <h2>QUY TRÌNH TRIỂN KHAI</h2>
                        <div className={styles.timeline}>
                            {steps.map((s, i) => (
                                <div key={i} className={styles.step}>
                                    <div className={styles.circle}>{i + 1}</div>
                                    <div className={styles.line}></div>
                                    <div className={styles.content}>
                                        <h3>{s}</h3>
                                        <p>
                                            {i === 0 && "Chúng tôi bắt đầu bằng việc nghiên cứu thị trường, phân tích đối thủ và hành vi người dùng."}
                                            {i === 1 && "Lên kế hoạch chi tiết với từ khóa, ngân sách, mẫu quảng cáo và thông điệp truyền thông."}
                                            {i === 2 && "Bắt đầu chạy quảng cáo, theo dõi hiệu quả và điều chỉnh theo thời gian thực."}
                                            {i === 3 && "Tổng hợp kết quả, gửi báo cáo định kỳ và đề xuất giải pháp tối ưu tiếp theo."}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* PACKAGES */}
                <div className={styles.packages}>
                    <div className={styles.container}>
                        <h2>Các gói dịch vụ Google Ads</h2>
                        <div className={styles.packageGrid}>
                            {packages.map((p, i) => (
                                <div key={i} className={`${styles.package} ${p.highlight ? styles.highlight : ""}`}>
                                    <h3>{p.name}</h3>
                                    <p className={styles.price}>{p.price}</p>
                                    <ul className={styles.ulContent}>
                                        {p.features.map((f, idx) => (
                                            <li key={idx}>{f}</li>
                                        ))}
                                    </ul>
                                    <button className={styles.btn}>Đăng ký ngay</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <ScrollToTop />
        </>
    );
}
