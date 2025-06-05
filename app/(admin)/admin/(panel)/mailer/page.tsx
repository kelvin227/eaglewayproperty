import { getAllMails } from '@/action/maillaction'
import { auth } from '@/auth';
import AdminMailerPage from '@/components/mailPage';
import React from 'react'

/* eslint-disable */

export default async function MailPage() {
    const getmail = await getAllMails();
    const session= await auth()
    const mail = session?.user?.email
  return (
   
    <AdminMailerPage sentmail={getmail.response as any} email={mail as string}/>
  )
}
