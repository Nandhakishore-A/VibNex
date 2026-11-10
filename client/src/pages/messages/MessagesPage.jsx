import { useState, useEffect, useRef } from "react";
import { Search, Send, Phone, Video, MoreVertical, Image as ImageIcon, CheckCheck, Smile } from "lucide-react";
import api from "../../api/axios.js";
import { useAuth } from "../../context/useAuth.js";
import { useSocket } from "../../context/useSocket.js";
import Avatar from "../../components/ui/Avatar.jsx";
import toast from "react-hot-toast";

export default function MessagesPage() {
  const { user } = useAuth();
  const socket = useSocket();

  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const chatEndRef = useRef(null);

  // Fetch conversations
  useEffect(() => {
    let mounted = true;
    api
      .get("/messages/conversations")
      .then(({ data }) => {
        if (mounted && data?.conversations) {
          setConversations(data.conversations);
          if (data.conversations.length > 0 && !selectedUser) {
            setSelectedUser(data.conversations[0].partner);
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch messages with selected partner
  useEffect(() => {
    if (!selectedUser?._id) return;
    let mounted = true;
    api
      .get(`/messages/${selectedUser._id}`)
      .then(({ data }) => {
        if (mounted && data?.messages) {
          setMessages(data.messages);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [selectedUser?._id]);

  // Socket.IO real-time message listener
  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (msg) => {
      if (String(msg.sender._id) === String(selectedUser?._id) || String(msg.recipient._id) === String(selectedUser?._id)) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("message:new", handleNewMessage);
    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [socket, selectedUser?._id]);

  // Scroll to bottom on message change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedUser?._id) return;

    const payload = {
      recipientId: selectedUser._id,
      text: text.trim(),
    };

    try {
      setText("");
      const { data } = await api.post("/messages", payload);
      if (data?.message) {
        setMessages((prev) => [...prev, data.message]);
      }
    } catch (err) {
      toast.error("Failed to deliver message.");
    }
  };

  const filteredConversations = conversations.filter((c) =>
    c.partner?.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.partner?.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-5rem)] bg-[#0E1520] border border-slate-800 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
      {/* Left Chat List Column */}
      <div className="w-full md:w-80 border-r border-slate-800 flex flex-col bg-[#0B1118]">
        {/* Header & Search */}
        <div className="p-4 border-b border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center justify-between">
            Messages
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono">
              Live
            </span>
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search people..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No active conversations. Search a user to connect!
            </div>
          ) : (
            filteredConversations.map((c) => {
              const isSelected = selectedUser?._id === c.partner._id;
              return (
                <button
                  key={c.partner._id}
                  onClick={() => setSelectedUser(c.partner)}
                  className={`w-full p-3.5 flex items-center gap-3 text-left transition-colors ${
                    isSelected ? "bg-slate-900/90 border-l-4 border-cyan-400" : "hover:bg-slate-900/40"
                  }`}
                >
                  <div className="relative">
                    <Avatar src={c.partner.avatar} name={c.partner.name} size="md" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400 border-2 border-slate-900 rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-white truncate">{c.partner.name}</p>
                      <span className="text-[10px] text-slate-500">Now</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {c.lastMessage?.text || "Started a chat"}
                    </p>
                  </div>
                  {c.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                      {c.unreadCount}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Chat Conversation View */}
      {selectedUser ? (
        <div className="flex-1 flex flex-col bg-[#070A0F]">
          {/* Partner Bar */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#0B1118]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Avatar src={selectedUser.avatar} name={selectedUser.name} size="md" />
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  {selectedUser.name}
                  <span className="text-[10px] text-cyan-400 font-normal">Online</span>
                </h3>
                <p className="text-xs text-slate-500">@{selectedUser.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <button className="p-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
                <Video className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Smile className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-bold text-white">No messages yet</h4>
                <p className="text-xs text-slate-400 max-w-xs">Say hello to {selectedUser.name} and start your conversation on VIBNEX!</p>
              </div>
            ) : (
              messages.map((m) => {
                const isMe = String(m.sender._id || m.sender) === String(user._id);
                return (
                  <div
                    key={m._id || Math.random()}
                    className={`flex items-end gap-2.5 ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    {!isMe && <Avatar src={selectedUser.avatar} name={selectedUser.name} size="xs" />}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-md ${
                        isMe
                          ? "bg-cyan-500 text-slate-950 font-medium rounded-br-none"
                          : "bg-slate-800/90 text-slate-100 rounded-bl-none border border-slate-700/60"
                      }`}
                    >
                      <p>{m.text}</p>
                      <div className={`flex items-center justify-end gap-1 text-[10px] mt-1 ${isMe ? "text-slate-900/70" : "text-slate-400"}`}>
                        <span>{new Date(m.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {isMe && <CheckCheck className="h-3 w-3" />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSend} className="p-3.5 border-t border-slate-800 bg-[#0B1118] flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
            >
              <ImageIcon className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={!text.trim()}
              className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 bg-[#070A0F]">
          <h3 className="text-base font-bold text-white">Select a chat to begin messaging</h3>
          <p className="text-xs text-slate-400 mt-1">Real-time bi-directional messaging on VIBNEX</p>
        </div>
      )}
    </div>
  );
}
