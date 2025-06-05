import Credentials from "next-auth/providers/credentials";
import { hashPassword } from "./lib/utils";
import { prisma } from "./lib/db";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";

const providers = [
    Credentials({
    name: "credentials",
    credentials: {
        email: {label: "Email", type: "email"},
        username: {label: "username", type: "text"},
        password: {label: "Password", type: "password"},
    },
    authorize: async (credentials) => {
        
        if (!credentials?.email || !credentials?.password){
            return null
        };

        const password = credentials.password as string
        const email =  credentials.email as string
        const hashedPassword = hashPassword(password);

        // check for existing user
        let user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });

        if(!user) {
            user = await prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword,
                }
            })
        } else {
            const isMatch = bcrypt.compareSync(password, user.password)
            if (!isMatch){
                return null
            }
        }

        return user
        
        
    }

})]

export const authConfig = {
    providers: providers,
} satisfies NextAuthConfig