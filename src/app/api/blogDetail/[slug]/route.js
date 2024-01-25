import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const { slug } = params;

    try {
        const blogPosts = await prisma.BlogPost.update({
            where: { slug },
            data: { views: { increment: 1 } },
            include: { user: true }
        })
        return new NextResponse(
            JSON.stringify(blogPosts, { status: 500 })
        )
    } catch (err) {
        console.log(err)
        return new NextResponse(
            // JSON.stringify = 따옴표 없애기
            JSON.stringify({ message: "wrong!" }, { status: 500 })
        )
    }
}