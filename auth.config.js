export const authConfig = {
  pages: {
    signIn: '/login', // Fallback signIn page
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/ui');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirects unauthenticated users to pages.signIn
      } 
      
      // Only redirect if they are on the root path (/) or the login page
      if (isLoggedIn && (nextUrl.pathname === '/' || nextUrl.pathname === '/login')) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      
      return true;
    },
  },
  providers: [],
};
