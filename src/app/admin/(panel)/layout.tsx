import {FC, PropsWithChildren} from 'react';
import {redirect} from 'next/navigation';
import {getSession} from '@/lib/auth/session';
import AdminShell from '@/components/admin/AdminShell';

// Defense-in-depth: the proxy already gates /admin, but verify the
// session server-side here too before rendering any panel page.
const PanelLayout: FC<PropsWithChildren> = async ({children}) => {
    const session = await getSession();
    if (!session) redirect('/admin/login');
    return <AdminShell>{children}</AdminShell>;
};

export default PanelLayout;
