import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/login",
  },
});
export const config = { matcher: ["/test/:userId*"] };
