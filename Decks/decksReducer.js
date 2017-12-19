import { RECEIVE_DECKS } from '../app/actionTypes'

function decksReducer(state = { decks: [] }, action) {
    const { decks } = action
    let newState = {}

    switch (action.type) {
        case RECEIVE_DECKS:
            newState = {
                ...state,
                "decks": decks
            }
            return newState
        default:
            return state
    }
}

export default decksReducer