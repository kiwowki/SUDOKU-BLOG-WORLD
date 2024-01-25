"use client";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

// 로컬스토리지 확인하기
const getFromLocalStorage = () => {
    // 무슨 형인지 확인
    if (typeof window !== "undefined") {
        // 로컬에 저장
        const value = localStorage.getItem("theme");
        return value || "dark";
    }
};

export const ThemeContextProvider = ({ children }) => {
    // 전체 부분을 감싸주기
    const [theme, setTheme] = useState(() => {
        return getFromLocalStorage();
    }); // 밤모드가 기본

    // 클릭할 때마다 토글
    const toggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        // provider 안에 넣기
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};
