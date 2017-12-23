import { AsyncStorage } from 'react-native'
import { getDefaultData } from '../utils/helpers'
const UDACICARDS_STORAGE_KEY = 'UdaciCards:Deeksha'

export function fetchAllDecks() {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then(formatResults)
}

export async function addNewDeck(deckName) {
  try {
    let decks = await fetchAllDecks()
    decks[deckName] = { title: deckName, questions: [] }
    await AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(decks));
    return decks;
  }
  catch (error) {
    console.log(error)
  }

  return null
}

export async function addNewCard(deckName, newCard) {
  try {
    let decks = await fetchAllDecks()
    decks[deckName].questions = [...decks[deckName].questions, newCard]
    await AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(decks))
    return decks;
  }
  catch (error) {
    console.log(error)
  }

  return null
}

async function formatResults(results) {
  if (results === null) {
    results = getDefaultData()
    try {
      await AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(results))
    }
    catch (error) {
      console.log(error)
    }
  }
  
  return JSON.parse(results)
}