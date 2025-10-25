"use client";
import { useEffect, useState } from "react";
import BgAllPage from "../../../components/BgAllPage";
import ScrollToTop from "../../../components/ScrollToTop";
import styles from "../../../styles/Career.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";

export default function Career({ dict }) {
    const c = dict.career;
    const t = c.toast;

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
            <BgAllPage title={c.pageTitle} parent="SMADS" />

            {/* Intro */}
            <section className={styles.introSection}>
                <div className={styles.container}>
                    <h2 data-aos="fade-up">{c.introTitle}</h2>
                    <p data-aos="fade-up" data-aos-delay="100">{c.introDesc}</p>
                </div>
            </section>

            {/* Job list */}
            <section className={styles.jobSection}>
                <div className={styles.container}>
                    <h3 data-aos="fade-up">{c.positionsTitle}</h3>
                    <div className={styles.jobList}>
                        {jobs.map((job) => (
                            <div key={job.id} className={styles.jobCard} data-aos="fade-right">
                                <h4>{job.title}</h4>
                                <p>{job.desc}</p>

                                {selectedJob === job.id && (
                                    <div className={styles.jobDetails}>
                                        <p><strong>{c.details.desc}:</strong> {job.details.job_description}</p>
                                        <p><strong>{c.details.require}:</strong> {job.details.job_requirements}</p>
                                        <p><strong>{c.details.deadline}:</strong> {job.details.deadline}</p>
                                        <p><strong>{c.details.benefit}:</strong> {job.details.benefit}</p>
                                        <button
                                            className={styles.applyBtn}
                                            onClick={handleApplyClick}
                                        >
                                            {c.actions.applyNow}
                                        </button>
                                    </div>
                                )}

                                <button
                                    className={styles.detailBtn}
                                    onClick={() => handleToggleDetails(job.id)}
                                >
                                    {selectedJob === job.id ? c.actions.hide : c.actions.view}
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
                        <h3>{c.actions.applyFormTitle}</h3>
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

                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if (!emailRegex.test(email)) {
                                    toast.error(t.invalidEmail);
                                    return;
                                }

                                try {
                                    const verify = await fetch("/api/verify-email", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ email }),
                                    });
                                    const verifyResult = await verify.json();
                                    if (!verifyResult.valid) {
                                        toast.error(t.emailNotFound);
                                        return;
                                    }
                                } catch (err) {
                                    console.error(err);
                                    toast.error(t.checkFail);
                                    return;
                                }

                                const phoneRegex = /^[0-9]{8,15}$/;
                                if (!phoneRegex.test(phone)) {
                                    toast.error(t.invalidPhone);
                                    return;
                                }

                                if (file && file.size > 5 * 1024 * 1024) {
                                    toast.error(t.fileTooLarge);
                                    return;
                                }

                                try {
                                    const res = await fetch("/api/send-mail", {
                                        method: "POST",
                                        body: formData,
                                    });

                                    const result = await res.json();

                                    if (result.success) {
                                        toast.success(t.success);
                                        form.reset();
                                    } else {
                                        toast.error(t.fail + result.error);
                                    }
                                } catch (err) {
                                    console.error(err);
                                    toast.error(t.sendError);
                                }
                            }}
                        >
                            <div className={styles.formGroup}>
                                <label>{c.form.name}</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder={c.form.name}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>{c.form.email}</label>
                                <input type="email" name="email" required placeholder={c.form.email} />
                            </div>

                            <div className={styles.formGroup}>
                                <label>{c.form.phone}</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    placeholder={c.form.phone}
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>{c.form.cv}</label>
                                <input type="file" name="cv" accept=".pdf,.doc,.docx" required />
                            </div>

                            <div className={styles.formGroup}>
                                <label>{c.form.note}</label>
                                <textarea name="note" rows="4" placeholder={c.form.notePlaceholder}></textarea>
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                {c.actions.submit}
                            </button>
                        </form>
                    </div>
                </section>
            )}

            <ScrollToTop />
        </>
    );
}
