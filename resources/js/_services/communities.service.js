import axios from 'axios';
import {
    errorHandler, authHeader
} from '../_helpers';

export const communityService = {
    getCommunities,
};

function getCommunities(options) {
    return axios.get(`/communities/${options.pageSize}/${options.nameFilter}`, {
            params: {
                page: options.page
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
