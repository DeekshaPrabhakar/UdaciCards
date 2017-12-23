import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'UdaciCards:notifications'

export function getDefaultData() {
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

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'Take a quiz!',
    body: "👋 don't forget to take a card quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
