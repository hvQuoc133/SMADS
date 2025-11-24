'use client';
import { useState, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from '../styles/Testimonials.module.css';
import '../styles/globals.css';
import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';

export default function Testimonials({ locale = 'vi' }) {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    // Fetch testimonials Sanity
    useEffect(() => {
        async function fetchTestimonials() {
            try {
                setLoading(true);
                const query = `*[_type == "testimonial"] | order(order asc){
                    _id,
                    nameVi,
                    nameEn,
                    roleVi,
                    roleEn,
                    textVi,
                    textEn,
                    stars,
                    avatar {
                        asset->,
                        alt
                    },
                    featured,
                    order
                }`;

                const data = await client.fetch(query);
                setTestimonials(data || []);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                setTestimonials([]);
            } finally {
                setLoading(false);
            }
        }

        fetchTestimonials();
    }, []);

    // Fallback 
    const fallbackTestimonials = [
        {
            _id: 1,
            text: "There are many variations of passages available but the majority have suffered alteration in some form by injected humour.",
            stars: 4,
            name: "Alyson Gibson",
            role: "Web Developer",
            avatar: "/images/home/testi_avatar.png",
        },
        {
            _id: 2,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod tincidunt arcu, nec tincidunt justo facilisis eget.",
            stars: 5,
            name: "Michael Scott",
            role: "Product Manager",
            avatar: "/images/home/testi_avatar01.png",
        },
        {
            _id: 3,
            text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
            stars: 3,
            name: "Pam Beesly",
            role: "UI Designer",
            avatar: "/images/home/testi_avatar02.png",
        },
    ];

    // Transform data locale
    const transformedTestimonials = useMemo(() => {
        return testimonials.map(item => ({
            _id: item._id,
            name: locale === 'vi' ? item.nameVi : item.nameEn,
            role: locale === 'vi' ? item.roleVi : item.roleEn,
            text: locale === 'vi' ? item.textVi : item.textEn,
            stars: item.stars,
            avatar: item.avatar,
            featured: item.featured
        }));
    }, [testimonials, locale]);

    const displayTestimonials = transformedTestimonials.length > 0 ? transformedTestimonials : fallbackTestimonials;

    // Helper function get avatar URL
    const getAvatarUrl = (item, size = 80) => {
        if (!item) return '/images/home/testi_avatar.png';

        return item.avatar?.asset ?
            urlFor(item.avatar).width(size).height(size).url() :
            item.avatar || '/images/home/testi_avatar.png';
    };

    if (loading) {
        return (
            <section className={styles.testimonials}>
                <div className={styles.loading}>Đang tải đánh giá...</div>
            </section>
        );
    }

    return (
        <section className={styles.testimonials}>
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={displayTestimonials.length > 1}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className={styles.swiper}
            >
                {displayTestimonials.map((item, index) => {
                    const total = displayTestimonials.length;

                    const prevIndex = (index - 1 + total) % total;
                    const nextIndex = (index + 1) % total;

                    const prevItem = displayTestimonials[prevIndex];
                    const nextItem = displayTestimonials[nextIndex];

                    // Find active item
                    const isActiveSlide = index === activeIndex;
                    const mainItem = isActiveSlide ? item : null;

                    return (
                        <SwiperSlide key={item._id} className={styles.slide}>
                            <p className={styles.text}>{item.text}</p>

                            <div className={styles.stars}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className={i < item.stars ? styles.starActive : styles.star}>
                                        ★
                                    </span>
                                ))}
                            </div>

                            <h4 className={styles.name}>{item.name}</h4>
                            <p className={styles.role}>{item.role}</p>

                            <div className={styles.avatars}>
                                {/* Previous Avatar */}
                                {total >= 3 && (
                                    <img
                                        src={getAvatarUrl(prevItem, 80)}
                                        alt={prevItem.avatar?.alt || prevItem.name || "Previous avatar"}
                                        className={`${styles.avatar} ${styles.sideAvatar}`}
                                    />
                                )}

                                {/* Main Avatar */}
                                {isActiveSlide && (
                                    <img
                                        src={getAvatarUrl(item, 100)}
                                        alt={item.avatar?.alt || item.name}
                                        className={`${styles.avatar} ${styles.mainAvatar}`}
                                    />
                                )}

                                {/* Next Avatar */}
                                {total >= 2 && (
                                    <img
                                        src={getAvatarUrl(nextItem, 80)}
                                        alt={nextItem.avatar?.alt || nextItem.name || "Next avatar"}
                                        className={`${styles.avatar} ${styles.sideAvatar}`}
                                    />
                                )}
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
}