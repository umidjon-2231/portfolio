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

async function safe<T>(p: Promise<T>, fallback: T): Promise<T> {
    try {
        return await p;
    } catch {
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
        safe(getProfile(), null),
        safe(getFeaturedProjects(), []),
        safe(getAllProjects(), []),
        safe(getExperience(), []),
        safe(getSkills(), []),
        safe(getEducation(), []),
        safe(getCertifications(), []),
        safe(getWriting(), []),
        safe(getOpenSource(), []),
        safe(getEvents(), []),
        safe(getCoursework(), []),
        safe(getSocialProof(), null),
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
