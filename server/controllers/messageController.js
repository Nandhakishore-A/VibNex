import Message from "../models/Message.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getIo } from "../socket/index.js";

const getConversationId = (id1, id2) => {
  return [String(id1), String(id2)].sort().join("_");
};

// GET /api/messages/conversations - List active chat contacts
export const getConversations = asyncHandler(async (req, res) => {
  const currentUserId = req.user._id;

  // Find recent messages involving current user
  const messages = await Message.find({
    $or: [{ sender: currentUserId }, { recipient: currentUserId }],
  })
    .sort({ createdAt: -1 })
    .populate("sender", "name username avatar")
    .populate("recipient", "name username avatar")
    .lean();

  const conversationMap = new Map();

  for (const msg of messages) {
    const isSender = String(msg.sender._id) === String(currentUserId);
    const partner = isSender ? msg.recipient : msg.sender;
    const partnerId = String(partner._id);

    if (!conversationMap.has(partnerId)) {
      conversationMap.set(partnerId, {
        partner,
        lastMessage: {
          text: msg.text,
          createdAt: msg.createdAt,
          isSender,
          isRead: msg.isRead,
        },
        unreadCount: !isSender && !msg.isRead ? 1 : 0,
      });
    } else if (!isSender && !msg.isRead) {
      const conv = conversationMap.get(partnerId);
      conv.unreadCount += 1;
    }
  }

  // If map is empty, provide popular demo users as starter contacts
  if (conversationMap.size === 0) {
    const suggestions = await User.find({
      _id: { $ne: currentUserId },
      isActive: true,
    })
      .select("name username avatar")
      .limit(6)
      .lean();

    const starterList = suggestions.map((user) => ({
      partner: user,
      lastMessage: {
        text: "Hey there! Welcome to VIBNEX. Let's connect!",
        createdAt: new Date(),
        isSender: false,
        isRead: true,
      },
      unreadCount: 0,
    }));

    return res.json({ status: "success", conversations: starterList });
  }

  res.json({
    status: "success",
    conversations: Array.from(conversationMap.values()),
  });
});

// GET /api/messages/:userId - Get messages with a specific user
export const getMessagesWithUser = asyncHandler(async (req, res) => {
  const currentUserId = req.user._id;
  const targetUserId = req.params.userId;
  const conversationId = getConversationId(currentUserId, targetUserId);

  const messages = await Message.find({ conversationId })
    .sort({ createdAt: 1 })
    .populate("sender", "name username avatar")
    .populate("recipient", "name username avatar")
    .lean();

  // Mark unread messages as read
  await Message.updateMany(
    { conversationId, recipient: currentUserId, isRead: false },
    { $set: { isRead: true } }
  );

  res.json({ status: "success", messages });
});

// POST /api/messages - Send a message
export const sendMessage = asyncHandler(async (req, res) => {
  const currentUserId = req.user._id;
  const { recipientId, text, mediaUrl } = req.body;

  if (!recipientId || !text?.trim()) {
    return res.status(400).json({ status: "error", message: "Recipient and message text are required." });
  }

  const conversationId = getConversationId(currentUserId, recipientId);

  const message = await Message.create({
    conversationId,
    sender: currentUserId,
    recipient: recipientId,
    text: text.trim(),
    mediaUrl: mediaUrl || "",
  });

  const populatedMessage = await Message.findById(message._id)
    .populate("sender", "name username avatar")
    .populate("recipient", "name username avatar")
    .lean();

  // Real-time Socket.IO emission to recipient
  try {
    const io = getIo();
    io.to(`user:${recipientId}`).emit("message:new", populatedMessage);
  } catch (socketErr) {
    // Socket emit is best-effort
  }

  res.status(201).json({ status: "success", message: populatedMessage });
});
