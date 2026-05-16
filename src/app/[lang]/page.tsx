import {notFound} from 'next/navigation';
import {dictionary, type LanguageEnum} from '@/locales';
import PortfolioPage from '@/components/portfolio/PortfolioPage';

export const revalidate = 60;

export default async function LocalizedHome({
    params,
}: {
    params: Promise<{lang: string}>;
}) {
    const {lang} = await params;
    if (!(lang in dictionary)) notFound();
    return <PortfolioPage lang={lang as LanguageEnum} />;
}
