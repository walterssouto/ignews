import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: String(process.env.GITHUB_CLIENT_ID),
            clientSecret: String (process.env.GITHUB_CLIENT_SECRET),
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            const { email } = user;
            try {

                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(user.email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            {data: { email } }
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.email)
                            )
                        )
                    )
                )
                return true    
            } catch {
                return false
            }
            
        },
    }
})