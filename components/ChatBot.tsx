import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Hey, I’m RezaBot. Ask me anything about Reza—his experience, skills, or projects.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await response.json();
      setMessages([...updatedMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages([...updatedMessages, { role: "assistant", content: "Oops, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-4xl font-mono text-green-400 mb-4 animate-pulse">Talk to Reza</h1>
      <div className="w-full max-w-2xl space-y-4">
        {messages.map((msg, i) => (
          <Card key={i} className={\`bg-gray-800 \${msg.role === "assistant" ? "text-green-300" : msg.role === "user" ? "text-blue-300" : "text-white"}\`}>
            <CardContent className="p-4 whitespace-pre-wrap">{msg.content}</CardContent>
          </Card>
        ))}
        <div className="flex space-x-2">
          <Input
            className="flex-1 bg-gray-900 border border-gray-700 text-white"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
