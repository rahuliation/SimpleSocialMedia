import { Apis } from './../Apis';
import { isEmpty, pick, isEqual } from 'lodash';
import { types, flow, getSnapshot, applySnapshot } from 'mobx-state-tree';
import axios from 'axios';
import { isEmail } from 'validator';

export const User = types.model('users', {
    _id: types.maybe(types.identifier(types.string)),
    name: types.optional(types.string, ''),
    username: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    access_token: types.maybe(types.string)
}).volatile((self): {
    password: null | string,
    repeatPassword: null | string
} => ({
    password: null,
    repeatPassword: null
} )).views((self) => ({
    get CreateValidate() {
        return isEmpty(self.name) === false
            && isEmpty(self.username) === false
            && isEmpty(self.password) === false
            && isEmpty(self.repeatPassword) === false
            && isEqual(self.repeatPassword, self.password)
            && isEmpty(self.email) === false
            && isEmail(self.email);
    },
    get UpdateValidate() {
        return isEmpty(self.name) === false
            && isEmpty(self.username) === false
            && isEmpty(self.email) === false;
    }
})).actions((self) => ({
    setName(name: string) {
        self.name = name;
    },
    setPassword(password: string) {
        self.password = password;
    },
    setEmail(email: string) {
        self.email = email;
    },
    setRepeatPassword(repeatPassword: string) {
        self.repeatPassword = repeatPassword;
    },
    setUsername(username: string) {
        self.username = username.toLowerCase().replace(/\s/g, '');
    }
})).actions((self) => {

    const save = flow(function* () {
        if (self._id === null && self.CreateValidate === false) {
            return false;
        }
        if (self._id && self.UpdateValidate === false) {
            return false;
        }
        try {
            var res = yield axios({
                method: Apis.SIGNUP.method,
                url: Apis.SIGNUP.url,
                data: {
                    ...pick(getSnapshot(self), ['name', 'username', 'email']),
                    password: self.password
                }
            });
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e);
        }
        if (res.status !== 200) {
          return false;
        }
        self.setPassword('');
        self.setRepeatPassword('');
        applySnapshot(self, res.data);
        
        // tslint:disable-next-line:no-console
        console.log('success');
        return true;
    });
    return { save };
});

export const UserStore = types.model('users', {
    users: types.optional(types.array(User), []),
    currentUser: types.optional(User, {})
});