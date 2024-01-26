import Comments from '@/components/comments/Comments';
// import Menu from '@/components/menu/Menu'
import Image from 'next/image';
import React from 'react'
const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/blogDetail/${slug}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed");
    }
    return res.json();
};
export default async function page({ params }) {
    const { slug } = params;
    const data = await getData(slug);

    // console.log(data)
    return (
        <main id='main'>
            <div className="main_header">
                <h2>#View</h2>
                <p>상세 페이지입니다.</p>
            </div>
            <div className='main_contents container'>
                <h3>{data.title}</h3>
                <p>{data.desc}</p>
                <p>{data.views}</p>
                <p>{data.userEmail}</p>
                {data.user.image && <p><Image src={data.user.image} alt="dd" width={100} height={100} /></p>}
                <Comments slug={slug} />
            </div>
        </main>
    )
}