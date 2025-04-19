import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
    image: string;
    title: string;
    href: string;
}

const CategoryCard = ({ image, title, href }: CategoryCardProps) => {
    return (
        <Link href={href} className="block group relative h-[500px] overflow-hidden">
            <Image
                src={image}
                alt={title}
                fill
                style={{ objectFit: "cover" }}
                className="group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-3xl font-bold mb-2">{title}</h3>
                <div className="mt-3">
                    <button className="bg-white text-black px-6 py-2 hover:bg-black hover:text-white border border-white transition-colors text-sm uppercase">
                        Перейти до каталогу
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;