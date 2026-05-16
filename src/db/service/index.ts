import {createCrudService} from './_base';
import Profile, {IProfile} from '@/db/scheme/profile';
import Project, {IProject} from '@/db/scheme/project';
import Experience, {IExperience} from '@/db/scheme/experience';
import Skill, {ISkill} from '@/db/scheme/skill';
import Education, {IEducation} from '@/db/scheme/education';
import Certification, {ICertification} from '@/db/scheme/certification';
import Writing, {IWriting} from '@/db/scheme/writing';
import OpenSource, {IOpenSource} from '@/db/scheme/openSource';
import EventModel, {IEvent} from '@/db/scheme/event';
import Coursework, {ICoursework} from '@/db/scheme/coursework';
import SocialProof, {ISocialProof} from '@/db/scheme/socialProof';

// One createCrudService line per domain. To add a domain: add a schema,
// add a line here, add a Zod schema, add an admin folder.
export const profileService = createCrudService<IProfile>(Profile);
export const projectService = createCrudService<IProject>(Project);
export const experienceService = createCrudService<IExperience>(Experience);
export const skillService = createCrudService<ISkill>(Skill);
export const educationService = createCrudService<IEducation>(Education);
export const certificationService = createCrudService<ICertification>(Certification);
export const writingService = createCrudService<IWriting>(Writing);
export const openSourceService = createCrudService<IOpenSource>(OpenSource);
export const eventService = createCrudService<IEvent>(EventModel);
export const courseworkService = createCrudService<ICoursework>(Coursework);
export const socialProofService = createCrudService<ISocialProof>(SocialProof);

/** Registry used by the generic admin CRUD API (Phase 2). */
export const services = {
    profile: profileService,
    project: projectService,
    experience: experienceService,
    skill: skillService,
    education: educationService,
    certification: certificationService,
    writing: writingService,
    openSource: openSourceService,
    event: eventService,
    coursework: courseworkService,
    socialProof: socialProofService,
} as const;

export type DomainKey = keyof typeof services;

export const SINGLETON_DOMAINS: DomainKey[] = ['profile', 'socialProof'];

// ---- Domain-specific read helpers (used by the public site) ----

export const getProfile = () => profileService.getSingleton();

export const getSocialProof = () => socialProofService.getSingleton();

export const getFeaturedProjects = () =>
    projectService.list({filter: {featured: true}, sort: {order: 1}});

export const getAllProjects = () =>
    projectService.list({sort: {featured: -1, order: 1}});

export const getExperience = () =>
    experienceService.list({sort: {order: 1, startDate: -1}});

export const getSkills = () =>
    skillService.list({sort: {category: 1, order: 1}});

export const getEducation = () =>
    educationService.list({sort: {order: 1, startDate: -1}});

export const getCertifications = () =>
    certificationService.list({sort: {order: 1}});

export const getWriting = () =>
    writingService.list({sort: {featured: -1, order: 1}});

export const getFeaturedWriting = () =>
    writingService.list({filter: {featured: true}, sort: {order: 1}});

export const getOpenSource = () =>
    openSourceService.list({sort: {order: 1}});

export const getEvents = () =>
    eventService.list({sort: {order: 1, date: -1}});

export const getCoursework = () =>
    courseworkService.list({sort: {order: 1}});
