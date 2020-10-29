import * as testController from '../controllers/testController.js';
import express from 'express'; //refers to Express the middleware helper for Node.js
const testRouter = express.Router();

testRouter.get('/', testController.getNames);

export default testRouter;
