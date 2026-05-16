import {FC, PropsWithChildren} from 'react';

// TEMPORARY: the old fakeable sessionStorage/email-OTP gate was removed
// (no email OTP — auth is password+JWT). Real protection is added in
// Phase 2 (T15: JWT gate in src/proxy.ts) and Phase 3 (T17: /admin/login).
const Layout: FC<PropsWithChildren> = ({children}) => {
    return <>{children}</>;
};

export default Layout;
