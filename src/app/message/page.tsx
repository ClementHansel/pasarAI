"use client";
import { useEffect, useState } from "react";
import MessagesList from "../../components/messages/MessagesList";
import MessageThread from "../../components/messages/MessageThread";
import NoConversationSelected from "../../components/messages/NoConversationSelected";
import { Conversation, Message } from "../../types/message";
import { useMediaQuery } from "../../hooks/useMediaQuery";

// Shared fetch utility
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export default function MessagePage() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userRole, setUserRole] = useState<"admin" | "seller" | "buyer">(
    "buyer"
  );
  const [showMessageList, setShowMessageList] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  // Fetch conversations on role change
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const data = await fetcher(`/api/conversations?role=${userRole}`);
        setConversations(data);
      } catch (error) {
        console.error("Error loading conversations:", error);
      }
    };
    loadConversations();
  }, [userRole]);

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (!selectedConversationId) return;

    const loadMessages = async () => {
      try {
        setLoadingMessages(true);
        const data = await fetcher(
          `/api/messages?conversationId=${selectedConversationId}`
        );
        setMessages(data);
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setLoadingMessages(false);
      }
    };
    loadMessages();
  }, [selectedConversationId]);

  // Role switcher
  const toggleRole = () => {
    setUserRole((prev) => (prev === "buyer" ? "seller" : "buyer"));
  };

  // Handle selecting a conversation (pass conversationId instead of full conversation)
  const handleConversationSelect = (conversationId: number) => {
    setSelectedConversationId(conversationId);
    if (isMobile) {
      setShowMessageList(false);
    }
  };

  // Go back to message list on mobile
  const handleBack = () => {
    setShowMessageList(true);
    if (!isMobile) {
      setSelectedConversationId(null);
    }
  };

  // Send new message
  const handleSendMessage = async (text: string) => {
    if (!selectedConversationId || !text.trim()) return; // Prevent sending empty messages

    const newMessage: Omit<Message, "id"> = {
      conversationId: selectedConversationId,
      senderRole: userRole,
      text,
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const savedMessage = await res.json();
      setMessages((prev) => [...prev, savedMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Delete a single conversation
  const handleDeleteConversation = async (id: number) => {
    try {
      await fetch(`/api/messages/${id}`, { method: "DELETE" });
      setConversations((prev) => prev.filter((c) => c.id !== id));
      setMessages((prev) => prev.filter((m) => m.conversationId !== id));
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  // Delete multiple conversations
  const handleDeleteMultiple = async (ids: number[]) => {
    try {
      await fetch(`/api/messages`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      setConversations((prev) => prev.filter((c) => !ids.includes(c.id)));
      setMessages((prev) =>
        prev.filter((m) => !ids.includes(m.conversationId))
      );
    } catch (error) {
      console.error("Error deleting multiple conversations:", error);
    }
  };

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Messages</h1>
        <button
          onClick={toggleRole}
          className="px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          {userRole === "buyer" ? "Switch to Seller" : "Switch to Buyer"}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Conversation List */}
        {(!isMobile || showMessageList) && (
          <div
            className={`${
              isMobile ? "w-full" : "w-80"
            } border-r border-gray-200 overflow-hidden flex flex-col`}
          >
            <div className="p-4 bg-gray-800 text-white">
              <h2 className="font-semibold">
                {userRole === "buyer" ? "My Purchases" : "My Shop Messages"}
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <MessagesList
                conversations={conversations}
                onConversationSelect={handleConversationSelect} // Now passing conversationId (number)
                userRole={userRole}
                onDeleteConversation={handleDeleteConversation}
                onDeleteMultiple={handleDeleteMultiple}
              />
            </div>
          </div>
        )}

        {/* Right: Message Thread */}
        <div
          className={`flex-1 ${
            !isMobile || !showMessageList ? "block" : "hidden"
          }`}
        >
          {selectedConversationId && selectedConversation ? (
            <MessageThread
              conversationId={selectedConversationId}
              messages={messages}
              currentUserId={userRole}
              userRole={userRole}
              conversationTitle={selectedConversation.title}
              onSendMessage={handleSendMessage}
              onBack={isMobile ? handleBack : undefined}
              loading={loadingMessages}
            />
          ) : (
            <NoConversationSelected />
          )}
        </div>
      </div>
    </div>
  );
}
