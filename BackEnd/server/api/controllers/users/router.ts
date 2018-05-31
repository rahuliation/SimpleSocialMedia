import { athenticate } from './../../middleware/auth';
import * as express from 'express';
import controller from './controller'

export default express.Router()
    .post('/', controller.create)
    .get('/',athenticate, controller.all)
    .get('/getprofile', athenticate, controller.getProfile)
    .post('/gettoken', controller.getToken);