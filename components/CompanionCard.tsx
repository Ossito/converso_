"use client";

import { removeBookmark } from "@/lib/actions/companion.actions";
import { addBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CompanionCardProps {
    id: string,
    name: string,
    topic: string,
    subject: string,
    duration: number,
    color: string,
    bookmarked: boolean,
}

const CompanionCard = ({ id, name, topic, subject, duration, color, bookmarked } : CompanionCardProps) => {

    const pathname = usePathname();
    
    const handleBookmark = async () => {
        if(bookmarked) {
        await removeBookmark(id, pathname);
        } else {
        await addBookmark(id, pathname);
        }
    };

    return (
        <article className="companion-card" style={{ backgroundColor: color }}>
            <div className="flex justify-between items-center">
                {/* subject */}
                <div className="subject-badge">
                    {subject}
                </div>
                
                {/* bookmark */}
                <button className="companion-bookmark" onClick={handleBookmark}>
                    <Image src={bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"} alt="bookmark" width={11} height={15}/>
                </button>
            </div>

            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-sm">{topic}</p>

            <div className="flex items-center gap-2">
                <Image src="/icons/clock.svg" alt="clock_duration" width={13.5} height={13.5} />
                <p className="text-sm">Durée : {duration} minutes </p>
            </div>

            <Link href={`/companion/${id}`} className="w-full">
                <button className="btn-primary w-full justify-center">
                    Démarrer la leçon
                </button>
            </Link>
        </article>
    )
}

export default CompanionCard;