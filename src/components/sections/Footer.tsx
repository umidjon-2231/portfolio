import type {IProfile} from '@/db/scheme/profile';
import type {DictionaryType, LanguageEnum} from '@/locales';

export default function Footer({
    profile,
    dict,
}: {
    profile: IProfile | null;
    lang: LanguageEnum;
    dict: DictionaryType;
}) {
    const year = new Date().getFullYear();
    const links = profile?.socialLinks ?? {};
    const items = [
        links.github && {label: 'GitHub', href: links.github},
        links.linkedin && {label: 'LinkedIn', href: links.linkedin},
        links.telegram && {label: 'Telegram', href: links.telegram},
    ].filter(Boolean) as {label: string; href: string}[];

    return (
        <footer className="border-t border-line">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-5 py-12 md:flex-row md:items-center md:px-8">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    © {year} {profile?.fullName ?? 'Umidjon Tojiboyev'} — coded by himself
                </p>
                <div className="flex items-center gap-6 text-sm text-muted">
                    {items.map((i) => (
                        <a
                            key={i.label}
                            href={i.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground"
                        >
                            {i.label}
                        </a>
                    ))}
                    <a href="#top" className="hover:text-foreground">
                        {dict.ui.scroll} ↑
                    </a>
                </div>
            </div>
        </footer>
    );
}
