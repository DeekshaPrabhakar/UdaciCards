import React from 'react'
import { View, Platform, StatusBar, StyleSheet, Text } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './app/reducers'
import DecksView from './Decks/DecksView'
import NewDeck from './Decks/NewDeck'
import DeckDetail from './Decks/DeckDetail'
import NewCard from './Cards/NewCard'
import Quiz from './Cards/Quiz'
import { fetchAllDecks } from './Decks/decksAction'
import { bgColor, textColor, inActiveColor } from './utils/colors'
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

export default class App extends React.Component {
  render() {

    const composeEnhancers = compose
    const store = createStore(
      reducer,
      composeEnhancers(
          applyMiddleware(thunk)
      )
  )

  function UdaciCardsStatusBar ({backgroundColor, ...props}) {
    return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    )
  }

  const Tabs = TabNavigator({
    Home: {
      screen: DecksView,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => <Foundation name='clipboard-notes' size={30} color={tintColor} />
      },
    },
    AddDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
      },
    }
  }, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: textColor,
      inactiveTintColor:inActiveColor,
      style: {
        height: 56,
        backgroundColor: bgColor,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })

  const MainNavigator = StackNavigator({
    Home: {
      screen: Tabs,
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: {
        headerTintColor: textColor,
        headerStyle: {
          backgroundColor: inActiveColor,
        }
      }
    },
    NewCard: {
      screen: NewCard,
      navigationOptions: {
        headerTintColor: textColor,
        headerStyle: {
          backgroundColor: inActiveColor,
        }
      }
    },
    QuizView: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: textColor,
        headerStyle: {
          backgroundColor: inActiveColor,
        }
      }
    }
  })
  
  store.dispatch(fetchAllDecks())
    return (
      // <View style={styles.container}>
      // <Foundation name='clipboard-notes' size={50}  />
      //   <Text>Open up App.js to start working on your app!</Text>
      //   <Text>Changes you make will automatically reload.</Text>
      //   <Text>Shake your phone to open the developer menu.</Text>
      // </View>
      <Provider store={store}>
      <View style={{flex: 1}}>
      {/* <DecksView /> */}
        <UdaciCardsStatusBar backgroundColor={textColor} tintColor={textColor} barStyle="light-content" />
        <MainNavigator />
      </View>
    </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
