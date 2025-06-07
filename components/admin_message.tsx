"use client";
import React, { useState, useRef, useEffect } from "react";
import { adminsendmessage } from "@/action/chataction"; // Make sure this action exists and works for admin

// Example types, adjust as needed for your backend
type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
};

type Conversation = {
  userId: string;
  userEmail: string;
  messages: Message[];
};

type AdminMessagesProps = {
  conversations: Conversation[];
};

export default function AdminMessagesPage({ conversations }: AdminMessagesProps) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [localConversations, setLocalConversations] = useState(conversations);

  const selectedConversation = localConversations.find(
    (conv) => conv.userId === selectedUserId
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedUserId) return;
    setSending(true);

    // Optimistically update local state
    setLocalConversations((prev) =>
      prev.map((conv) =>
        conv.userId === selectedUserId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: Math.random().toString(36).substr(2, 9),
                  senderId: "admin", // or your admin id
                  receiverId: selectedUserId,
                  message: input,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : conv
      )
    );

    setInput("");
    setSending(false);

    // Send to server
    await adminsendmessage(selectedUserId, input);

    // Optionally: refresh from server here
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar: List of users */}
      <aside className="w-80 bg-white border-r shadow h-screen overflow-y-auto">
        <h2 className="text-xl font-bold text-blue-800 p-6 border-b">User Conversations</h2>
        <ul>
          {conversations.map((conv) => (
            <li
              key={conv.userId}
              className={`p-4 border-b cursor-pointer hover:bg-blue-50 ${
                selectedUserId === conv.userId ? "bg-blue-100" : ""
              }`}
              onClick={() => setSelectedUserId(conv.userId)}
            >
              <div className="font-semibold text-blue-700">{conv.userEmail}</div>
              <div className="text-xs text-gray-400">
                {conv.messages.length} message{conv.messages.length !== 1 ? "s" : ""}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main: Conversation view */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col justify-between p-8">
          {selectedConversation ? (
            <>
              <div>
                <h3 className="text-lg font-bold mb-4 text-blue-800">
                  Conversation with {selectedConversation.userEmail}
                </h3>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                  {selectedConversation.messages
                    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                    .map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.senderId === selectedConversation.userId
                            ? "justify-start"
                            : "justify-end"
                        }`}
                      >
                        <div
                          className={`px-5 py-3 rounded-2xl max-w-[70%] shadow ${
                            msg.senderId === selectedConversation.userId
                              ? "bg-gray-200 text-gray-800 rounded-bl-none"
                              : "bg-blue-700 text-white rounded-br-none"
                          }`}
                        >
                          {msg.message}
                          <div className="text-xs text-gray-400 mt-1 text-right">
                            {new Date(msg.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              {/* Admin send message input */}
              <form
                onSubmit={handleSend}
                className="flex items-center gap-3 mt-6"
              >
                <input
                  type="text"
                  className="flex-1 px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                  placeholder="Type your message to user..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={sending}
                />
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-800 transition text-lg"
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Send"}
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-lg">
              Select a conversation to view messages
            </div>
          )}
        </div>
      </main>
    </div>
  );
}