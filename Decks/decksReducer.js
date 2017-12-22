import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../app/actionTypes'

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
        case ADD_DECK:
            updatedDecks = decks
            newState = {
                ...state,
                "decks": updatedDecks
            }
            return newState
        case ADD_CARD:
            updatedDecks = decks
            newState = {
                ...state,
                "decks": updatedDecks
            }
            return newState
        default:
            return state
    }
}

export default decksReducer