import axios from 'axios';
import {
    errorHandler,
    authHeader
} from '../_helpers';

export const communityService = {
    getCommunities,
    getLots,
    saveLot,
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

function saveLot({
    id,
    lot_number,
    lot_status_id,
    street_address
}) {
    return axios.post('/communities/saveLot', {
            id,
            lot_number,
            lot_status_id,
            street_address,
        }, {
            headers: authHeader(),
        })
        .then(response => {
            return response.data.lot;
        })
        .catch(error => {
            return errorHandler(error);
        });
}
