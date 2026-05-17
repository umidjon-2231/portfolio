import {FC, PropsWithChildren} from 'react';

// Segment boundary for /admin. The real auth gate is the proxy
// (src/proxy.ts) plus the (panel) layout's server-side getSession check.
// /admin/login lives outside the (panel) shell.
const AdminLayout: FC<PropsWithChildren> = ({children}) => <>{children}</>;

export default AdminLayout;
