"use client"; 
import { useState, useEffect } from "react";
import styles from "../styles/ScrollToTop.module.css";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  // Scroll > 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  return (
    <>
      {visible && (
        <button className={styles.scrollBtn} onClick={scrollToTop}>
          ↑
        </button>
      )}
    </>
  );
}
