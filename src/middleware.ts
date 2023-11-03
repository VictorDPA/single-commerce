import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware(
  {
    publicRoutes: [
      '/',
      '/pages/(.*)'
    ],
  });
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};