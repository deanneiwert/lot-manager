import axios from 'axios';
import {
    errorHandler, authHeader
} from '../_helpers';

export const lotStatusService = {
    getLotStatuses,
    setLotStatuses
};

function getLotStatuses(builderId) {
    
    return axios.get(`/lotStatuses/${builderId}`, {
            headers: authHeader(),
        })
        .then(response => {
            return response.data.lotStatuses;
        })
        .catch(error => {
            return errorHandler(error);
        });
}


function setLotStatuses(lotStatuses, builderId) {
    return axios.post('/setLotStatuses', {
            lotStatuses, 
            builderId
        },
        {
            headers: authHeader(),
        })
        .then(response => {
            return response.data.lotStatuses;
        })
        .catch(error => {
            return errorHandler(error);
        });
}