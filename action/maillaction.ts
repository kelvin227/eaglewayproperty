"use server"

import ApplicationEmail from "@/components/mails/Approve";
import { Resend } from 'resend';
import { prisma } from "@/lib/db"

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApplicationMail(email: string) {
  const data = await resend.emails.send({
    from: 'EagleWay Property Rental LLC <noreply@sociootc.com>',
    to: [email],
    subject: 'EagleWay Property Rental LLC',
    react: ApplicationEmail({ applicantName: email}),
  });

  if (!data) {
    return { success: false, message: "unable to send email" }
  }

  return { success: true, message: "email sent successfully" }
};

export async function getAllMails() {
  try {
    const mails = await prisma.sentMail.findMany({
      orderBy: {
        date: "desc",
      },
    });
    if (!mails || mails.length === 0) {
      console.log("No mails found");
      return {response: "No mails found"};
    }
    return {response: mails};
  } catch (error) {
    console.error("Error fetching mails:", error);
    return {response:"no mail found"};
  }
}

export async function sendMail( to: string, subject: string, message: string, adminmail: string){
 if(!to || !subject || !message || !adminmail){
  return {success: false, message: "all fields are required"}
 }
  try{
  const adminid = await prisma.user.findUnique({
    where:{
      email: adminmail
    },
    select:{id:true}
  })
  if(!adminid){
    return{success:false, message: "could not find admin"}
  }

  const adminId = adminid.id

  const sendApplicationMails = await sendApplicationMail(to);

  if(!sendApplicationMails.success){
    return{success: false, message: sendApplicationMails.message}
  }


  const sendmail = await prisma.sentMail.create({
    data:{
      to,
      subject,
      message,
      adminId,
    }
  })
  if(!sendmail){
      return{success:false, message: "unable to add mail records"}
    }
    return{success: true, message:"records added successfully"}
 }catch(error){
  console.error("error sending mail records", error);
  return{response: "error sending mail records"}
 }
}