import Image from "next/image";
import MemberForm from "@/components/forms/MemberForm";
import Link from "next/link";
import OTPVerificationModal from "@/components/OTPVerificationModal";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
        { isAdmin && <OTPVerificationModal/> }
        <section className="remove-scrollbar container my-auto">
            <div className="sub-container max-w-[496px]">
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
                    </span>searchParams.isAdmin
                </div>
                <MemberForm />
                <div className="mt-20 flex justify-between text-red-500">
                    <Link href="/?admin=true">
                        Admin
                    </Link>
                </div>
            </div>
        </section>
        <Image
            src="/assets/images/kettlebell-gym-equipment-still-life.jpg"
            width={1000}
            height={1000}
            alt="test alt"
            className="side-img max-w-[50%]"
        />
    </div>
  );
}
