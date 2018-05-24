import {User, UserModelI } from './../db/user';
import L from '../../common/logger'


export class UserService {
  // all(): Promise<UserModel[]> {

  //   return Promise.resolve();
  // }

  byId(id: number): Promise<UserModelI> {
    return User.findById(id).exec();
  }

  create(elm): Promise<UserModelI> {

    return new User(elm).save();
  }
}

export default new UserService();