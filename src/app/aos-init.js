"use client";

import { useEffect } from "react";
import "aos/dist/aos.css";

export default function AosInit() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      import("aos").then((AOS) => {
        AOS.init({
          duration: 1000,
          once: true,
        });
      });
    }
  }, []);

  return null;
}
