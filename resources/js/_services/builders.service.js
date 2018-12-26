import axios from 'axios';
import {
    errorHandler,
    authHeader
} from '../_helpers';

export const builderService = {
    getBuilders,
    getBuilder
};

function getBuilders() {
    return axios.get(`/builders/`, {
            headers: authHeader(),
        })
        .then(response => {
            return response.data.builders;
        })
        .catch(error => {
            return errorHandler(error);
        });
}

function getBuilder(builderId) {
    return axios.get(`/builders/${builderId}`, {
            headers: authHeader(),
        })
        .then(response => {
            return response.data.builder;
        })
        .catch(error => {
            return errorHandler(error);
        });
}
