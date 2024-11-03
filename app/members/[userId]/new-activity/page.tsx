import React from 'react';
import Image from "next/image";
import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";
import ActivityForm from "@/components/forms/ActivityForm";
import {getMember} from "@/lib/actions/member.actions";

const NewActivity = async ({ params: { userId }}: SearchParamProps) => {
    const member = await getMember(userId)
    console.log('MEMBER ', member.$id)
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <div className="flex items-center mb-12">
                        <Image
                            src="/assets/icons/logo.svg"
                            height={1000}
                            width={1000}
                            alt="Real Estate angel"
                            className="h-10 w-fit mr-3"
                        />
                        <span className="font-bold text-white text-2xl">
                        Fitness and Wellness Platform
                    </span>
                    </div>
                    <ActivityForm
                        type="create"
                        userId={userId}
                        memberId={member?.$id}
                    />
                </div>
            </section>
            <Image
                src="/assets/images/view-notebook-with-pen.jpg"
                width={1000}
                height={1000}
                alt="test alt"
                className="side-img max-w-[40%]"
            />
        </div>
    );
};

export default NewActivity;