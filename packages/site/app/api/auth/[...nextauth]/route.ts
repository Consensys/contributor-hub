import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      name: "GitHub",
      clientId: "Ov23lizDr9mWTm94h7mq",
      clientSecret: "740d1cdba3dcc21687ad9b4a137e407cf8c1244d",
    }),
  ],
});

export { handler as GET, handler as POST };
