"use client";
import { sendMessage } from "@/action/chataction";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const MAX_MESSAGES = 30;
const PAGE_SIZE = 10;

type chat = {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  opened: boolean;
  createdAt: string;
};

type ChatPageProps = {
  message: chat[];
  email: string;
};

export default function ChatPage({ message, email }: ChatPageProps) {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 5000); // refresh every 5 seconds

    return () => clearInterval(interval);
  }, [router]);

  // Merge and sort messages by createdAt
  const mergedMessages = [...(message || [])]
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((msg) => ({
      id: msg.id,
      sender: msg.senderId === "cmb7b3wp40000410wcgdcuvg8" ? "support" : "user",
      text: msg.message,
      createdAt: msg.createdAt,
    }));

  // If there are no messages, start with a default welcome message
  const initialMessages =
    mergedMessages.length > 0
      ? mergedMessages
      : [{ id: "welcome", sender: "support", text: "Hello! How can we assist you today?", createdAt: new Date().toISOString() }];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [showCount, setShowCount] = useState(PAGE_SIZE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Keep local messages in sync with props if they change (e.g., after refresh)
  useEffect(() => {
    setMessages(initialMessages);
  }, [message]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showCount]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Optionally, you can optimistically add the message to local state
    const newMsg = {
      id: Math.random().toString(36).substr(2, 9),
      sender: "user",
      text: input,
      createdAt: new Date().toISOString(),
    };
    let newMessages = [...messages, newMsg];
    if (newMessages.length > MAX_MESSAGES) {
      newMessages = newMessages.slice(newMessages.length - MAX_MESSAGES);
    }
    setMessages(newMessages);
    setInput("");
    setShowCount(PAGE_SIZE);

    // Send to server
    const uploadmessage = await sendMessage(email, input);
    if (!uploadmessage.success) {
      console.error("Failed to send message:", uploadmessage.message);
      // Optionally, remove the optimistic message or show error
    } else {
      // Optionally, refresh from server to get admin reply
      router.refresh();
    }
  };

  // Pagination logic
  const total = messages.length;
  const canShowOlder = total > showCount;
  const visibleMessages = messages.slice(total - showCount, total);

  const handleShowOlder = () => {
    setShowCount((prev) => Math.min(prev + PAGE_SIZE, total));
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-blue-700 text-white px-8 py-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="material-icons text-3xl">chat</span>
          <span className="text-2xl font-bold">Live Chat Support</span>
        </div>
        <span className="text-blue-200 text-sm">Eagleway Property</span>
      </header>

      {/* Chat Body */}
      <main className="flex-1 overflow-y-auto px-0 md:px-32 py-8">
        <div className="max-w-2xl mx-auto flex flex-col h-full">
          <div className="flex-1 overflow-y-auto space-y-4 pb-4 relative">
            {canShowOlder && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={handleShowOlder}
                  className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition"
                >
                  View older messages
                </button>
              </div>
            )}
            {visibleMessages.map((msg) => (
              <div
                key={msg.id + msg.createdAt}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-5 py-3 rounded-2xl max-w-[70%] shadow ${
                    msg.sender === "user"
                      ? "bg-blue-700 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                  <div className="text-xs text-gray-400 mt-1 text-right">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : ""}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Chat Input */}
      <footer className="bg-white border-t px-0 md:px-32 py-6">
        <form
          onSubmit={handleSend}
          className="max-w-2xl mx-auto flex items-center gap-3"
        >
          <input
            type="text"
            className="flex-1 px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-800 transition text-lg"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}