import { ENV, PORT } from './env';

export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';

export const apiEndpoint = isDebug ? `http://localhost:${PORT}` : 'https://summit2017.reversim.com';
// Replace with 'UA-########-#' or similar to enable tracking
export const trackingID = null;

