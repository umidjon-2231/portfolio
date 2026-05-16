/**
 * One-shot, idempotent seed. Run with `pnpm db:seed`.
 * - Singletons (Profile, SocialProof): created only if absent (never
 *   overwrites admin edits).
 * - Collections: inserted only if the collection is empty.
 * Safe to re-run in any environment.
 */
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Profile from '@/db/scheme/profile';
import Project from '@/db/scheme/project';
import Experience from '@/db/scheme/experience';
import Skill from '@/db/scheme/skill';
import Education from '@/db/scheme/education';
import Certification from '@/db/scheme/certification';
import Writing from '@/db/scheme/writing';
import OpenSource from '@/db/scheme/openSource';
import EventModel from '@/db/scheme/event';
import Coursework from '@/db/scheme/coursework';
import SocialProof from '@/db/scheme/socialProof';
import {
    profileSeed,
    experienceSeed,
    projectSeed,
    skillSeed,
    educationSeed,
    certificationSeed,
    writingSeed,
    openSourceSeed,
    eventSeed,
    courseworkSeed,
    socialProofSeed,
} from './data';

async function seedSingleton(
    name: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    model: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    doc: any,
) {
    const existing = await model.findOne().select('_id').lean();
    if (existing) {
        console.log(`• ${name}: already present — skipped`);
        return;
    }
    await model.create(doc);
    console.log(`✓ ${name}: created`);
}

async function seedCollection(
    name: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    model: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    docs: any[],
) {
    const count = await model.countDocuments();
    if (count > 0) {
        console.log(`• ${name}: ${count} docs present — skipped`);
        return;
    }
    await model.insertMany(docs);
    console.log(`✓ ${name}: inserted ${docs.length}`);
}

async function main() {
    await dbConnect();
    console.log('Connected. Seeding…\n');

    await seedSingleton('Profile', Profile, profileSeed);
    await seedSingleton('SocialProof', SocialProof, socialProofSeed);

    await seedCollection('Experience', Experience, experienceSeed);
    await seedCollection('Project', Project, projectSeed);
    await seedCollection('Skill', Skill, skillSeed);
    await seedCollection('Education', Education, educationSeed);
    await seedCollection('Certification', Certification, certificationSeed);
    await seedCollection('Writing', Writing, writingSeed);
    await seedCollection('OpenSource', OpenSource, openSourceSeed);
    await seedCollection('Event', EventModel, eventSeed);
    await seedCollection('Coursework', Coursework, courseworkSeed);

    console.log('\nDone.');
    await mongoose.disconnect();
    process.exit(0);
}

main().catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
});
