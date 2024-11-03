"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form, FormControl
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label"
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import Image from "next/image";
import {useState} from "react";
import {MemberSignUpFormValidation, UserFormValidation} from "@/lib/validation";
import {useRouter} from "next/navigation";
import {createUser, registerMember} from "@/lib/actions/member.actions";
import {
    AgeRangeOptions,
    Coaches,
    GenderOptions,
    IdentificationTypes,
    LevelsOptions,
    TimeCommitmentOptions,
    MemberSignupDefaults
} from "@/constants";
import DatePicker from 'react-datepicker';
import FileUploader from "@/components/FileUploader";

export enum FormFieldType {
    INPUT = 'input',
    PHONE_INPUT = 'phoneInput',
    DATE_PICKER = 'datePicker',
    SKELETON = 'skeleton',
    SELECT = 'select',
    CHECKBOX = 'checkbox',
}

const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    // 1. Define your form.
    const form = useForm<z.infer<typeof MemberSignUpFormValidation>>({
        resolver: zodResolver(MemberSignUpFormValidation),
        defaultValues: {
            ...MemberSignupDefaults,
            name: "",
            email: "",
            phone: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof MemberSignUpFormValidation>) {
        setIsLoading(true)

        let formData;

        if(values.identificationDocument && values.identificationDocument.length > 0) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type,
            })

            formData = new FormData()
            formData.append("blobFile", blobFile)
            formData.append('fileName', values.identificationDocument[0].name)
        }

        try {
            const memberData = {
                ...values,
                userId: user.$id,
                identificationDocument: formData,
            }
            console.log(memberData)
            // @ts-ignore
            const member = await registerMember(memberData)
            if(member) router.push(`/members/${user.$id}/new-activity`)

        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <section className="space-y-4">
                    <h1 className="text-4xl text-white">Welcome 👋</h1>
                    <p className="text-gray-500">Lets us know more about you</p>
                </section>
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header text-white">Personal information</h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/person.svg"
                    iconAlt="user"
                />

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="email"
                        label="Email address"
                        placeholder="johndoe@gmail.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="email"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Phone Number"
                        placeholder="(555) 123-4567"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row text-white">
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="age"
                        label="Age"
                        placeholder="Select age range"
                    >
                        {AgeRangeOptions.map((coach, i) => (
                            <SelectItem key={coach + i} value={coach}>
                                <div className="flex cursor-pointer items-center gap-2">
                                    <p>{coach}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </CustomFormField>

                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup
                                    className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOptions.map((option, i) => (
                                        <div key={option + i} className="radio-group">
                                            <RadioGroupItem value={option} id={option}/>
                                            <Label htmlFor={option} className="cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row text-white">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="height"
                        label="Height"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="weight"
                        label="Weight"
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header text-white">Fitness Goals</h2>
                    </div>
                </section>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="primary_goal"
                        label="Primary goal"
                        placeholder="Weight loss,"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="secondary_goals"
                        label="Secondary goal"
                        placeholder="Muscle gain, improved fitness, "
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="fitness_level"
                        label="Fitness Level"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup
                                    className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {LevelsOptions.map((option, i) => (
                                        <div key={option + i} className="radio-group">
                                            <RadioGroupItem value={option} id={option}/>
                                            <Label htmlFor={option} className="cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="experience"
                        label="Experience"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup
                                    className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {LevelsOptions.map((option, i) => (
                                        <div key={option + i} className="radio-group">
                                            <RadioGroupItem value={option} id={option}/>
                                            <Label htmlFor={option} className="cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="fitness_goals_detail"
                        label="Your fitness goals in detail"
                        placeholder="Lose 5kg in 3 months"
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header text-white">Lifestyle and Preferences</h2>
                    </div>
                </section>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="preferCOach"
                        label="Preferred Coach"
                        placeholder="Select a trainer"
                    >
                        {Coaches.map(({name, image}, i) => (
                            <SelectItem key={name + i} value={name}>
                                <div className="flex cursor-pointer items-center gap-2">
                                    <Image
                                        src={image}
                                        width={32}
                                        height={32}
                                        alt="trainer"
                                        className="rounded-full border border-dark-500"
                                    />
                                    <p>{name}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </CustomFormField>
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="activity_level"
                        label="Activity level"
                        placeholder="Sedentory, lightly active,"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="diet_restrictions"
                        label="Dietory restrictions"
                        placeholder="Lactose intorelant, gluten free"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="equipment_availability"
                        label="Equipment availability"
                        placeholder="Home gym / gym membership"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="exercise_preferences"
                        label="Exercise preferences"
                        placeholder="Strenght training, joga"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="time_commitment"
                        label="Time commitment"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup
                                    className="grid grid-cols-2 gap-4 content-start"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {TimeCommitmentOptions.map((option, i) => (
                                        <div key={option + i} className="radio-group">
                                            <RadioGroupItem value={option} id={option}/>
                                            <Label htmlFor={option} className="cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header text-white">Medical Information</h2>
                    </div>
                </section>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="injuries"
                        label="Injuries"
                        placeholder="Knee injury"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="chronic_conditions"
                        label="Chronic conditions"
                        placeholder="Asthma"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row text-white">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="allergies"
                        label="Allergies"
                        placeholder="Pollen, nuts"
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header text-white">Identification and Verfication</h2>
                    </div>

                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="identificationType"
                        label="Identification Type"
                        placeholder="Select identification type"
                    >
                        {IdentificationTypes.map((type, i) => (
                            <SelectItem key={type + i} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </CustomFormField>

                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="identificationDocument"
                        label="Scanned Copy of Identification Document"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <FileUploader files={field.value} onChange={field.onChange}/>
                            </FormControl>
                        )}
                    />
                </section>

                <section className="space-y-6 text-white">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Consent and Privacy</h2>
                    </div>

                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="treatmentConsent"
                        label="I consent to receive treatment for my health condition."
                    />

                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="disclosureConsent"
                        label="I consent to the use and disclosure of my health
            information for treatment purposes."
                    />

                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="privacyConsent"
                        label="I acknowledge that I have reviewed and agree to the
            privacy policy"
                    />
                </section>

                <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
            </form>
        </Form>
    );
};

export default RegisterForm;