"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image";
import {
    Form
} from "@/components/ui/form"
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { SelectItem } from "@/components/ui/select";
import {Dispatch, SetStateAction, useState} from "react";
import {getActivitySchema} from "@/lib/validation";
import {useRouter} from "next/navigation";
import {Coaches} from "@/constants";
import {createActivity, updateActivity} from "@/lib/actions/activity.actions";
import {Activity} from "@/types/appwrite.types";

interface ActionType {
    type: 'create' | 'cancel' | 'schedule';
    userId: string;
    memberId: string;
    activity?: Activity;
    setOpen?: Dispatch<SetStateAction<boolean>>
}

const ActivityForm = (
    {
        type = "create",
        userId,
        memberId,
        activity,
        setOpen,

    }: ActionType) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const ActivityFormValidation = getActivitySchema(type)

    const form = useForm<z.infer<typeof ActivityFormValidation>>({
        resolver: zodResolver(ActivityFormValidation),
        defaultValues: {
            primaryTrainer: activity ? activity?.primaryTrainer : "",
            schedule: activity
                ? new Date(activity?.schedule!)
                : new Date(Date.now()),
            reason: activity ? activity.reason : "",
            note: activity?.note || "",
            cancellationReason: activity?.cancellationReason || "",
        }
    })

const onSubmit = async (values: z.infer<typeof ActivityFormValidation>) => {
    setIsLoading(true)

        let status;
        switch (type) {
            case "schedule":
                status = "scheduled";
                break;
            case "cancel":
                status = "canceled";
                break;
            default:
                status = "pending";
        }

        try {
            if (type === "create" && memberId) {
                const activityData = {
                    userId,
                    member: memberId,
                    primaryTrainer: values.primaryTrainer,
                    schedule: new Date(values.schedule),
                    reason: values.reason!,
                    status: status as Status,
                    note: values.note,
                };

                const newActivity = await createActivity(activityData);
                if(newActivity) {
                    form.reset();
                    router.push(
                        `/members/${userId}/new-activity/success?activityId=${newActivity.$id}`
                    );
                }
            } else {
                const activityToUpdate = {
                    activityId: activity?.$id!,
                    activity: {
                        primaryTrainer: values.primaryTrainer,
                        schedule: new Date(values.schedule),
                        status: status as Status,
                        cancellationReason: values.cancellationReason,
                    },
                };
                console.log(activityToUpdate);
                const updatedActivity = await updateActivity(activityToUpdate);

                if (updatedActivity) {
                    setOpen && setOpen(false);
                    form.reset();
                }
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    }

    let buttonLabel;

    switch (type) {
        case "cancel":
            buttonLabel = "Cancel Activity";
            break;
        case "schedule":
            buttonLabel = "Schedule Activity";
            break;
        default:
            buttonLabel = "Submit Activity";
    }
    console.log("TYPE, ", type)
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <section>
                    <h1 className="text-4xl text-white">New activity</h1>
                    <p className="text-white">Request your new activity in 10 seconds</p>
                </section>

                {type !== "cancel" && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name="primaryTrainer"
                            label="Trainer"
                            placeholder="Select a trainer"
                        >
                            {Coaches.map((coach, i) => (
                                <SelectItem key={coach.name + i} value={coach.name}>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image
                                            src={coach.image}
                                            width={32}
                                            height={32}
                                            alt="coach"
                                            className="rounded-full border border-dark-500"
                                        />
                                        <p>{coach.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected activity date"
                            showTimeSelect
                            dateFormat="MM/dd/yyyy  -  h:mm aa"
                        />

                        <div
                            className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}
                        >
                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="reason"
                                label="What are you looking for in a training session?"
                                placeholder="Weight loss, muscle gain, injury recovery, improve stamina, build strength"
                                disabled={type === "schedule"}
                            />

                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="note"
                                label="Comments/notes"
                                placeholder="Prefer afternoon trainings, if possible"
                                disabled={type === "schedule"}
                            />
                        </div>
                    </>
                )}

                {type === "cancel" && (
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for cancellation"
                        placeholder="Urgent meeting came up"
                    />
                )}

                <SubmitButton
                    isLoading={isLoading}
                    className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
                >
                    {buttonLabel}
                </SubmitButton>
            </form>
        </Form>
    );
};

export default ActivityForm;