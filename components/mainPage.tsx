"use client";
import { useState, useRef, useEffect } from "react";

const MAX_MESSAGES = 30; // Total messages kept in memory
const PAGE_SIZE = 10;    // Messages shown per page

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: "support", text: "Hello! How can we assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [showCount, setShowCount] = useState(PAGE_SIZE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showCount]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    let newMessages = [...messages, { sender: "user", text: input }];
    if (newMessages.length > MAX_MESSAGES) {
      newMessages = newMessages.slice(newMessages.length - MAX_MESSAGES);
    }
    setMessages(newMessages);
    setInput("");
    setShowCount(PAGE_SIZE); // Always show latest PAGE_SIZE messages after sending
    // Simulate support reply
    setTimeout(() => {
      setMessages((msgs) => {
        let updated = [...msgs, { sender: "support", text: "Thank you for your message. Our agent will reply shortly." }];
        if (updated.length > MAX_MESSAGES) {
          updated = updated.slice(updated.length - MAX_MESSAGES);
        }
        return updated;
      });
      setShowCount(PAGE_SIZE);
    }, 1200);
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
            {visibleMessages.map((msg, idx) => (
              <div
                key={idx + (total - showCount)}
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