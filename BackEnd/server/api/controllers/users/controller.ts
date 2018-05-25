import UserService from '../../services/user.service';
import { Request, Response } from 'express';
import { getURL } from '../../../common/myutils';

export class Controller {
  all(req: Request, res: Response): void {

    UserService.all()
    .then(r => res
      .status(201)
      .json(r.map(( {id, name, username, email}) =>({
        id,
        name,
        username,
        email,
        link: getURL(req, `/api/v1/users/${id}` )
      }))),
    ).catch(err =>
      res
        .status(400)
        .json({error: 'something went wrong'}),

    );

  }

  byId(req: Request, res: Response): void {
    UserService.byId(req.params.id)
    .then(({id, name, username, email}) => {
     res.json({id, name, username, email});
    }).catch(err =>
      res
        .status(400)
        .json({error: 'something went wrong'}),
    );
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

    UserService.create(req.body).then(r =>
      res
        .status(201)
        .location(`/api/v1/users/${r.id}`)
        .json(r),
    ).catch(err =>
      res
        .status(400)
        .json({error: 'something went wrong'}),
    );
  }
}
export default new Controller();
