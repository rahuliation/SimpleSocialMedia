import { pick } from 'lodash';
import * as  jwt from 'jsonwebtoken';
import { User, UserModelI } from './../db/user';
import L from '../../common/logger';
import { fileUpload, getURL } from '../../common/myutils';
import { readlink } from 'fs';
export class UserService {
  all(): Promise<UserModelI[]> {
    return User.find({}).exec();
  }

  byId(id: number): Promise<UserModelI> {
    return User.findById(id).exec();
  }

  getToken(username: string, 
    password: string, longlive?: boolean): Promise<{ _id: string, 
    token: string, username: string, 
    name: string, email: string, image: string }> {
      
    return new Promise(async (resolve, reject) => {
      let user = await User.findOne({ username }).exec();
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch === true) {
          let token = jwt.sign({
            username: username,
            alive: longlive ? Math.floor(Date.now() / 1000) + 86400 : Math.floor(Date.now() / 1000) + 8640000
          }, process.env.TOKEN_SECRET);
          resolve({
            token,
            ...pick(user, [
              '_id',
              'name',
              'username',
              'email',
              'image'
            ])

          })
        } else {
          reject('Password Didnt match')
        }
      });
    });
  }

  getProfile(token): Promise<UserModelI> | any {
    return new Promise(function (resolve, reject) {
      jwt.verify(token, process.env.TOKEN_SECRET, async function (err, decoded) {
        if (err) return reject(err);
        if (decoded.username) {
          try {
            let user = await User.findOne({ 'username': decoded.username });
            return resolve(user);

          } catch (e) {
            return reject(e);
          }
        }


      });
    })

  }

  create(req): Promise<UserModelI> {
    let { name, username, email, password, image } = req.body;
    return User.findOne({ 'username': username })
      .then((result) => {
        if (result) {
          throw 'Username Already Exist'
        }
        return fileUpload(image, '/storage', username)
      })
      .then((path: string) => {

        return new User({ name, username, email, password, image: path.replace('public', '') }).save()
      });
  }
}

export default new UserService();