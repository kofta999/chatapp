import { Schema, model, Types } from "mongoose";

interface IChat {
  name: string;
  isGroupChat: boolean;
  lastMessage: Types.ObjectId;
  participants: Types.Array<Types.ObjectId>;
  admin: Types.ObjectId;
}

const chatSchema = new Schema<IChat>(
  {
    name: {
      type: String,
      required: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "ChatMessage",
    },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Chat = model<IChat>("Chat", chatSchema);
