import React from 'react';
import {Button} from "@/components/ui/button";
import Image from "next/image";

interface ButtonProps {
    className?: string;
    isLoading: boolean;
    children?: React.ReactNode;
}

const  SubmitButton = ({ isLoading, className, children}: ButtonProps) => {
    return (
        <Button
            type="submit"
            disabled={isLoading}
            className={className ?? 'shad-primary-btn w-full rounded'}
        >
            {isLoading ? (
                <div className="flex items-center gap-4">
                    <Image
                        src="/assets/icons/loader.svg"
                        alt="loader"
                        width={24}
                        height={24}
                        className="animate-spin"
                    />
                    Processing
                </div>
            ) : (
                children
            )}
        </Button>
    );
};

export default SubmitButton;