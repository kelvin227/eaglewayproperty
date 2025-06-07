"use server";
import { prisma } from "@/lib/db"
const adminid = "cmb7b3wp40000410wcgdcuvg8" // Replace with actual admin ID
export async function startChat(email: string) {
  try {
    const startChat = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })
    if (!startChat) {
      return { success: false, message: "unable to get user information to start chat" }
    }
    const chat = await prisma.conversation.create({
      data: {
        AdminId: "cmb7b3wp40000410wcgdcuvg8", // Replace with actual admin ID
        userId2: startChat.id,
      },
    })
    if (!chat) {
      return { success: false, message: "unable to start chat" }
    }
    return { success: true, message: "chat started" }
  } catch (error) {
    console.error(error)
  }
}

export async function getmessage(email: string){
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })
    if (!user) {
      return { success: false, message: "User not found" }
    }
    const messages = await prisma.message.findMany({
      where: { 
        OR: [
          { senderId: user.id },
          { receiverId: user.id }
        ],
      },
      orderBy: { createdAt: "desc" },
    })
    return { success: true, messages }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Error retrieving messages" }
  }
}
export async function getadminmessage(id: string){
  try {
    const messages = await prisma.message.findMany({
      where: { 
        OR: [
         { 
          AND: [
          { senderId: id },
          { receiverId: adminid }
          ]
      },
      {
        AND: [
          { senderId: adminid },
          { receiverId: id }
        ],
      }

        ],
      },
      orderBy: { createdAt: "asc" },
    })
    console.log("messages", messages)
    return { success: true, messages }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Error retrieving messages" }
  }
}
export async function getChat() {
  try {
    const chat = await prisma.conversation.findMany({
      where: { AdminId: adminid},
    })
    return { success: true, chat }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Error retrieving chat" }
  }
}
export async function sendMessage(email: string, message: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })
    if (!user) {
      return { success: false, message: "User not found" }
    }
    const newMessage = await prisma.message.create({
      data: {
        senderId: user.id,
        receiverId: "cmb7b3wp40000410wcgdcuvg8", // Replace with actual admin ID
        message,
      },
    })
    if (!newMessage) {
      return { success: false, message: "Unable to send message" }
    }
    return { success: true, message: "Message sent successfully" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Error sending message" }
  }
}
export async function adminsendmessage(userid: string, message: string) {
  try {
    const newMessage = await prisma.message.create({
      data: {
        senderId: adminid,
        receiverId: userid, // Replace with actual admin ID
        message,
      },
    })
    if (!newMessage) {
      return { success: false, message: "Unable to send message" }
    }
    return { success: true, message: "Message sent successfully" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Error sending message" }
  }
}
export async function getAllAdminConversations() {
  const adminId = "cmb7b3wp40000410wcgdcuvg8";
  // Get all conversations where admin is the admin
  const conversations = await prisma.conversation.findMany({
    where: { AdminId: adminId },
    include: {
      user2: true, // The user
    },
  });

  // For each conversation, get all messages between admin and user
  const result = await Promise.all(
    conversations.map(async (conv) => {
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: conv.userId2, receiverId: adminId },
            { senderId: adminId, receiverId: conv.userId2 },
          ],
        },
        orderBy: { createdAt: "asc" },
      });
      return {
        userId: conv.userId2,
        userEmail: conv.user2.email,
        messages,
      };
    })
  );

  return result;
}
