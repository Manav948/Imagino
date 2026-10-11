import { isAllowedOrigin } from '../config/origins.js';

// Refresh and logout use a cross-site cookie.  Requiring both a trusted Origin
// and a non-simple request header prevents another site from triggering them.
export const requireTrustedBrowserRequest = (req, res, next) => {
    const origin = req.get('origin');
    const requestedWith = req.get('x-requested-with');

    if (!origin || !isAllowedOrigin(origin) || requestedWith !== 'XMLHttpRequest') {
        return res.status(403).json({ message: 'Untrusted browser request.' });
    }

    next();
};
