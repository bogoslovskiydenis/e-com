import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

const InstagramSection = () => {
    // Моковые данные для Instagram постов
    const instagramPosts = [
        { id: 1, image: "/images/instagram-1.jpg" },
        { id: 2, image: "/images/instagram-2.jpg" },
        { id: 3, image: "/images/instagram-3.jpg" },
        { id: 4, image: "/images/instagram-4.jpg" },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                {instagramPosts.map((post) => (
                    <Link
                        key={post.id}
                        href="https://instagram.com/paradise_store"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group relative aspect-square overflow-hidden"
                    >
                        <Image
                            src={post.image}
                            alt="Instagram post"
                            fill
                            style={{objectFit: "cover"}}
                            className="group-hover:scale-105 transition duration-300"
                        />
                        <div
                            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <Instagram size={30}
                                       className="text-white opacity-0 group-hover:opacity-100 transition-opacity"/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default InstagramSection;