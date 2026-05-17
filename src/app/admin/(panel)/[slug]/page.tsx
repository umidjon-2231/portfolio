import {notFound} from 'next/navigation';
import {domainBySlug} from '@/lib/admin/config';
import DomainEditor from '@/components/admin/DomainEditor';

export default async function DomainPage({
    params,
}: {
    params: Promise<{slug: string}>;
}) {
    const {slug} = await params;
    const meta = domainBySlug(slug);
    if (!meta) notFound();

    return (
        <DomainEditor
            domainKey={meta.key}
            singleton={meta.singleton}
            label={meta.label}
        />
    );
}
