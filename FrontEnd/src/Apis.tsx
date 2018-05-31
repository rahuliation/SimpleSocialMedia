
const baseUrl: string = 'http://paykari.com:4000';
const apiRoute: string = '/api/v1';

export const Apis = {
    BASE_URL: baseUrl,
    SIGNUP: {
        url: baseUrl + apiRoute + '/users',
        method: 'post',
    },
    LOGIN: {
        url: baseUrl + apiRoute + '/users/gettoken',
        method: 'post',
    },
    USERLIST: {
        url: baseUrl + apiRoute + '/users',
        method: 'get',
    },
    GETPROFILE: {
        url: baseUrl + apiRoute + '/users/getprofile',
        method: 'get',
    }

};