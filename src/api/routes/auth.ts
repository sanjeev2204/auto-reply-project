import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '@/services/auth';
import { IUser, IUserInputDTO } from '@/interfaces/IUser';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import attachCurrentUser from '../middlewares/attachCurrentUser';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  // route.post(
  //   '/signup',
  //   celebrate({
  //     body: Joi.object({
  //       name: Joi.string().required(),
  //       email: Joi.string().required(),
  //       password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).required(),
  //       mobile: Joi.number().required(),
  //     }),
  //   }),
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     const logger: Logger = Container.get('logger');
  //     logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
  //     try {
  //       const authServiceInstance = Container.get(AuthService);
  //       const { user, token } = await authServiceInstance.SignUp(req.body as IUserInputDTO);
  //       return res.status(201).json({ user, token });
  //     } catch (e) {
  //       logger.error('🔥 error: %o', e);
  //       return res.status(200).send({
  //         status: false,
  //         message: e.message,
  //         error: e,
  //       });
  //     }
  //   },
  // );

  // route.post(
  //   '/signin',
  //   celebrate({
  //     body: Joi.object({
  //       email: Joi.string().required(),
  //       password: Joi.string().required(),
  //     }),
  //   }),
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     const logger: Logger = Container.get('logger');
  //     logger.debug('Calling Sign-In endpoint with body: %o', req.body);
  //     try {
  //       const { email, password } = req.body;
  //       const authServiceInstance = Container.get(AuthService);
  //       const { user, token } = await authServiceInstance.SignIn(email, password);
  //       return res.json({ user, token }).status(200);
  //     } catch (e) {
  //       logger.error('🔥 error: %o', e);
  //       return res.status(200).send({
  //         status: false,
  //         message: e.message,
  //         // error: e,
  //       });
  //     }
  //   },
  // );

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */

  
  // route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
  //   const logger: Logger = Container.get('logger');
  //   logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
  //   try {
  //     //@TODO AuthService.Logout(req.user) do some clever stuff
  //     return res.status(200).json({ status: true }).end();
  //   } catch (e) {
  //     logger.error('🔥 error %o', e);
  //     return next(e);
  //   }
  // });

  // route.delete(
  //   '/deleteUser',
  //   celebrate({
  //     body: Joi.object({
  //       _id: Joi.string(),
  //     }),
  //   }),
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     // const logger: Logger = Container.get('logger');
  //     // logger.debug('Calling Sign-In endpoint with body: %o', req.body);
  //     try {
        
  //       const _id  = req.body;
  //       const authServiceInstance = Container.get(AuthService);
  //       const user  = await authServiceInstance.deleteUser(res, _id);
        
  //       return res.status(201).json({
  //         status: true,
  //         data: user,
  //         message: 'User deleted succesfully',
  //       });
  //     } catch (e) {
  //       // logger.error('🔥 error: %o', e);
  //       return res.status(200).send({
  //         status: false,
  //         message: e.message,
  //         error: e,
 
  //       });
  //     }
  //   },
  // );

  // route.put(
  //   '/updateUser',
  //   middlewares.isAuth,
  //   middlewares.attachCurrentUser,
  //   celebrate({
  //     body: Joi.object({
  //       name: Joi.string().required(),
  //       mobile: Joi.string().required(),
  //     }),
  //   }),
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     const logger: Logger = Container.get('logger');
  //     logger.debug('updateUserProfile: %o', req.body);

  //     var currentUser = req.currentUser;
  //     console.log(currentUser);
  //     try {
  //       const authServiceInstance = Container.get(AuthService);

  //       var userdata1 = {};
  //       const { user } = await authServiceInstance.updateUser(req.body as IUser, currentUser._id);
  //       return res.status(201).json({
  //         status: true,
  //         data: user,
  //       });
  //     } catch (e) {
  //       logger.error('🔥 error: %o', e);
  //       return res.status(200).send({
  //         status: false,
  //         message: e.message,
  //         error: e,
  //       });
  //     }
  //   },
  // );

  // route.post(
  //   '/changePassword',
  //   celebrate({
  //     body: Joi.object({
  //       email: Joi.string().required(),
  //       newPassword: Joi.string().required(),
  //       oldPassword: Joi.string().required(),
  //     }),
  //   }),
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       const authServiceInstance = Container.get(AuthService);
  //       let { user, message } = await authServiceInstance.changePassword(req.body as IUserInputDTO);
  //       return res.status(201).send({
  //         status: true,
  //         data: user,
  //         message: message,
  //       });
  //     } catch (e) {
  //       return res.status(200).send({
  //         status: false,
  //         message: e.message,
  //         error: e,
  //       });
  //     }
  //   },
  // );
};
