"use server"

import {
    DATABASE_ID,
    databases,
    ACTIVITY_COLLECTION_ID,
} from "@/lib/appwrite.config";
import {ID, Query} from "node-appwrite";
import {parseStringify} from "@/lib/utils";
import {revalidatePath} from "next/cache";


export const createActivity = async (activity: CreateActivityParams) => {

    try {
        const newActivity = await databases.createDocument(
            DATABASE_ID!,
            ACTIVITY_COLLECTION_ID!,
            ID.unique(),
            activity
        )
        return parseStringify(newActivity)
    } catch (error) {
        console.log(error)
    }
}

export const getActivity = async (activityId: string) => {
    try {
        const activity = await databases.getDocument(
            DATABASE_ID!,
            ACTIVITY_COLLECTION_ID!,
            activityId
        );

        return parseStringify(activity);
    } catch (error) {
        console.error(
            error
        );
    }
};

export const getRecentActivityList = async () => {
    try {
        const activities = await databases.listDocuments(
            DATABASE_ID!,
            ACTIVITY_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        )
        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            canceledCount: 0,
        }
        const counts = (activities.documents).reduce((acc, activity) => {
            if (activity.status === 'scheduled') {
                acc.scheduledCount +=1;
            } else if (activity.status === 'pending') {
                acc.pendingCount +=1;
            } else if (activity.status === 'canceled') {
                acc.canceledCount += 1;
            }

            return acc;
        }, initialCounts)

        const data = {
            totalCount: activities.total,
            ...counts,
            documents: activities.documents,
        }

        return parseStringify(data)
    } catch (error) {
        console.log(error)
    }
}


export const updateActivity = async ({
            activityId,
            activity,
     }: UpdateActivityParams) => {
    try {
        const updatedActivity = await databases.updateDocument(
            DATABASE_ID!,
            ACTIVITY_COLLECTION_ID!,
            activityId,
            activity
        );
        if (!updatedActivity) throw Error;
        console.log('CANCEL ACTIVITY')
        revalidatePath("/admin");
        return parseStringify(updatedActivity);
    } catch (error) {
        console.error("An error occurred while scheduling an activity:", error);
    }
};

