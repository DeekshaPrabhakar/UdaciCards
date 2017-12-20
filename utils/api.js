import { AsyncStorage } from 'react-native'

const UDACICARDS_STORAGE_KEY = 'UdaciCards:Deeks'

export function fetchAllDecks() {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then(formatResults)
}

export async function addNewDeck(deckName) {
  try {
    let decks = await fetchAllDecks()
    decks[deckName] = { title: deckName, questions: [] };
    await AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(decks));
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

function getDefaultData() {
  const defaultData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

  return defaultData
}