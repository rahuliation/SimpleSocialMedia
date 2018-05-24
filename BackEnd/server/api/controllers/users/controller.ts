import UserService from '../../services/user.service';
import { Request, Response } from 'express';

export class Controller {
  all(req: Request, res: Response): void {
    res
    .status(201)
    .location(`/api/v1/users/`)
    .json({omj: 'nothing is nothing'});
  }

  byId(req: Request, res: Response): void {
    UserService.byId(req.params.id).then(r => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
       res
    .status(201)
    .json({omj: 'nothing is nothing'});
    // UserService.create(req.body).then(r =>
    //   res
    //     .status(201)
    //     .location(`/api/v1/users/${r.id}`)
    //     .json(r),
    // ).catch(err =>
    //   res
    //   .status(400)
    //   .json(err),
    // );
  }
}
export default new Controller();
