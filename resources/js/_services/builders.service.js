import axios from 'axios';
import {
    errorHandler, authHeader
} from '../_helpers';

export const builderService = {
    getBuilders,
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
