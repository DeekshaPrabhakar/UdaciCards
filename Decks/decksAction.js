import * as API from '../utils/api'
import { RECEIVE_DECKS, ADD_DECK } from '../app/actionTypes'

export const receiveDecks = decks => ({
    type: RECEIVE_DECKS,
    decks
})

export const fetchAllDecks = () => dispatch => (
    API.fetchAllDecks().then((decks) => dispatch(receiveDecks(decks)))
);

export const addDeck = decks => ({
    type: ADD_DECK,
    decks
})

export const addNewDeck = (deckName) => dispatch => (
    API.addNewDeck(deckName).then((deck) => dispatch(addDeck(deck)))
);
