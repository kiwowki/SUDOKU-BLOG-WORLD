"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
// import { useNavigation } from "next/navigation";

export default function Menu() {
    // 가상으로 입력한 값임. useSession사용 전까지 임시로 사용.
    // const status = "authenticated";
    // const name = "kang";

    // useSession의 데이터 불러오기
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div className="loading">로딩 중입니다...</div>;
    }

    return (
        <ul>
            {status === "authenticated" ? (
                <>
                    <li>
                        <span className="user_welcome"><em>{session.user.name}</em>님 어서오세요!</span>
                    </li>
                    <li>
                        <span className="logout" onClick={() => signOut()}>
                            logout
                        </span>
                    </li>
                    <li>
                        <Link href="/blog" className="yellow">blog</Link>
                    </li>
                    <li>
                        <Link href="/blogWrite"><span>blog write</span></Link>
                    </li>
                    <li>
                        <Link href="/notice" className="yellow">notice</Link>
                    </li>
                    <li>
                        <Link href="/noticeWite"><span>notice write</span></Link>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <Link href="/login">login</Link>
                    </li>
                    <li>
                        <Link href="/join">join</Link>
                    </li>
                    <li>
                        <Link href="/blog">blog</Link>
                    </li>
                    <li>
                        <Link href="/notice">notice</Link>
                    </li>
                </>
            )}
        </ul>
    );
}
