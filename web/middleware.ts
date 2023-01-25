export { default } from 'next-auth/middleware' // require authentication

export const config = { matcher: ['/:path*'] } // all pages
