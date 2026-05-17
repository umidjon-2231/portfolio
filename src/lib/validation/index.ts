import {z} from 'zod';

/** Trilingual value: EN required, RU/UZ optional (graceful fallback to EN). */
export const zLocalized = z.object({
    en: z.string().trim().min(1, 'English text is required'),
    ru: z.string().trim().optional().default(''),
    uz: z.string().trim().optional().default(''),
});

const zObjectId = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid id')
    .optional();

const zUrl = z.string().trim().url().optional().or(z.literal(''));
const zDate = z.coerce.date().optional();
const order = z.number().int().default(0);

export const profileSchema = z.object({
    fullName: z.string().trim().min(1),
    headline: zLocalized,
    shortBio: zLocalized,
    longBio: zLocalized,
    city: zLocalized,
    age: z.number().int().positive().optional(),
    status: zLocalized,
    avatar: zObjectId,
    cv: zObjectId,
    socialLinks: z
        .object({
            github: zUrl,
            linkedin: zUrl,
            x: zUrl,
            telegram: zUrl,
            instagram: zUrl,
            email: z.string().trim().optional(),
        })
        .default({}),
    careerGoals: z.array(zLocalized).default([]),
});

export const projectSchema = z.object({
    title: zLocalized,
    description: zLocalized,
    techStack: z.array(z.string().trim()).default([]),
    links: z
        .object({
            github: zUrl,
            liveDemo: zUrl,
            npm: zUrl,
            other: zUrl,
        })
        .default({}),
    featured: z.boolean().default(false),
    coverImage: zObjectId,
    category: z.string().trim().optional(),
    order,
});

export const experienceSchema = z.object({
    role: zLocalized,
    company: z.string().trim().min(1),
    employmentType: z.string().trim().optional(),
    location: z.string().trim().optional(),
    remote: z.boolean().default(false),
    startDate: z.coerce.date(),
    endDate: zDate,
    current: z.boolean().default(false),
    description: zLocalized,
    highlights: z.array(zLocalized).default([]),
    techStack: z.array(z.string().trim()).default([]),
    order,
});

export const skillSchema = z.object({
    name: z.string().trim().min(1),
    category: z.string().trim().min(1),
    logo: z.string().trim().optional(),
    description: zLocalized.optional(),
    order,
});

export const educationSchema = z.object({
    institution: z.string().trim().min(1),
    degree: zLocalized,
    field: zLocalized.optional(),
    startDate: zDate,
    endDate: zDate,
    grade: z.string().trim().optional(),
    notes: z.array(zLocalized).default([]),
    order,
});

export const certificationSchema = z.object({
    name: zLocalized,
    issuer: z.string().trim().min(1),
    date: zDate,
    url: zUrl,
    order,
});

export const writingSchema = z.object({
    title: zLocalized,
    summary: zLocalized,
    platform: z.string().trim().min(1),
    url: z.string().trim().url(),
    metrics: zLocalized.optional(),
    date: zDate,
    featured: z.boolean().default(false),
    order,
});

export const openSourceSchema = z.object({
    name: z.string().trim().min(1),
    description: zLocalized,
    url: z.string().trim().url(),
    repoUrl: zUrl,
    order,
});

export const eventSchema = z.object({
    title: zLocalized,
    description: zLocalized,
    date: zDate,
    order,
});

export const courseworkSchema = z.object({
    title: zLocalized,
    description: zLocalized,
    tools: z.array(z.string().trim()).default([]),
    topics: z.array(z.string().trim()).default([]),
    order,
});

export const socialProofSchema = z.object({
    items: z
        .array(
            z.object({
                platform: z.string().trim().min(1),
                stat: zLocalized,
                url: zUrl,
                order,
            }),
        )
        .default([]),
});

/** Registry parallel to `services` (src/db/service) keyed by domain. */
export const validators = {
    profile: profileSchema,
    project: projectSchema,
    experience: experienceSchema,
    skill: skillSchema,
    education: educationSchema,
    certification: certificationSchema,
    writing: writingSchema,
    openSource: openSourceSchema,
    event: eventSchema,
    coursework: courseworkSchema,
    socialProof: socialProofSchema,
} as const;

export type ValidatorKey = keyof typeof validators;

export type ProfileInput = z.infer<typeof profileSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
export type EducationInput = z.infer<typeof educationSchema>;
export type CertificationInput = z.infer<typeof certificationSchema>;
export type WritingInput = z.infer<typeof writingSchema>;
export type OpenSourceInput = z.infer<typeof openSourceSchema>;
export type EventInput = z.infer<typeof eventSchema>;
export type CourseworkInput = z.infer<typeof courseworkSchema>;
export type SocialProofInput = z.infer<typeof socialProofSchema>;
