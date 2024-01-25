// 글 작성하기(DB에 보내줘야 함) = POST

import { getAuthSession } from "@/utils/auth"; // 세션 확인
import prisma from "@/utils/connect";   // db연동
import { NextResponse } from "next/server"; // req, res 대신 사용. 서버단 생성

// DB에서 데이터 가져오기
export const POST = async (req) => {
    // 세션 부터 확인하고 글 쓸 수 있게 하기
    const session = await getAuthSession()

    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: "not Authenticated!" }, { status: 401 })
        )
    }

    try {
        const body = await req.json(); // body 가져오기
        const blogPost = await prisma.BlogPost.create({
            data: { ...body, userEmail: session.user.email }
        })
        return new NextResponse(
            JSON.stringify(blogPost, { status: 200 })
        )
    } catch (err) {
        console.log(err)
        return new NextResponse(
            JSON.stringify({ message: "Wrong!" }, { status: 500 })
        )
    }
};