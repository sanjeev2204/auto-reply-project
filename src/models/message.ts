import { IMessageInputDTO } from '@/interfaces/IMessage';
import mongoose from 'mongoose';

const message = new mongoose.Schema(
  {
  // _id: String,
  // botId: mongoose.Schema.Types.ObjectId,
  botId: String,
  messageTitle: String,

    // salt: String,

    role: {
      type: String,
      default: 'message',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IMessageInputDTO & mongoose.Document>('message', message);

