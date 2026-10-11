const defaultOrigins = [
    'http://localhost:5173',
    'https://imagino.manavvalani.in',
];

const getConfiguredOrigins = () => (process.env.FRONTEND_URL || '')
    .split(',')
    .map((url) => url.trim().replace(/\/$/, ''))
    .filter(Boolean);

export const getAllowedOrigins = () => [...new Set([...defaultOrigins, ...getConfiguredOrigins()])];

export const isAllowedOrigin = (origin) => getAllowedOrigins().includes(origin);
