// 댓글 작성하기(DB에 보내줘야 함) = POST

import { getAuthSession } from "@/utils/auth"; // 세션 확인
import prisma from "@/utils/connect";   // db연동
import { NextResponse } from "next/server"; // req, res 대신 사용. 서버단 생성

// 모든 댓글 가져오기
export const GET = async (req) => {
    const { searchParams } = new URL(req.url)
    const postSlug = searchParams.get("postSlug")

    try {
        const comments = await prisma.Comments.findMany({
            where: {
                ...(postSlug) && { postSlug }
            },
            include: { user: true }
        });

        return new NextResponse(
            // 데이터 넣어주기
            JSON.stringify(comments, { status: 200 })
        );
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
};

// DB에서 댓글 작성하기
export const POST = async (req) => {
    // 세션 부터 확인하고 글 쓸 수 있게 하기
    const session = await getAuthSession()

    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: "not Authenticated!" }, { status: 401 })
        )
    }

    try {
        const body = await req.json(); // body json으로 가져오기
        const comments = await prisma.Comments.create({
            data: { ...body, userEmail: session.user.email }
        })
        return new NextResponse(
            JSON.stringify(comments, { status: 200 })
        )
    } catch (err) {
        console.log(err)
        return new NextResponse(
            JSON.stringify({ message: "Wrong!" }, { status: 500 })
        )
    }
};