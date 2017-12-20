import { AsyncStorage } from 'react-native'

const UDACICARDS_STORAGE_KEY = 'UdaciCards:Deeksha'

export function fetchAllDecks() {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
    .then(formatResults)
}

function formatResults(results) {
  return results === null
    ? getDefaultData()
    : JSON.parse(results)
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