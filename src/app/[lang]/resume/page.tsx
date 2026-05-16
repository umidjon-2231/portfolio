import {notFound} from 'next/navigation';
import {dictionary, type LanguageEnum} from '@/locales';
import {loadPortfolio} from '@/lib/portfolio';
import ResumeDense from '@/components/sections/ResumeDense';

export const revalidate = 60;

export default async function LocalizedResume({
    params,
}: {
    params: Promise<{lang: string}>;
}) {
    const {lang} = await params;
    if (!(lang in dictionary)) notFound();
    const data = await loadPortfolio();
    const l = lang as LanguageEnum;
    return <ResumeDense data={data} lang={l} dict={dictionary[l] ?? dictionary.en} />;
}
