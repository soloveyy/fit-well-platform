import React from 'react';
import {getActivity} from "@/lib/actions/activity.actions";
import {Coaches} from "@/constants";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";

const Success = async ({ params: { userId }, searchParams}: SearchParamProps) => {
    const activityId = searchParams?.activityId as string || ''
    const activity = await getActivity(activityId);
    const coach = Coaches.find((coach)=> coach.name === activity.primaryTrainer)

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-700 p-8 rounded-xl shadow-md text-center">
                <h1 className="text-4xl font-bold text-green-500 mb-4">Success!</h1>
                <p className="text-xl text-white font-bold mb-6">
                    Your activity schedule was successfully submitted!
                </p>
                <p className="text-xl text-white font-bold mb-6">
                   Good job! 🏋🏽🔥💪🏼🎧
                </p>
                <div className="request details text-white">
                    <p>Activity details:</p>
                    <div className="flex justify-center gap-3">
                        <Image
                            src={coach?.image!}
                            alt="Coach"
                            width={120}
                            height={120}
                            className="size-7"
                        />
                        <p>{coach?.name}</p>
                        <div className="flex gap-2">
                            <Image
                                src="/assets/icons/calendar.svg"
                                height={24}
                                width={24}
                                alt="calendar"
                            />
                            <p>{formatDateTime(activity.schedule).dateTime}</p>
                        </div>
                    </div>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 mt-2 rounded"
                    >
                        <Link href={`/members/${userId}/new-activity`}>
                            Schedule new activity
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Success;