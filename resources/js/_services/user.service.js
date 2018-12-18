import axios from 'axios';
import {
    errorHandler
} from '../_helpers';
import {
    authHeader
} from '../_helpers'

export const userService = {
    login,
    register,
    logout,
    getUsers,
};

function login(formData) {
    return axios.post('/auth/login', formData)
        .then(response => {
            // login successful if there's a jwt token in the response
            let user = response.data;
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        })
        .catch(error => {
            return errorHandler(error);
        });
}

function register(formData) {
    return axios.post('/auth/register', Object.assign({}, formData, {
            name: formData.firstName + ' ' + formData.lastName
        }))
        .then(response => {
            // login successful if there's a jwt token in the response
            let user = response.data;
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        })
        .catch(error => {
            return errorHandler(error);
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getUsers(options) {
    return axios.get(`/users/${options.pageSize}/${options.nameFilter}`, {
            params: {
                page: options.page
            },
            headers: authHeader(),
        })
        .then(response => {
            return response.data.usersChunk;
        })
        .catch(error => {
            return errorHandler(error);
        });
}
