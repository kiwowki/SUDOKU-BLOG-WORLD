"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";

export default function Toggle() {
    const { toggle, theme } = useContext(ThemeContext); // 각자의 값을 불러오기
    console.log(theme);

    return (
        <div className="header_theme" onClick={toggle}>
            <Image src="/moon.svg" alt="어두운 버전" width={24} height={24} />
            <span
                className="ball"
                style={theme === "dark" ? { left: 2 } : { right: 2 }}
            ></span>
            <Image src="/sun.svg" alt="밝은 버전" width={24} height={24} />
        </div>
    );
}
