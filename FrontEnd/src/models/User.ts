import { Apis } from './../Apis';
import { isEmpty, pick, isEqual } from 'lodash';
import { types, flow, getSnapshot, applySnapshot } from 'mobx-state-tree';
import axios from 'axios';
import { isEmail } from 'validator';
import { fileToBase64 } from 'utils';
import { socket } from 'index';

export const User = types.model('users', {
    _id: types.maybe(types.string),
    name: types.optional(types.string, ''),
    username: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    image: types.optional(types.string, ''),
    accessToken: types.maybe(types.string)
}).volatile((self): {
    password: null | string,
    repeatPassword: null | string,
    base64Image: null | string,
    online: boolean
} => ({
    password: null,
    repeatPassword: null,
    base64Image: null,
    online: false
})).views((self) => ({
    get authenticated() {
        if (isEmpty(self.accessToken)) {
            return false;
        }
        return true;
    },
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
    },
    get loginValidatie() {
        return isEmpty(self.username) === false
            && isEmpty(self.password) === false;
    }
})).actions((self) => ({
    reset() {
        self.password = null;
        self.base64Image = null;
        self.repeatPassword = null;
    },
    setName(name: string) {
        self.name = name;
    },
    setOnline(online: boolean) {
        self.online = online;
    },
    setToken(token: string) {
        self.accessToken = token;
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
    },
    setAccessToken(token: string |null) {
        self.accessToken = token;
    }
})).actions((self) => {
    const setBase64Image = flow(function* (image: any) {
        self.base64Image = yield fileToBase64(image[0]);
    });
    const login = flow(function* () {
        if (self.loginValidatie === false) {
            return false;
        }
        try {
            var res = yield axios({
                method: Apis.LOGIN.method,
                url: Apis.LOGIN.url,
                data: {
                    username: self.username,
                    password: self.password
                }
            });
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e);
        }
        if (isEqual(typeof res.status, 'undefiend') === false && res.status !== 200) {
            return false;
        }
        if (res.data.token) {
            axios.defaults.headers.common = {
                _token: res.data.token,
            };
            localStorage.setItem('token', res.data.token);

            applySnapshot(self, {
                ...res.data,
                accessToken: res.data.token
            });

        }
        socket.emit('getProfile', getSnapshot(self));

    });
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
                    image: self.base64Image,
                    password: self.password
                }
            });
            if (res.status && res.status !== 200) {
                return false;
            }
            self.reset();
            applySnapshot(self, res.data);
            return true;

        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e);
        }

    });
    
    return { save, setBase64Image, login };
});

export const UserStore = types.model('users', {
    userList: types.optional(types.array(User), []),
    currentUser: types.optional(User, {})

}).actions( (self) => {

    const loadlist = flow(function* () {
        
        try {
            var res = yield axios({
                method: Apis.USERLIST.method,
                url: Apis.USERLIST.url,
            });
            if (res.status && res.status !== 200) {
                return false;
            }
            const users: typeof User.SnapshotType[] = res.data;
            users.map(user => 
                self.userList.push (User.create(user))
            );
            socket.on('online', function(data: any) {
                
                // tslint:disable-next-line:no-console
                console.log(data);
                self.userList.map((user, key) => {
                    if (isEqual(user._id, data._id)) {
                        self.userList[key].setOnline(true);
                    }
                });
            });
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e);
        }
        
    });
    const afterCreate = flow(function* () {
        var token = localStorage.getItem('token');
        if (!token) { 
            return false;
        }
        axios.defaults.headers.common = {
            '_token': token,
        };
        self.currentUser.setAccessToken(token);

        try {
            var res = yield axios({
                method: Apis.GETPROFILE.method,
                url: Apis.GETPROFILE.url
            });
            if (isEqual(typeof res.status, 'undefiend') || res.status !== 200) {
                axios.defaults.headers.common = {
                    '_token': null,
                };
                self.currentUser.setAccessToken(null);
                return false;
            }
            applySnapshot(self.currentUser, {
                ...res.data,
                accessToken: token
            });
            socket.emit('getProfile', getSnapshot(self.currentUser));
        
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e);
        }

    });
    return { loadlist, afterCreate };

});