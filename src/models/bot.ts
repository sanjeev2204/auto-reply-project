import { IBotInputDTO } from '@/interfaces/IBot';
import mongoose from 'mongoose';

const bot = new mongoose.Schema(
  {


  botId: String,
  userId: String,
  title: String,
  mobile: String,

    // salt: String,

    role: {
      type: String,
      default: 'bot',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IBotInputDTO & mongoose.Document>('bot', bot);

