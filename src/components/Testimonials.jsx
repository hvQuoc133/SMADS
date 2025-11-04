'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from '../styles/Testimonials.module.css';
import '../styles/globals.css';

export default function Testimonials() {
    const testimonials = [
        {
            id: 1,
            text: "There are many variations of passages available but the majority have suffered alteration in some form by injected humour.",
            stars: 4,
            name: "Alyson Gibson",
            role: "Web Developer",
            avatar: "/images/home/testi_avatar.png",
        },
        {
            id: 2,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod tincidunt arcu, nec tincidunt justo facilisis eget.",
            stars: 5,
            name: "Michael Scott",
            role: "Product Manager",
            avatar: "/images/home/testi_avatar01.png",
        },
        {
            id: 3,
            text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
            stars: 3,
            name: "Pam Beesly",
            role: "UI Designer",
            avatar: "/images/home/testi_avatar02.png",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className={styles.testimonials}>
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className={styles.swiper}
            >
                {testimonials.map((item, index) => (
                    <SwiperSlide key={item.id} className={styles.slide}>
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
                            <img
                                src={testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length].avatar}
                                alt="prev avatar"
                                className={`${styles.avatar} ${styles.sideAvatar}`}
                            />
                            <img
                                src={testimonials[activeIndex].avatar}
                                alt="main avatar"
                                className={`${styles.avatar} ${styles.mainAvatar}`}
                            />
                            <img
                                src={testimonials[(activeIndex + 1) % testimonials.length].avatar}
                                alt="next avatar"
                                className={`${styles.avatar} ${styles.sideAvatar}`}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
