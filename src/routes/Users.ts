import { UserDao } from '@controllers';
import { logger } from '@shared';
import { Request, Response, Router, Express } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import {check, validationResult} from 'express-validator';

// Init shared
const router = Router();
const userDao = new UserDao();

/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    try {
        const users = await userDao.getAll();
        return res.status(OK).json({users});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post(
    '/add',
    [
        // username must be an email
        check('user.name').isLength({min: 2, max: 64}),
        // password must be at least 5 chars long
        check('user.email').isEmail(),
    ],
    async (req: Request, res: Response) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            const { user } = req.body;
            await userDao.add(user);
            return res.status(CREATED).end();
        } catch (err) {
            logger.error(err.message, err);
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    },
);

/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put(
    '/update',
    [
        // username must be an email
        check('user.name').isLength({min: 2, max: 64}),
        // password must be at least 5 chars long
        check('user.email').isEmail(),
    ],
    async (req: Request, res: Response) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            const { user } = req.body;
            user.id = Number(user.id);
            await userDao.update(user);
            return res.status(OK).end();
        } catch (err) {
            logger.error(err.message, err);
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    },
);

/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.delete(
    '/delete/:id',
    [
        // username must be an email
        check('id').isInt(),
    ],
    async (req: Request, res: Response) => {
        try {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const { id } = req.params as ParamsDictionary;
            await userDao.delete(Number(id));
            return res.status(OK).end();
        } catch (err) {
            logger.error(err.message, err);
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    },
);

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
