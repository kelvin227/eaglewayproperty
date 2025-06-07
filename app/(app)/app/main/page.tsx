"use server";
import { getmessage } from '@/action/chataction'
import { auth } from '@/auth'
import ChatPage from '@/components/mainPage'
import React from 'react'

/* eslint-disable */

export default async function Login() {
  const session= await auth()
    const email= session?.user?.email

    const chat = await getmessage(email as string)
    if (!chat.success) {
      return <div>Error: {chat.message}</div>
    }
    // const adminresponse = await getadminmessage(email as string)
    // if (!adminresponse.success) {
    //   return <div>Error: {adminresponse.message}</div>
    // }

  return (
    
    <ChatPage message={chat.messages as any} email={email as string}/>
  )
}
