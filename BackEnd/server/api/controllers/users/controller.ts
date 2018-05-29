import { pick } from 'lodash';
import UserService from '../../services/user.service';
import { Request, Response } from 'express';
import { getURL } from '../../../common/myutils';
import { IO } from '../../socketing/socketing';

export class Controller {
  all(req: Request, res: Response): void {

    UserService.all()
    .then(r => res
      .status(200)
      .json(r.map(( val) =>({
        ...pick(val,[
          'id',
          'name',
          'username',
          'email',
          'image'
        ])
       ,
        link: getURL(req, `/api/v1/users/${val.id}` )
      }))),
    ).catch(err =>
      res
        .status(400)
        .json({error: 'something went wrong'}),

    );

  }

  getProfile(req: Request & {theuser: {}}, res: Response): void {

    if(req.theuser) {
      res.json({
        ...pick(req.theuser,[
          '_id',
          'name',
          'username',
          'email',
          'image'
        ])
      });
    }
    else {
      res
      .status(400)
      .json({error: 'user note found'});
    }
  }

  getToken(req: Request, res: Response): void {

    UserService.getToken(req.body.username, req.body.password, req.body.remember )
    .then((r) => {
     res.json(r);
    }).catch(err =>
      res
        .status(400)
        .json({error: err}),
    );
  }

  create(req: Request, res: Response): void {

    UserService.create(req).then(r => {

      return res
      .status(200)
      .location(`/api/v1/users/${r.id}`)
      .json( {
        ...pick(r,[
          '_id',
          'name',
          'username',
          'email',
          'image'
        ])
      });
    }
    
    ).catch(err =>
      res
        .status(400)
        .json({error: err}),
    );
  }
}
export default new Controller();
