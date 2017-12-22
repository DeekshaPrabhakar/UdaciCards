import * as API from '../utils/api'
import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../app/actionTypes'

export const receiveDecks = decks => ({
    type: RECEIVE_DECKS,
    decks
})

export const fetchAllDecks = () => dispatch => (
    API.fetchAllDecks().then((decks) => dispatch(receiveDecks(decks)))
);

export const addDeck = decks => ({ //get back new set of decks
    type: ADD_DECK,
    decks
})

export const addNewDeck = (deckName) => dispatch => (
    API.addNewDeck(deckName).then((deck) => dispatch(addDeck(deck)))
);


export const addCard = decks => ({
    type: ADD_CARD,
    decks
})

export const addNewCard = (deckName, card) => dispatch => (
    API.addNewCard(deckName, card).then((decks) => dispatch(addCard(decks)))
);
