"use server"

import { signIn, signOut } from "@/auth"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function Login(email: string, password: string, panel: string) {
  try {
    console.log(email)
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    if (!existingUser) {
      return { success: false, message: "User does not exist" }
    }
    if (panel === "admin") {
      if (existingUser.roles != "admin") {
        return { success: false, message: "this user is not an admin" }
      }
    }
    if (panel === "user") {
      if (existingUser.roles != "user") {
        return { success: false, message: "admin can not sign in from the user window" }
      }
    }
    const isMatch = bcrypt.compareSync(password, existingUser.password)
    if (!isMatch) {
      return { success: false, message: "Incorrect password" }
    }
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    })
    return { success: true, message: "Sign in successfully" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "There's an error somewhere" }
  }
}

export async function LogOut() {
  await signOut({ redirectTo: "/auth" })
}

export async function SignUp(email: string, password: string, userName: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    })
    if (existingUser) {
      return { success: false, message: "Email already in use" }
    }
    await signIn("credentials", {
      email: email,
      password: password,
      userName,
      redirect: false,
    })
    return { success: true, message: "User created successfully" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to create a user" }
  }
}
