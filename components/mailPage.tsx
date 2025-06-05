"use client";
import { sendMail } from "@/action/maillaction";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type SentMail = {
    id: string;
  to: string;
  subject: string;
  message: string;
  date: string;
};

export default function AdminMailerPage({sentmail, email}: {sentmail: SentMail[], email: string}) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  // Ensure sentMails is always an array
  const sentMails = Array.isArray(sentmail) ? sentmail : [];
  const [isSending, setIsSending] = useState(false);

  const router = useRouter()

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !subject || !message) return;
    setIsSending(true);
    // Simulate sending mail
    try{
        const sendmail = await sendMail(to, subject, message, email);
        if(!sendmail.success){
            toast.error(sendmail.message)
        }else{
            toast.success(sendmail.message)
            router.refresh()
    setTo("");
      setSubject("");
      setMessage("");
        }

    }catch(error){
        console.log("an unexpected error occured",error)
    }finally{
        setIsSending(false);
    }
    
    //   setSentMails([
    //     {
    //       to,
    //       subject,
    //       message,
    //       date: new Date().toLocaleString(),
    //     },
    //     ...sentMails,
    //   ]);
      
      
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-8 mb-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Compose Mail</h2>
        <form className="space-y-5" onSubmit={handleSend}>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">To</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="recipient@email.com"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              disabled={isSending}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">Subject</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isSending}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">Message</label>
            <textarea
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[120px]"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSending}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded font-semibold hover:bg-blue-800 transition"
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send Mail"}
          </button>
        </form>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Sent Mails</h2>
        {sentMails.length === 0 ? (
          <p className="text-gray-500">No sent mails yet.</p>
        ) : (
          <div className="space-y-6 max-h-[350px] overflow-y-auto">
            {sentMails.map((mail) => (
              <div key={mail.id} className="border-b pb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-blue-700 font-semibold">Subject: {mail.subject}</span>
                  <span className="text-xs text-gray-400">{new Date(mail.date).toLocaleDateString()}</span>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">To:</span> {mail.to}
                </div>
                <div className="text-gray-700 whitespace-pre-line">{mail.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}