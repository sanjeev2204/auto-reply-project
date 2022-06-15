import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import MailerService from './mailer';
import config from '@/config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IBtInputDTO } from '@/interfaces/Ibt';
import { IUser } from '@/interfaces/IUser';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';
import events from '@/subscribers/events';
import { throttle } from 'lodash';
import { ObjectId } from 'mongoose';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { resolve } from 'path';

@Service()
export default class btService {
  constructor(
    @Inject('btModel') private btModel: Models.btModel,
    @Inject('botModel') private botModel: Models.botModel,
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('messageModel') private messageModel: Models.messageModel,
    // private mailer: MailerService,
    @Inject('logger') private logger, // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async createbt(IBtInputDTO: IBtInputDTO): Promise<any> {
    try {
      var title = IBtInputDTO.title;
      var userRecord1 = await this.btModel.findOne({ title });
      if (userRecord1) {
        throw new Error('User already Created');
      }

      const btRecord = await this.btModel.create({
        ...IBtInputDTO,
      });

      const user = btRecord.toObject();
      return { user };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getBt(): Promise<any> {
    const getRecord = await this.btModel.find();
    if (!getRecord) {
      throw new Error('no user found');
    }
    const getRecordbot = getRecord;
    // console.log('1',getRecordbot);
    return getRecordbot;
  }

  public async updateBtTable(IBtInputDTO: IBtInputDTO, _id: any): Promise<any> {
    try {
      const btRecord = await this.btModel.findByIdAndUpdate({ _id }, { $set: IBtInputDTO }, { new: true });
      // console.log('1', settingRecord1);
      return btRecord;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteBtById(req: any, res: any, _id: any): Promise<any> {
    try {
      //   console.log('1',_id);

      const userRecord = await this.btModel.findByIdAndDelete({ _id: _id });
      //   console.log('2',userRecord);

      if (!userRecord) {
        throw new Error('User already deleted');
      }
      const user = userRecord.toObject();

      return user;
    } catch (e) {
      // this.logger.error(e);
      throw e;
    }
  }
}
