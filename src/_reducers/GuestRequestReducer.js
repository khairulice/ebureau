import { guestRequestConstants } from '../_constants';

export function guestRequestReducer(state = { completed: 0, pending: 0 }, action) {
    switch (action.type) {
        case guestRequestConstants.GUEST_REQUEST_COMPLETED:
            return { ...state, completed: action.completed };
        case guestRequestConstants.GUEST_REQUEST_PENDING:
            return { ...state, pending: action.pending };
        default:
            return state
    }
}