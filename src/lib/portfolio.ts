import {
    getProfile,
    getFeaturedProjects,
    getAllProjects,
    getExperience,
    getSkills,
    getEducation,
    getCertifications,
    getWriting,
    getOpenSource,
    getEvents,
    getCoursework,
    getSocialProof,
} from '@/db/service';

async function safe<T>(label: string, p: Promise<T>, fallback: T): Promise<T> {
    try {
        return await p;
    } catch (e) {
        // Surface the real reason (bad MONGODB_URI, auth, unseeded, etc.)
        // instead of silently rendering an empty site.
        console.error(`[portfolio] ${label} failed:`, e instanceof Error ? e.message : e);
        return fallback;
    }
}

/**
 * Loads everything the public site needs in parallel. Every call is
 * individually guarded so an unreachable DB degrades to empty sections
 * instead of crashing the render/build.
 */
export async function loadPortfolio() {
    const [
        profile,
        featuredProjects,
        allProjects,
        experience,
        skills,
        education,
        certifications,
        writing,
        openSource,
        events,
        coursework,
        socialProof,
    ] = await Promise.all([
        safe('profile', getProfile(), null),
        safe('featuredProjects', getFeaturedProjects(), []),
        safe('allProjects', getAllProjects(), []),
        safe('experience', getExperience(), []),
        safe('skills', getSkills(), []),
        safe('education', getEducation(), []),
        safe('certifications', getCertifications(), []),
        safe('writing', getWriting(), []),
        safe('openSource', getOpenSource(), []),
        safe('events', getEvents(), []),
        safe('coursework', getCoursework(), []),
        safe('socialProof', getSocialProof(), null),
    ]);

    return {
        profile,
        featuredProjects,
        allProjects,
        experience,
        skills,
        education,
        certifications,
        writing,
        openSource,
        events,
        coursework,
        socialProof,
    };
}

export type PortfolioData = Awaited<ReturnType<typeof loadPortfolio>>;
