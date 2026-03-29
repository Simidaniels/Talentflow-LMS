"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AosProvider() {
  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 24
    });
  }, []);

  return null;
}
