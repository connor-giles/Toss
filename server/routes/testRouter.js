import * as testController from '../controllers/testController.js';
import express from 'express'; //refers to Express the middleware helper for Node.js
const testRouter = express.Router();

footballClubRouter.get('/', testController.getNames);

export default testRouter;
