"use server";
import { getAllAdminConversations } from '@/action/chataction';
import AdminMessagesPage from '@/components/admin_message';
import React from 'react';
/* eslint-disable */


export default async function AdminChatPage() {
  const conversations = await getAllAdminConversations();
  return <AdminMessagesPage conversations={conversations as any} />;
}
