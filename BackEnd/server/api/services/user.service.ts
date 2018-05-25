import  * as  jwt  from 'jsonwebtoken';
import { User, UserModelI } from './../db/user';
import L from '../../common/logger';

export class UserService {
  all(): Promise<UserModelI[]> {
    return User.find({}).exec();
  }

  byId(id: number): Promise<UserModelI> {
    return User.findById(id).exec();
  }

  getToken(username:string, password: string , longlive?: boolean): Promise<{token: string}> {

    return new Promise(async (resolve, reject) => {
      let user = await User.findOne({ username }).exec();
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch === true) {
          let token = jwt.sign({
            username: username,
            alive: longlive? Math.floor(Date.now() / 1000) + 86400 : Math.floor(Date.now() / 1000) + 8640000
          }, process.env.TOKEN_SECRET);
          resolve({ token : token})
        } else {
          reject('Password Didnt match')
        }
      });

     

    });
  }

  create(elm): Promise<UserModelI> {

    return new User(elm).save();
  }
}

export default new UserService();