import prisma from "@/utils/connect";
import { NextResponse } from "next/server"; // req, res 대신 사용

// DB에서 데이터 가져오기
export const GET = async () => {
    try {
        const categories = await prisma.category.findMany();

        return new NextResponse(
            // 데이터 넣어주기
            JSON.stringify(categories, { status: 200 })
        );
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
};