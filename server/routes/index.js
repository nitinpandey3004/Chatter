import express from 'express';
// controllers
import users from '../controllers/user.js';
// middlewares
import { encode } from '../middlewares/jwt.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  return res.status(200).json({
    response: "Up and Running",
  });
})

router
  .post('/login', encode, (req, res, next) => {
    return res
      .status(200)
      .json({
        success: true,
        authToken: req.authToken,
      });
  });


export default router;