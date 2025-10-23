import Image from 'next/image';
import '../styles/footer.css';
import { FaHome, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { FaFacebookF, FaTwitter, FaInstagram, FaTelegramPlane } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="text-center text-lg-start text-muted footer-bg">
            <section>
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <img className="logo-header" src="/images/logo/logo-header.png" alt="Logo SMAds"></img>
                                <span className="logo-text">SMADS</span>
                            </h6>
                            <p>
                                Here you can use rows and columns to organize your footer content. Lorem ipsum
                                dolor sit amet, consectetur adipisicing elit.
                            </p>
                            <div className="social-icons">
                                <a href="#" className="text-reset"><FaFacebookF /></a>
                                <a href="#" className="text-reset"><FaTwitter /></a>
                                <a href="#" className="text-reset"><FaInstagram /></a>
                                <a href="#" className="text-reset"><FaTelegramPlane /></a>
                            </div>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Dịch vụ</h6>
                            <p><a href="#!" className="text-reset">Cho thuê Invoice Google</a></p>
                            <p><a href="#!" className="text-reset">Google Ads & Facebook Ads</a></p>
                            <p><a href="#!" className="text-reset">Thiết kế Website</a></p>
                            <p><a href="#!" className="text-reset">Seo Website</a></p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Liên kết</h6>
                            <p><a href="#!" className="text-reset">Trang chủ</a></p>
                            <p><a href="#!" className="text-reset">Giới thiệu</a></p>
                            <p><a href="#!" className="text-reset">Dịch vụ</a></p>
                            <p><a href="#!" className="text-reset">Cẩm nang</a></p>
                            <p><a href="#!" className="text-reset">Tuyển dụng</a></p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
                            <p><FaHome className="footer-icon" />177 Nguyễn Sinh Sắc, Liên Chiểu, Đà Nẵng</p>
                            <p><FaPhone className="footer-icon" />0775.779.266</p>
                            <p><FaEnvelope className="footer-icon" />Info@smads.com.vn</p>
                            <p><FaClock className="footer-icon" />Thứ hai - Thứ bảy</p>

                        </div>
                    </div>
                </div>
            </section>
            <div className="footer-bottom text-center">
                <hr className="footer-divider" />
                <p>© 2025 SMADS. All rights reserved.</p>
            </div>

        </footer>
    );
};

export default Footer;
