import Link from "next/link";

export default function Footer() {
    return (
        <footer id="footer" role="contentinfo">
            <div className="heart">
                <img src="/img/heart.png" alt="heart_img" />
            </div>
            <Link
                href="mailto:wolves941110@gmail.com"
                rel="noopener noreferrer"
            >
                wolves941110@gmail.com
            </Link>
            <div className="dog">
                <img src="/img/dog.png" alt="dog_img" />
            </div>
        </footer>
    );
}
