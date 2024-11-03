import React from 'react';
import Image from "next/image";

interface StatCardProps {
    type: 'activities' | 'pending' | 'cancelled';
    count: number;
    label: string;
    icon: string;
}

const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {

    return (
        <div className="stat-card bg-sky-950">
            <div className="flex items-center gap-4">
                <Image
                    src={icon}
                    height={32}
                    width={32}
                    alt="activities"
                    className="size-8 w-fit"
                />
                <h2 className="text-32-bold text-white">{count}</h2>
            </div>
        </div>
    );
};

export default StatCard;

