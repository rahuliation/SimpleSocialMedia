import { UserStore } from './User';
import { types } from 'mobx-state-tree';

export const Store = types.model('MainStore', {
    userStore: types.optional(UserStore, {})
});