import Link from "next/link";

const getData = async () => {
    const res = await fetch("http://localhost:3000/api/category", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("실패!!! 다시 해보세요!");
    }

    return res.json();
};

export default async function Category() {
    const data = await getData();
    // console.log(data);

    return (
        <section className="blog_category">
            <ul>
                <li>
                    <Link href="/">all</Link>
                </li>
                {data.map((item) => (
                    <li key={item.id}>
                        <Link href={`?cate=${item.slug}`}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
