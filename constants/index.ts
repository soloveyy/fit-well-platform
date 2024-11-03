export const GenderOptions = ["Male", "Female", "Other"];

export const AgeRangeOptions = ["Under 18", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"];

export const LevelsOptions = ["Beginner", "Intermediate", "Advanced"];

export const TimeCommitmentOptions = ["1-2 days/week", "3-4 days/week", "5+ days/week", "flexible"]

export const MemberSignupDefaults = {
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "Male" as Gender,
    height: "",
    weight: "",
    primary_goal: "",
    secondary_goals: "",
    fitness_level: "",
    experience: "",
    fitness_goals_detail: "",
    preferCoach: "",
    activity_level: "",
    diet_restrictions: "",
    equipment_availability: "",
    exercise_preferences: "",
    time_commitment: "",
    injuries: "",
    chronic_conditions: "",
    allergies: "",
    identificationType: "",
    identificationDocument: [],
    treatmentConsent: false,
    disclosureConsent: false,
    privacyConsent: false,
};

export const Coaches = [
    {
        image: "/assets/images/avatar_male.png",
        name: "Ethan Carter",
    },
    {
        image: "/assets/images/avatar_female.png",
        name: "Olivia Harris",
    },
    {
        image: "/assets/images/avatar_male.png",
        name: "Noah Miller",
    },
    {
        image: "/assets/images/avatar_female.png",
        name: "Ava Johnson",
    },
    {
        image: "/assets/images/avatar_male.png",
        name: "William Brown",
    },
    {
        image: "/assets/images/avatar_female.png",
        name: "Sophia Wilson",
    },
    {
        image: "/assets/images/avatar_male.png",
        name:  "James Anderson",
    },
    {
        image: "/assets/images/avatar_female.png",
        name: "Emily Taylor",
    },
    {
        image: "/assets/images/avatar_male.png",
        name: "Benjamin Thomas",
    },
];

export const IdentificationTypes = [
    "Birth Certificate",
    "Driver's License",
    "Military ID Card",
    "National Identity Card",
    "Passport",
    "Student ID Card",
];

export const StatusIcon = {
    scheduled: "/assets/icons/check.svg",
    pending: "/assets/icons/pending.svg",
    canceled: "/assets/icons/cancelled.svg",
}