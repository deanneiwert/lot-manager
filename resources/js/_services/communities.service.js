import axios from 'axios';
import {
    errorHandler,
    authHeader
} from '../_helpers';

export const communityService = {
    getCommunities,
    getLots,
};

function getCommunities(options) {
    let builderId = options.builderId ? options.builderId : '';
    let nameFilter = options.nameFilter ? options.nameFilter : '';
    return axios.get(`/communities/${builderId}`, {
            params: {
                page: options.page,
                pageSize: options.pageSize,
                nameFilter,
            },
            headers: authHeader(),
        })
        .then(response => {
            return response.data.communitiesChunk;
        })
        .catch(error => {
            return errorHandler(error);
        });
}

function getLots(communityId) {
    return axios.get(`/communities/lots/${communityId}`, {
            headers: authHeader(),
        })
        .then(response => {
            return response.data.lots;
        })
        .catch(error => {
            return errorHandler(error);
        });
}
