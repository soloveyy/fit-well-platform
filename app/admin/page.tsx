import React from 'react';
import Link from "next/link";
import Image from "next/image";
import StatCard from "@/components/StatCard";
import {getRecentActivityList} from "@/lib/actions/activity.actions";
import {DataTable} from "@/components/table/DataTable";
import {columns} from "@/components/table/columns";

const Admin = async () => {
    const activities = await getRecentActivityList()
    console.log('activities ', activities)
    return (
        <div className="mx-auto flex max-w-7x1 flex-col space-y-14">
            <header className="admin-header">
                <Link href="/" className="cursor-pointer">
                    <Image
                        src="/assets/icons/logo.svg"
                        height={500}
                        width={500}
                        alt="Real Estate angel"
                        className="h-9 w-fit mr-3"
                    />
                </Link>
                <p className="text-white font-semibol">Admin Dashboard</p>
            </header>
            <main className="admin-main text-white">
                <section className="w-full space-y-4">
                    <h1 className="header">
                        Welcome 👋
                    </h1>
                    <p className="text-gray-500">Kick off the day by organizing new training sessions</p>
                </section>
                <section className="admin-stat">
                    <StatCard
                        type="activities"
                        count={activities.scheduledCount}
                        label="Scheduled activities"
                        icon="/assets/icons/appointments.svg"
                    />
                    <StatCard
                        type="pending"
                        count={activities.pendingCount}
                        label="Pending activities"
                        icon="/assets/icons/pending.svg"
                    />
                    <StatCard
                        type="cancelled"
                        count={activities.canceledCount}
                        label="Cancelled activities"
                        icon="/assets/icons/cancelled.svg"
                    />
                </section>
                <DataTable columns={columns} data={activities.documents} />
            </main>
        </div>
    );
};

export default Admin;