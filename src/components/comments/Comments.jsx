"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";

const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message);
        throw error;
    }

    return data;
};

export default function Comments({ slug }) {
    const { status } = useSession();

    const { data, mutate, isLoading } = useSWR(
        `http://localhost:3000/api/comments?slug=${slug}`,
        fetcher
    );

    const [comment, setComment] = useState();

    const handleSubmit = async () => {
        await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({ desc: comment, postSlug: slug }),
        });
        mutate();
    };

    return (
        <div>
            <h3>comment</h3>
            <div>
                {status == "authenticated" ? (
                    <div>
                        <input
                            type="text"
                            placeholder="댓글"
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button onClick={handleSubmit}>dddd</button>
                    </div>
                ) : (
                    <div>로그인하면 댓글을 작성할 수 잇습니다.</div>
                )}
            </div>
            <div>
                {isLoading
                    ? "isLoading"
                    : data?.map((item) => (
                          <div key={item.id}>
                              <p>{item.user.name}</p>
                              <p>{item.user.createdAt}</p>
                              <p>{item.desc}</p>
                          </div>
                      ))}
            </div>
        </div>
    );
}
