'use client'

import React, {useEffect, useState} from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import {decryptKey, encryptKey} from "@/lib/utils";

const OTPVerificationModal = () => {
    const router = useRouter();
    const path = usePathname();
    const [open, setOpen] = useState(true)
    const [passkey, setPasskey] = useState("")
    const [error, setError] = useState("")

    const encryptedKey =
        typeof window !== "undefined"
            ? window.localStorage.getItem("accessKey")
            : null;

    useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey);

        if (path)
            if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY!.toString()) {
                setOpen(false);
                router.push("/admin");
            } else {
                setOpen(true);
            }
    }, [encryptedKey]);

    const closeModal = () => {
        setOpen(false);
        router.push("/");
    }

    const validatePassKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if(passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passkey)
            localStorage.setItem('accessKey', encryptedKey)
        } else {
            setError('Invalid passkey. Please try again')
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-start justify-between">
                        Administrator Authentication
                        <Image
                            src="/assets/icons/close.svg"
                            alt="close"
                            width={20}
                            height={20}
                            onClick={() => closeModal()}
                            className="cursor-pointer"
                        />
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter your passkey to proceed to the admin page
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                    <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    {error && <p className="shad-error mt-5 flex justify-center">{error}</p>}
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => closeModal()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={(e)=> validatePassKey(e)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default OTPVerificationModal;