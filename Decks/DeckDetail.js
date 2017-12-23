import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { fetchAllDecks } from '../Decks/decksAction'
import { AppLoading } from 'expo'
import { CenterView, AppButton, AppButtonLabel, DeckHeadingLabel } from '../utils/appStyles'

class DeckDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params

        return {
            title: `${deckTitle}`
        }
    }

    state = {
        deck: this.props.deck,
        deckTitle: this.props.deckTitle
    }

    render() {
        const { deckTitle, deck } = this.props

        return (
            <CenterView>
                <DeckHeadingLabel>{typeof deck === "undefined" ? 0 : deck.questions.length} cards</DeckHeadingLabel>
                <AppButton key='newCard'
                    onPress={() => this.props.navigation.navigate(
                        'NewCard',
                        { deckTitle: deckTitle }
                    )}>
                    <AppButtonLabel>Add Card</AppButtonLabel>
                </AppButton>

                <AppButton key='quiz'
                    onPress={() => this.props.navigation.navigate(
                        'QuizView',
                        { deckTitle: deckTitle }
                    )}>
                    <AppButtonLabel>Start Quiz</AppButtonLabel>
                </AppButton>
            </CenterView>
        );
    }
}

function mapStateToProps(state, { navigation }) {
    const { deckTitle } = navigation.state.params
    const decks = state.decksReducer.decks

    return {
        deck: decks[deckTitle],
        deckTitle
    }
}

export default connect(mapStateToProps)(DeckDetail)