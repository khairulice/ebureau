import { guestRequestConstants } from '../_constants';

export const guestRequestActions = {
    updateCompletedNumber,
    updatePendingNumber,
}

function updateCompletedNumber(length){
    return dispatch =>{       
        dispatch({ type: guestRequestConstants.GUEST_REQUEST_COMPLETED, completed: length });
    }    
}

function updatePendingNumber(length){
    return dispatch =>{       
        dispatch({ type: guestRequestConstants.GUEST_REQUEST_PENDING, pending: length });
    }
    
}

