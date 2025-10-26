"use client";

import Image from "next/image";
import "../styles/footer.css";
import { FaHome, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer({ locale = "vi", dict }) {
  return (
    <footer className="text-center text-lg-start text-muted footer-bg">
      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            {/* 🏢 Giới thiệu công ty */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <img
                  className="logo-header"
                  src="/images/logo/logo-header.png"
                  alt="Logo SMAds"
                />
                <span className="logo-text">SMADS</span>
              </h6>
              <p>{dict?.footer?.company_description}</p>
              <div className="social-icons">
                <a href="#" className="text-reset"><FaFacebookF /></a>
                <a href="#" className="text-reset"><FaXTwitter /></a>
                <a href="#" className="text-reset"><FaInstagram /></a>
                <a href="#" className="text-reset"><FaTelegramPlane /></a>
              </div>
            </div>

            {/* 🧩 Dịch vụ */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                {dict?.footer?.services_title}
              </h6>
              <p><a href="#!" className="text-reset">{dict?.footer?.services?.invoice}</a></p>
              <p><a href="#!" className="text-reset">{dict?.footer?.services?.ads}</a></p>
              <p><a href="#!" className="text-reset">{dict?.footer?.services?.web_design}</a></p>
              <p><a href="#!" className="text-reset">{dict?.footer?.services?.seo}</a></p>
            </div>

            {/* 🔗 Liên kết */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                {dict?.footer?.links_title}
              </h6>
              <p><a href="#!" className="text-reset">{dict?.footer?.links?.home}</a></p>
              <p><a href="#!" className="text-reset">{dict?.footer?.links?.about}</a></p>
              <p><a href="#!" className="text-reset">{dict?.footer?.links?.services}</a></p>
              <p><a href="#!" className="text-reset">{dict?.footer?.links?.blog}</a></p>
              <p><a href="#!" className="text-reset">{dict?.footer?.links?.career}</a></p>
            </div>

            {/* 📞 Liên hệ */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                {dict?.footer?.contact_title}
              </h6>
              <p><FaHome className="footer-icon" />{dict?.footer?.address}</p>
              <p><FaPhone className="footer-icon" />{dict?.footer?.phone}</p>
              <p><FaEnvelope className="footer-icon" />{dict?.footer?.email}</p>
              <p><FaClock className="footer-icon" />{dict?.footer?.work_days}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="footer-bottom text-center">
        <hr className="footer-divider" />
        <p>{dict?.footer?.copyright}</p>
      </div>
    </footer>
  );
}
