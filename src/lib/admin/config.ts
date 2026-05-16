import type {DomainKey} from '@/db/service';

export interface DomainMeta {
    key: DomainKey;
    /** URL segment under /admin */
    slug: string;
    label: string;
    singleton: boolean;
    /** Short hint shown on the dashboard. */
    hint: string;
}

/** Ordered nav/dashboard list. Add a domain here to surface it in the UI. */
export const DOMAINS: DomainMeta[] = [
    {key: 'profile', slug: 'profile', label: 'Profile', singleton: true, hint: 'Name, bios, status, social links, career goals'},
    {key: 'project', slug: 'projects', label: 'Projects', singleton: false, hint: 'Selected work & full portfolio'},
    {key: 'experience', slug: 'experience', label: 'Experience', singleton: false, hint: 'Roles, companies, highlights'},
    {key: 'skill', slug: 'skills', label: 'Skills', singleton: false, hint: 'Tech stack by category'},
    {key: 'writing', slug: 'writing', label: 'Writing', singleton: false, hint: 'Articles & publications'},
    {key: 'openSource', slug: 'open-source', label: 'Open Source', singleton: false, hint: 'Published packages'},
    {key: 'education', slug: 'education', label: 'Education', singleton: false, hint: 'Degrees & courses'},
    {key: 'certification', slug: 'certifications', label: 'Certifications', singleton: false, hint: 'Certificates'},
    {key: 'event', slug: 'events', label: 'Events', singleton: false, hint: 'Notable events'},
    {key: 'coursework', slug: 'coursework', label: 'Coursework', singleton: false, hint: 'AI/ML coursework'},
    {key: 'socialProof', slug: 'social-proof', label: 'Social Proof', singleton: true, hint: 'Platform stats'},
];

export const domainBySlug = (slug: string): DomainMeta | undefined =>
    DOMAINS.find((d) => d.slug === slug);
