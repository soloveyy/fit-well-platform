"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Coaches } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Activity } from "@/types/appwrite.types";

import { ActivityModal } from "../ActivityModal";
import {StatusBadge} from "../StatusBadge";

export const columns: ColumnDef<Activity>[] = [
    {
        header: "#",
        cell: ({ row }) => {
            return <p className="text-14-medium ">{row.index + 1}</p>;
        },
    },
    {
        accessorKey: "member",
        header: "Member",
        cell: ({ row }) => {
            const activity = row.original;
            return <p className="text-14-medium ">{activity.member.name}</p>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const activity = row.original;
            return (
                <div className="min-w-[115px]">
                    <StatusBadge status={activity.status} />
                </div>
            );
        },
    },
    {
        accessorKey: "schedule",
        header: "Activity",
        cell: ({ row }) => {
            const activity = row.original;
            return (
                <p className="text-14-regular min-w-[100px]">
                    {formatDateTime(activity.schedule).dateTime}
                </p>
            );
        },
    },
    {
        accessorKey: "primaryPhysician",
        header: "Coach",
        cell: ({ row }) => {
            const activity = row.original;
            const coach = Coaches.find(
                (coach) => coach.name === activity.primaryTrainer
            );

            return (
                <div className="flex items-center gap-3">
                    <Image
                        src={coach?.image!}
                        alt="coach"
                        width={100}
                        height={100}
                        className="size-8"
                    />
                    <p className="whitespace-nowrap">{coach?.name}</p>
                </div>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({ row }) => {
            const activity = row.original;
            return (
                <div className="flex gap-1">
                    <ActivityModal
                        memberId={activity.member.$id}
                        userId={activity.userId}
                        activity={activity}
                        type="schedule"
                        title="Schedule Activity"
                        description="Please confirm the following details to schedule."
                    />
                    <ActivityModal
                        memberId={activity.member.$id}
                        userId={activity.userId}
                        activity={activity}
                        type="cancel"
                        title="Cancel Activity"
                        description="Are you sure you want to cancel your activity?"
                    />
                </div>
            );
        },
    },
];