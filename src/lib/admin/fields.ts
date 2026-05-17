import type {DomainKey} from '@/db/service';

export type FieldType =
    | 'text'
    | 'localized' // single-line {en,ru,uz}
    | 'localizedText' // multi-line {en,ru,uz}
    | 'number'
    | 'date'
    | 'boolean'
    | 'tags' // string[]
    | 'localizedList' // LocalizedString[]
    | 'image'
    | 'group' // nested fixed object
    | 'objectList'; // array of fixed-shape objects

export interface FieldDef {
    name: string;
    label: string;
    type: FieldType;
    help?: string;
    accept?: string; // for image
    fields?: FieldDef[]; // for group / objectList
}

const tx = (name: string, label: string): FieldDef => ({name, label, type: 'text'});

export const FORM_FIELDS: Record<DomainKey, FieldDef[]> = {
    profile: [
        tx('fullName', 'Full name'),
        {name: 'headline', label: 'Headline', type: 'localized'},
        {name: 'shortBio', label: 'Short bio', type: 'localizedText'},
        {name: 'longBio', label: 'Long bio', type: 'localizedText'},
        {name: 'city', label: 'City', type: 'localized'},
        {name: 'age', label: 'Age', type: 'number'},
        {name: 'status', label: 'Status', type: 'localized'},
        {name: 'avatar', label: 'Avatar', type: 'image', accept: 'image/*'},
        {name: 'cv', label: 'CV (PDF)', type: 'image', accept: 'application/pdf'},
        {
            name: 'socialLinks',
            label: 'Social links',
            type: 'group',
            fields: [
                tx('github', 'GitHub'),
                tx('linkedin', 'LinkedIn'),
                tx('x', 'X'),
                tx('telegram', 'Telegram'),
                tx('instagram', 'Instagram'),
                tx('email', 'Email'),
            ],
        },
        {name: 'careerGoals', label: 'Career goals', type: 'localizedList'},
    ],
    project: [
        {name: 'title', label: 'Title', type: 'localized'},
        {name: 'description', label: 'Description', type: 'localizedText'},
        {name: 'techStack', label: 'Tech stack', type: 'tags'},
        {
            name: 'links',
            label: 'Links',
            type: 'group',
            fields: [tx('github', 'GitHub'), tx('liveDemo', 'Live demo'), tx('npm', 'npm'), tx('other', 'Other')],
        },
        {name: 'featured', label: 'Featured (Selected Work)', type: 'boolean'},
        {name: 'coverImage', label: 'Cover image', type: 'image', accept: 'image/*'},
        tx('category', 'Category'),
        {name: 'order', label: 'Order', type: 'number'},
    ],
    experience: [
        {name: 'role', label: 'Role', type: 'localized'},
        tx('company', 'Company'),
        tx('employmentType', 'Employment type'),
        tx('location', 'Location'),
        {name: 'remote', label: 'Remote', type: 'boolean'},
        {name: 'startDate', label: 'Start date', type: 'date'},
        {name: 'endDate', label: 'End date', type: 'date'},
        {name: 'current', label: 'Current role', type: 'boolean'},
        {name: 'description', label: 'Description', type: 'localizedText'},
        {name: 'highlights', label: 'Highlights', type: 'localizedList'},
        {name: 'techStack', label: 'Tech stack', type: 'tags'},
        {name: 'order', label: 'Order', type: 'number'},
    ],
    skill: [
        tx('name', 'Name'),
        tx('category', 'Category'),
        tx('logo', 'Logo (url/identifier)'),
        {name: 'description', label: 'Description', type: 'localizedText'},
        {name: 'order', label: 'Order', type: 'number'},
    ],
    education: [
        tx('institution', 'Institution'),
        {name: 'degree', label: 'Degree', type: 'localized'},
        {name: 'field', label: 'Field', type: 'localized'},
        {name: 'startDate', label: 'Start date', type: 'date'},
        {name: 'endDate', label: 'End date', type: 'date'},
        tx('grade', 'Grade'),
        {name: 'notes', label: 'Notes', type: 'localizedList'},
        {name: 'order', label: 'Order', type: 'number'},
    ],
    certification: [
        {name: 'name', label: 'Name', type: 'localized'},
        tx('issuer', 'Issuer'),
        {name: 'date', label: 'Date', type: 'date'},
        tx('url', 'URL'),
        {name: 'order', label: 'Order', type: 'number'},
    ],
    writing: [
        {name: 'title', label: 'Title', type: 'localized'},
        {name: 'summary', label: 'Summary', type: 'localizedText'},
        tx('platform', 'Platform'),
        tx('url', 'URL'),
        {name: 'metrics', label: 'Metrics', type: 'localized'},
        {name: 'date', label: 'Date', type: 'date'},
        {name: 'featured', label: 'Featured', type: 'boolean'},
        {name: 'order', label: 'Order', type: 'number'},
    ],
    openSource: [
        tx('name', 'Name'),
        {name: 'description', label: 'Description', type: 'localizedText'},
        tx('url', 'URL'),
        tx('repoUrl', 'Repository URL'),
        {name: 'order', label: 'Order', type: 'number'},
    ],
    event: [
        {name: 'title', label: 'Title', type: 'localized'},
        {name: 'description', label: 'Description', type: 'localizedText'},
        {name: 'date', label: 'Date', type: 'date'},
        {name: 'order', label: 'Order', type: 'number'},
    ],
    coursework: [
        {name: 'title', label: 'Title', type: 'localized'},
        {name: 'description', label: 'Description', type: 'localizedText'},
        {name: 'tools', label: 'Tools', type: 'tags'},
        {name: 'topics', label: 'Topics', type: 'tags'},
        {name: 'order', label: 'Order', type: 'number'},
    ],
    socialProof: [
        {
            name: 'items',
            label: 'Items',
            type: 'objectList',
            fields: [
                tx('platform', 'Platform'),
                {name: 'stat', label: 'Stat', type: 'localized'},
                tx('url', 'URL'),
                {name: 'order', label: 'Order', type: 'number'},
            ],
        },
    ],
};

/** A short label for list rows of each collection. */
export const ROW_TITLE: Partial<Record<DomainKey, (doc: Record<string, unknown>) => string>> = {
    project: (d) => loc(d.title) || 'Untitled project',
    experience: (d) => `${loc(d.role)} — ${str(d.company)}`,
    skill: (d) => `${str(d.name)} (${str(d.category)})`,
    education: (d) => str(d.institution),
    certification: (d) => loc(d.name),
    writing: (d) => loc(d.title),
    openSource: (d) => str(d.name),
    event: (d) => loc(d.title),
    coursework: (d) => loc(d.title),
};

function str(v: unknown): string {
    return typeof v === 'string' ? v : '';
}
function loc(v: unknown): string {
    if (v && typeof v === 'object' && 'en' in v) return String((v as {en: string}).en ?? '');
    return '';
}
