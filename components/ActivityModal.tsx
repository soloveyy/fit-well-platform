"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Activity } from "@/types/appwrite.types";

import ActivityForm from "./forms/ActivityForm";

import "react-datepicker/dist/react-datepicker.css";

export const ActivityModal = ({
         memberId,
         userId,
         activity,
         type,
     }: {
    memberId: string;
    userId: string;
    activity?: Activity;
    type: "schedule" | "cancel";
    title: string;
    description: string;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className={`capitalize ${type === "schedule" && "text-green-500"}`}
                >
                    {type}
                </Button>
            </DialogTrigger>
            <DialogContent className="shad-dialog sm:max-w-md">
                <DialogHeader className="mb-4 space-y-3">
                    <DialogTitle className="capitalize">{type} Activity</DialogTitle>
                    <DialogDescription>
                        Please fill in the following details to {type} activity
                    </DialogDescription>
                </DialogHeader>

                <ActivityForm
                    userId={userId}
                    memberId={memberId}
                    type={type}
                    activity={activity}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    );
};