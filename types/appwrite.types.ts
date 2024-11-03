import { Models } from "node-appwrite";

export interface Member extends Models.Document {
    userId?: string;
    name?: string;
    email?: string;
    phone?: string;
    birthDate?: Date;
    gender?: Gender;
    address?: string;
    occupation?: string;
    emergencyContactName?: string;
    emergencyContactNumber?: string;
    primaryPhysician?: string;
    insuranceProvider?: string;
    insurancePolicyNumber?: string;
    allergies?: string;
    currentMedication?: string;
    familyMedicalHistory?: string;
    pastMedicalHistory?: string;
    identificationType?: string;
    identificationNumber?: string;
    identificationDocument?: FormData;
    privacyConsent?: boolean;
}

export interface Activity extends Models.Document {
    member: Member;
    schedule: Date;
    status: Status;
    primaryPhysician: string;
    reason: string;
    note: string;
    userId: string;
    cancellationReason: string | null;
}

export interface UpdateActivityParams {
    activityId: string;
    activity: {
        primaryTrainer: string;
        schedule: Date;
        status: Status;
        cancellationReason: string | undefined;
    }
}