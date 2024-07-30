/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
// export const publicRoutes = [
//   "/api/uploadthing",
//   "/api/6618ac8411836e716df8d531/categories",
//   "/api/6618ac8411836e716df8d531/subcategories",
//   "/api/6618ac8411836e716df8d531/products",
//   "/api/6618ac8411836e716df8d531/products",
//   "/api/6618ac8411836e716df8d531/checkout",
// ];
export const publicRoutes = [
    '/api/uploadthing',
    '/api/6698d84702e0a09eda9abe35/categories',
    '/api/6698d84702e0a09eda9abe35/subcategories',
    '/api/6698d84702e0a09eda9abe35/products',
    '/api/6698d84702e0a09eda9abe35/products',
    '/api/6698d84702e0a09eda9abe35/checkout',
]
/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/error',
    '/auth/reset',
    '/auth/new-password',
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/'
