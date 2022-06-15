import { Document, Model } from 'mongoose';
import { IUser } from '@/interfaces/IUser';
import { IBotInputDTO } from '@/interfaces/IBot';
import { IMessageInputDTO} from '@/interfaces/IMessage';
import { ISettingInputDTO} from '@/interfaces/ISetting';
import { IBtInputDTO } from '@/interfaces/Ibt';



declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
      currentUser1: IBotInputDTO & Document;
      // currentUser2: IMessageInputDTO & Document;
      currentUser3: ISettingInputDTO & Document;
      currentUser4: IBtInputDTO & Document;
      

    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type botModel = Model<Document>;
    export type messageModel = Model<Document>;
    export type settingModel = Model<Document>;
    export type btModel = Model<Document>;
    

  }
}
