"use client";
import { useEffect, useState } from "react";
import BgAllPage from "../../components/BgAllPage";
import ScrollToTop from "../../components/ScrollToTop";
import styles from "../../styles/Career.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";

export default function Career() {
    const [selectedJob, setSelectedJob] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const jobs = [
        {
            id: 1,
            title: "Chuyên viên Marketing",
            desc: "Lên kế hoạch, triển khai và đo lường các chiến dịch marketing đa nền tảng.",
            details: {
                job_description: "Phụ trách các chiến dịch truyền thông thương hiệu, quảng bá sản phẩm và tăng tương tác người dùng.",
                job_requirements: "Tối thiểu 1 năm kinh nghiệm marketing, có kỹ năng phân tích và sử dụng Meta Ads, Google Ads.",
                benefit: "Mức lương thoả thuận, tham gia bhyt bhxh đầy đủ, thưởng các ngày lễ - tết, phụ cấp ăn uống đi lại",
                deadline: "30/11/2025",

            },
        },
        {
            id: 2,
            title: "Thiết kế đồ họa",
            desc: "Thiết kế ấn phẩm truyền thông, banner quảng cáo và hình ảnh cho các chiến dịch.",
            details: {
                job_description: "Chịu trách nhiệm sáng tạo ý tưởng thiết kế cho các chiến dịch truyền thông và nhận diện thương hiệu.",
                job_requirements: "Thành thạo Photoshop, Illustrator; có tư duy sáng tạo, cập nhật xu hướng thiết kế.",
                benefit: "Mức lương thoả thuận, tham gia bhyt bhxh đầy đủ, thưởng các ngày lễ - tết, phụ cấp ăn uống đi lại",
                deadline: "15/12/2025",
            },
        },
        {
            id: 3,
            title: "Nhân viên Content",
            desc: "Viết bài quảng cáo, xây dựng nội dung hấp dẫn cho fanpage và các kênh truyền thông.",
            details: {
                job_description: "Lên ý tưởng, sáng tạo nội dung phù hợp cho từng nền tảng mạng xã hội.",
                job_requirements: "Có khả năng viết tốt, ưu tiên có kinh nghiệm trong lĩnh vực marketing hoặc truyền thông.",
                benefit: "Mức lương thoả thuận, tham gia bhyt bhxh đầy đủ, thưởng các ngày lễ - tết, phụ cấp ăn uống đi lại",
                deadline: "20/12/2025",
            },
        },
    ];

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.innerWidth >= 768) {
                import("aos").then((AOS) => {
                    AOS.init({
                        duration: 1000,
                        once: true,
                    });
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

    const handleToggleDetails = (id) => {
        setSelectedJob(selectedJob === id ? null : id);
    };

    const handleApplyClick = () => {
        setShowForm(true);
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    return (
        <>
            <BgAllPage title="Career" parent="SMADS" />

            {/* Intro */}
            <section className={styles.introSection}>
                <div className={styles.container}>
                    <h2 data-aos="fade-up">Cùng SMADS phát triển sự nghiệp của bạn</h2>
                    <p data-aos="fade-up" data-aos-delay="100">
                        Chúng tôi luôn tìm kiếm những cá nhân sáng tạo, đam mê và sẵn sàng
                        bứt phá trong lĩnh vực truyền thông & marketing.
                    </p>
                </div>
            </section>

            {/* Job list */}
            <section className={styles.jobSection}>
                <div className={styles.container}>
                    <h3 data-aos="fade-up">Vị trí đang tuyển</h3>
                    <div className={styles.jobList}>
                        {jobs.map((job) => (
                            <div key={job.id} className={styles.jobCard} data-aos="fade-right">
                                <h4>{job.title}</h4>
                                <p>{job.desc}</p>

                                {selectedJob === job.id && (
                                    <div className={styles.jobDetails}>
                                        <p><strong>Mô tả công việc:</strong> {job.details.job_description}</p>
                                        <p><strong>Yêu cầu kinh nghiệm:</strong> {job.details.job_requirements}</p>
                                        <p><strong>Hạn nộp hồ sơ:</strong> {job.details.deadline}</p>
                                        <p><strong>Quyền lợi:</strong> {job.details.benefit}</p>
                                        <button
                                            className={styles.applyBtn}
                                            onClick={handleApplyClick}
                                        >
                                            Ứng tuyển ngay
                                        </button>
                                    </div>
                                )}

                                <button
                                    className={styles.detailBtn}
                                    onClick={() => handleToggleDetails(job.id)}
                                >
                                    {selectedJob === job.id ? "Thu gọn" : "Xem chi tiết"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form */}
            {showForm && (
                <section className={styles.applySection}>
                    <div className={styles.container}>
                        <h3>Gửi hồ sơ ứng tuyển</h3>
                        <form
                            className={styles.applyForm}
                            onSubmit={async (e) => {
                                e.preventDefault();

                                const form = e.target;
                                const formData = new FormData(form);

                                const name = formData.get("name").trim();
                                const email = formData.get("email").trim();
                                const phone = formData.get("phone").trim();
                                const file = formData.get("cv");

                                // Check character mail
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if (!emailRegex.test(email)) {
                                    toast.error("Vui lòng nhập đúng định dạng email!");
                                    return;
                                }

                                // Check mail exists
                                try {
                                    const verify = await fetch("/api/verify-email", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ email }),
                                    });
                                    const verifyResult = await verify.json();
                                    if (!verifyResult.valid) {
                                        toast.error("Email không tồn tại hoặc không hợp lệ!");
                                        return;
                                    }
                                } catch (err) {
                                    console.error(err);
                                    toast.error("Không thể kiểm tra email, vui lòng thử lại!");
                                    return;
                                }

                                // Check phone
                                const phoneRegex = /^[0-9]{8,15}$/;
                                if (!phoneRegex.test(phone)) {
                                    toast.error("Số điện thoại không hợp lệ (chỉ nhập số, từ 8-15 ký tự).");
                                    return;
                                }

                                // Limit file >5mb
                                if (file && file.size > 5 * 1024 * 1024) {
                                    toast.error("Tệp tải lên quá lớn! Giới hạn 5MB.");
                                    return;
                                }

                                // 5️⃣ Send form to mail
                                try {
                                    const res = await fetch("/api/send-mail", {
                                        method: "POST",
                                        body: formData,
                                    });

                                    const result = await res.json();

                                    if (result.success) {
                                        toast.success("✅ Hồ sơ của bạn đã được gửi thành công!");
                                        form.reset();
                                    } else {
                                        toast.error("❌ Gửi thất bại: " + result.error);
                                    }
                                } catch (err) {
                                    console.error(err);
                                    toast.error("⚠️ Lỗi khi gửi mail, vui lòng thử lại sau!");
                                }
                            }}
                        >
                            <div className={styles.formGroup}>
                                <label>Họ và tên - Vị trí ứng tuyển</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Nhập họ tên - vị trí ứng tuyển"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input type="email" name="email" required placeholder="Nhập email" />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Số điện thoại</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    placeholder="Nhập số điện thoại"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Tải lên CV (PDF hoặc DOCX)</label>
                                <input type="file" name="cv" accept=".pdf,.doc,.docx" required />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Ghi chú</label>
                                <textarea name="note" rows="4" placeholder="Thêm thông tin nếu có..."></textarea>
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                Gửi hồ sơ
                            </button>
                        </form>

                    </div>
                </section>
            )}

            <ScrollToTop />
        </>
    );
}
