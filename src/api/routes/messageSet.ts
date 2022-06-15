import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import messageService from '@/services/messageSet';
import { IMessageInputDTO } from '@/interfaces/IMessage';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
  app.use('/message', route);

  route.post(
    '/createMessage',
    // middlewares.isAuth,

    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling createMessage endpoint with body: %o', req.body.msgList);

      try {
        // console.log('>>>>>>>',req.body.msgList);
        var msgList = req.body.msgList;
        var botId = req?.body?.msgList?.[0]?.botId;
        // console.log("-->>>BOAT ID-->>>",botId)

        const messageServiceInstanceD = Container.get(messageService);
        const userD = await messageServiceInstanceD.deleteMessageSet(req, res, botId);

        const messageServiceInstance = Container.get(messageService);
        msgList.map(async item => {
          await messageServiceInstance.createMessage(item as IMessageInputDTO);
        });
        return res.status(201).json({ message: 'Record created successfully' });
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
    '/getCreateMessage',
    //  middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling getCreatBot endpoint with body: %o', req.body);
      try {
        const messageServiceInstance = Container.get(messageService);
        const getCreatBot = await messageServiceInstance.getCreateMessage();
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

  route.post(
    '/deleteMessageSet',
    celebrate({
      body: Joi.object({
        botId: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      // const logger: Logger = Container.get('logger');
      // logger.debug('Calling Sign-In endpoint with body: %o', req.body);
      try {
        var botId = req.body.botId;
        const messageServiceInstance = Container.get(messageService);
        const user = await messageServiceInstance.deleteMessageSet(req, res, botId);

        return res.status(201).json({
          status: true,
          data: user,
          message: 'User deleted succesfully',
        });
      } catch (e) {
        // logger.error('🔥 error: %o', e);
        return res.status(200).send({
          status: false,
          message: e.message,
          //   error: e,
        });
      }
    },
  );

  route.get(
    '/getByBotId',
    // middlewares.isAuth,
    celebrate({
      query: Joi.object({
        botId: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling getCreatBot endpoint with body: %o', req.query);

      try {
        var botId = req.query.botId;
        //  console.log('fkljf',botId);

        const messageServiceInstance = Container.get(messageService);
        const getCreatBot = await messageServiceInstance.getByBotId(botId as any);
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

  route.delete(
    '/deleteById',
    celebrate({
      query: Joi.object({
        _id: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-In endpoint with body: %o', req.query);
      try {
        var _id = req.query._id;
        // console.log('0',_id);

        const messageServiceInstance = Container.get(messageService);
        const user = await messageServiceInstance.deleteById(req, res, _id);

        return res.status(201).json({
          status: true,
          data: user,
          message: 'User deleted succesfully',
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
