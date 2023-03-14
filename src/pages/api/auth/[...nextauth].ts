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
        async signIn({ user, account, profile }) {
            const { email, name } = user;
            
            await fauna.query(
                q.Create(
                    q.Collection('users'),
                    {
                        data: {
                            email: email,
                            name: name                        },
                    },
                )
            )
                .then((ret) => console.log(ret))
                .catch((err) => console.error(
                    'Error: [%s] %s: %s',
                    err.name,
                    err.message,
                    err.errors()[0].description,
                ))
            return true
        },
    }
})