import Link from "next/link";
import React from "react";
import Card from "../card/Card";

const getData = async () => {
    const res = await fetch("http://localhost:3000/api/blogPost", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("실패!");
    }

    const data = await res.json();

    // 데이터가 배열인지 확인
    if (!Array.isArray(data)) {
        console.error("데이터가 배열이 아닙니다.");
        return [];
    }

    return data;
};

const CardList = async () => {
    const data = await getData();

    if (data.length === 0) {
        return (
            <div className="no_post">
                <p>포스터가 없습니다. 새 글을 조금만 기다려주세요!</p>
                <img src="/img/sans.png" alt="와! 샌즈!" />
            </div>
        );
    }

    return (
        <section className="card_list">
            {data.reverse().map((item) => (
                <Card item={item} key={item.id} />
            ))}
        </section>
    );
};

export default CardList;
