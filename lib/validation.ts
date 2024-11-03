import {z} from "zod";

export const UserFormValidation = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
})

export const MemberSignUpFormValidation = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
    activity_level: z.string().optional(),
    diet_restrictions: z.string().optional(),
    equipment_availability: z.string().optional(),
    exercise_preferences: z.string().optional(),
    time_commitment: z.string().optional(),
    injuries: z.string().optional(),
    chronic_conditions: z.string().optional(),
    allergies: z.string().optional(),
    identificationType: z.string().optional(),
    identificationNumber: z.string().optional(),
    identificationDocument: z.custom<File[]>().optional(),
    treatmentConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "You must consent to treatment in order to proceed",
        }),
    disclosureConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "You must consent to disclosure in order to proceed",
        }),
    privacyConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "You must consent to privacy in order to proceed",
        }),
});

export const CreateActivitySchema = z.object({
    primaryTrainer: z.string().min(2, "Select at least one trainer"),
    schedule: z.coerce.date(),
    reason: z
        .string()
        .min(2, "Reason must be at least 2 characters")
        .max(500, "Reason must be at most 500 characters"),
    note: z.string().optional(),
    cancellationReason: z.string().optional(),
});

export const ScheduleActivitySchema = z.object({
    primaryTrainer: z.string().min(2, "Select at least one trainer"),
    schedule: z.coerce.date(),
    reason: z.string().optional(),
    note: z.string().optional(),
    cancellationReason: z.string().optional(),
});

export const CancelActivitySchema = z.object({
    primaryTrainer: z.string().min(2, "Select at least one trainer"),
    schedule: z.coerce.date(),
    reason: z.string().optional(),
    note: z.string().optional(),
    cancellationReason: z
        .string()
        .min(2, "Reason must be at least 2 characters")
        .max(500, "Reason must be at most 500 characters"),
});

export function getActivitySchema(type: string) {
    switch (type) {
        case "create":
            return CreateActivitySchema;
        case "cancel":
            return CancelActivitySchema;
        default:
            return ScheduleActivitySchema;
    }
}