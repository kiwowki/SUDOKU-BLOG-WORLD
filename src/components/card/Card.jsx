import Link from "next/link";
import React from "react";

export default function Card({ item }) {
    return (
        <div className="list">
            <div className="blog_left">
                <span className="cate">
                    <Link href={`blogDetail/${item.slug}`}>{item.cateSlug}</Link>
                </span>
                <h3 className="title">
                    <Link href={`blogDetail/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="desc">
                    <Link href={`blogDetail/${item.slug}`}>{item.desc}</Link>
                    <br />
                </p>
                <p className="auth">
                    <Link href={`blogDetail/${item.slug}`}>{item.userName}</Link>
                </p>
            </div>
            <p className="img">
                <img src="/img/sudoku_easy1.png" />
            </p>
        </div>
    );
}
