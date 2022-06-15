import { ISettingInputDTO } from '@/interfaces/ISetting';
import mongoose from 'mongoose';

const setting = new mongoose.Schema(
  {
    isCalledReply: Boolean,
    isSmsReply: Boolean,
    isMmsReply: Boolean,
    delayResponse: Number,
    inActiveTimes: Number,
    disconnectTimes: Number,
    reativeUser: Number,
  // _id: String,
  // botId: mongoose.Schema.Types.ObjectId,
    botId: String,
    messageTitle: String,
    mobile: Number,
    defaultText:String,

    // salt: String,

    role: {
      type: String,
      default: 'setting',
    },
  },
  { timestamps: true },
);

export default mongoose.model<ISettingInputDTO & mongoose.Document>('setting', setting);

