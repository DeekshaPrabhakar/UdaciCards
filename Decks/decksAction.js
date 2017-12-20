import * as API from '../utils/api'
import { RECEIVE_DECKS } from '../app/actionTypes'

export const receiveDecks = decks => ({
    type: RECEIVE_DECKS,
    decks
})

export const fetchAllDecks = () => dispatch => (
    API.fetchAllDecks().then((decks) => dispatch(receiveDecks(decks)))
);
