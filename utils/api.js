import { AsyncStorage } from 'react-native'

const UDACICARDS_STORAGE_KEY = 'UdaciCards:Deek'

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
          question: 'ReactJS is developed by',
          answer: 'Facebook Engineers'
        },
        {
          question: 'ReactJS is an MVC based framework',
          answer: 'False'
        },
        {
          question: 'ReactJS focuses on which of the following part when considering MVC?',
          answer: 'V (View)'
        },
        {
          question: 'What needs to be updated to achieve dynamic UI updates',
          answer: 'state'
        },
        {
          question: 'Which API is a MUST for every ReactJS component',
          answer: 'render'
        },
        {
          question: 'div defined within render method is an actual DOM div element',
          answer: 'False'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        },
        {
          question: 'What is used to pass the data from parent to child',
          answer: 'props'
        },
        {
          question: 'A component in ReactJS could be composed of one or more inner components',
          answer: 'True'
        },
        {
          question: ' JSX transformer is a MUST to work with ReactJS',
          answer: 'False'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        },
        {
          question: 'Javascript Array can hold values of different data types.',
          answer: 'True'
        },
        {
          question: 'One needs to use a Class keyword to create an object in Javascript.',
          answer: 'False'
        },
        {
          question: 'Any Javascript function can serve as a constructor',
          answer: 'True'
        },
        {
          question: 'New properties could be added to an object anytime later after the object is created',
          answer: 'True'
        },
        {
          question: 'The additonal properties assigned to an object after it got instantiated, are available to other objects',
          answer: 'False'
        }
      ]
    }
  }

  return defaultData
}