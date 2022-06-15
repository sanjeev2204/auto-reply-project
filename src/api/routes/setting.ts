import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import settingService from '@/services/setting';
import { ISettingInputDTO } from '@/interfaces/ISetting';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import { join } from 'path';

const route = Router();

export default (app: Router) => {
  app.use('/setting', route);

  route.post(
    '/createSetting',
    // middlewares.isAuth,
    celebrate({
      body: Joi.object({
        isCalledReply: Joi.boolean(),
        isSmsReply: Joi.boolean(),
        isMmsReply: Joi.boolean(),
        defaultText: Joi.string(),
        delayResponse: Joi.number(),
        inActiveTimes: Joi.number(),
        disconnectTimes: Joi.number(),
        reativeUser: Joi.number(),
        mobile: Joi.number(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling createbot endpoint with body: %o', req.body);
      try {
        const settingServiceInstance = Container.get(settingService);
        const { user } = await settingServiceInstance.createSetting(req.body as ISettingInputDTO);
        return res.status(201).json({ user });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return res.status(200).send({
          status: false,
          message: e.message,
          error: e,
        });
      }
    },
  );

  route.get(
    '/getCreateSetting',
    //  middlewares.isAuth,
    celebrate({
      query: Joi.object({
        mobile: Joi.number(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling getCreatBot endpoint with body: %o', req.query);

      try {
        var mobile = req.query.mobile;
        // console.log('fkljf',mobile);

        const settingServiceInstance = Container.get(settingService);
        const getCreatBot = await settingServiceInstance.getCreateSetting(mobile as any);
        return res
          .json({
            status: true,
            message: getCreatBot,
          })
          .status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return res.status(200).send({
          status: false,
          message: e.message,
          error: e,
        });
      }
    },
  );

  route.put(
    '/updateSettingTable',
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        isCalledReply: Joi.boolean(),
        isSmsReply: Joi.boolean(),
        isMmsReply: Joi.boolean(),
        defaultText: Joi.string(),
        delayResponse: Joi.number(),
        inActiveTimes: Joi.number(),
        disconnectTimes: Joi.number(),
        reativeUser: Joi.number(),
        mobile: Joi.number(),
      }),
      query: Joi.object({
        _id: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('updateSettingTable: %o', req.body);

      try {
        const settingServiceInstance = Container.get(settingService);
        var _id = req.query._id;
        // console.log('2',_id);

        var userdata1 = {};
        const user = await settingServiceInstance.updateSettingTable(req.body as ISettingInputDTO, _id as any);
        if (!user) {
          return res.status(400).json({
            status: false,
            message: 'user not update',
          });
        }
        return res.status(201).json({
          status: true,
          data: user,
          message: 'user updated successfully',
        });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return res.status(200).send({
          status: false,
          message: e.message,
          error: e,
        });
      }
    },
  );
};
