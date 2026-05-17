import {dictionary} from '@/locales';
import {loadPortfolio} from '@/lib/portfolio';
import ResumeDense from '@/components/sections/ResumeDense';

export const revalidate = 60;

export const metadata = {title: 'Résumé — Umidjon Tojiboyev'};

export default async function ResumePage() {
    const data = await loadPortfolio();
    return <ResumeDense data={data} lang="en" dict={dictionary.en} />;
}
