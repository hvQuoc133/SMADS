"use client";
import { useEffect, useState } from "react";
import BgAllPage from "../../../components/BgAllPage";
import ScrollToTop from "../../../components/ScrollToTop";
import styles from "../../../styles/Career.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import CareerFallback from "./Career";

export default function CareerContent({ pageData, dict, locale }) {

    const [selectedJob, setSelectedJob] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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

    // Fallback nếu không có data từ Sanity
    if (!pageData) {
        return <CareerFallback dict={dict} />;
    }

    // Lấy data từ Sanity
    const intro = pageData.intro || {};
    const positions = pageData.positions || {};
    const jobs = pageData.jobs || [];
    const actions = pageData.actions || {};
    const form = pageData.form || {};
    const toastMsgs = pageData.toast || {};
    const details = pageData.details || {};

    const handleToggleDetails = (id) => {
        setSelectedJob(selectedJob === id ? null : id);
    };

    const handleApplyClick = () => {
        setShowForm(true);
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formElement = e.target;
        const formData = new FormData(formElement);

        const name = formData.get("name").trim();
        const email = formData.get("email").trim();
        const phone = formData.get("phone").trim();
        const file = formData.get("cv");

        // ✅ Bắt đầu loading
        setIsLoading(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error(toastMsgs.invalidEmail || "Email không hợp lệ");
            setIsLoading(false);
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
                toast.error(toastMsgs.emailNotFound || "Email không tồn tại");
                setIsLoading(false);
                return;
            }
        } catch (err) {
            console.error(err);
            toast.error(toastMsgs.checkFail || "Kiểm tra email thất bại");
            setIsLoading(false);
            return;
        }

        const phoneRegex = /^[0-9]{8,15}$/;
        if (!phoneRegex.test(phone)) {
            toast.error(toastMsgs.invalidPhone || "Số điện thoại không hợp lệ");
            setIsLoading(false);
            return;
        }

        if (file && file.size > 5 * 1024 * 1024) {
            toast.error(toastMsgs.fileTooLarge || "File quá lớn (tối đa 5MB)");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/send-mail", {
                method: "POST",
                body: formData,
            });
            const result = await res.json();

            if (result.success) {
                toast.success(toastMsgs.success || "Gửi đơn thành công!");
                formElement.reset();
                setShowForm(false);
            } else {
                toast.error((toastMsgs.fail || "Gửi thất bại: ") + result.error);
            }
        } catch (err) {
            console.error(err);
            toast.error(toastMsgs.sendError || "Lỗi gửi đơn ứng tuyển");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <BgAllPage title={pageData.pageTitle} parent="SMADS" />

            {/* Intro Section */}
            <section className={styles.introSection}>
                <div className={styles.container}>
                    <h2 data-aos="fade-up">{intro.title}</h2>
                    <p data-aos="fade-up" data-aos-delay="100">
                        {intro.description}
                    </p>
                </div>
            </section>

            {/* Job List Section */}
            <section className={styles.jobSection}>
                <div className={styles.container}>
                    <h3 data-aos="fade-up">{positions.title}</h3>
                    <div className={styles.jobList}>
                        {jobs.map((job, index) => (
                            <div key={job._key || index} className={styles.jobCard} data-aos="fade-right">
                                <h4>{job.title}</h4>
                                <p>{job.description}</p>

                                {selectedJob === job._key && (
                                    <div className={styles.jobDetails}>
                                        <p>
                                            <strong>{details.desc}:</strong>{" "}
                                            {job.details?.jobDescription}
                                        </p>
                                        <p>
                                            <strong>{details.require}:</strong>{" "}
                                            {job.details?.requirements}
                                        </p>
                                        <p>
                                            <strong>{details.deadline}:</strong>{" "}
                                            {job.details?.deadline}
                                        </p>
                                        <p>
                                            <strong>{details.benefit}:</strong>{" "}
                                            {job.details?.benefits}
                                        </p>
                                        <button className={styles.applyBtn} onClick={handleApplyClick}>
                                            {actions.applyNow}
                                        </button>
                                    </div>
                                )}

                                <button
                                    className={styles.detailBtn}
                                    onClick={() => handleToggleDetails(job._key)}
                                >
                                    {selectedJob === job._key ? actions.hideDetails : actions.viewDetails}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form Section */}
            {showForm && (
                <section className={styles.applySection}>
                    <div className={styles.container}>
                        <h3>{actions.applyFormTitle}</h3>
                        <form className={styles.applyForm} onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>{form.name}</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder={form.name}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>{form.email}</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder={form.email}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>{form.phone}</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    placeholder={form.phone}
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>{form.cv}</label>
                                <input
                                    type="file"
                                    name="cv"
                                    accept=".pdf,.doc,.docx"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>{form.note}</label>
                                <textarea
                                    name="note"
                                    rows="4"
                                    placeholder={form.notePlaceholder || form.note}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={styles.submitBtn}
                            >
                                {isLoading ? (
                                    <>
                                        <span className={styles.loader}></span>
                                        {form.sending || "Đang gửi..."}
                                    </>
                                ) : (
                                    actions.submit
                                )}
                            </button>
                        </form>
                    </div>
                </section>
            )}

            <ScrollToTop />
        </>
    );
}