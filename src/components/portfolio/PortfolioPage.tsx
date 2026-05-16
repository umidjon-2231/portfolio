import {dictionary, type LanguageEnum} from '@/locales';
import {loadPortfolio} from '@/lib/portfolio';
import SiteNav from '@/components/sections/SiteNav';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import SelectedWork from '@/components/sections/SelectedWork';
import Experience from '@/components/sections/Experience';
import WritingOpenSource from '@/components/sections/WritingOpenSource';
import SkillsMarquee from '@/components/sections/SkillsMarquee';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default async function PortfolioPage({lang}: {lang: LanguageEnum}) {
    const data = await loadPortfolio();
    const dict = dictionary[lang] ?? dictionary.en;

    return (
        <>
            <SiteNav lang={lang} dict={dict} />
            <main>
                <Hero profile={data.profile} lang={lang} dict={dict} />
                <About profile={data.profile} lang={lang} dict={dict} />
                <SelectedWork
                    projects={data.featuredProjects.length ? data.featuredProjects : data.allProjects}
                    lang={lang}
                    dict={dict}
                />
                <Experience experience={data.experience} lang={lang} dict={dict} />
                <WritingOpenSource
                    writing={data.writing}
                    openSource={data.openSource}
                    lang={lang}
                    dict={dict}
                />
                <SkillsMarquee skills={data.skills} lang={lang} dict={dict} />
                <Contact profile={data.profile} lang={lang} dict={dict} />
            </main>
            <Footer profile={data.profile} lang={lang} dict={dict} />
        </>
    );
}
