import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { fetchAllDecks } from '../Decks/decksAction'
import { AppLoading } from 'expo'
import { bgColor, textColor } from '../utils/colors'
import styled from 'styled-components/native'

const CenterView = styled.View`
    flex: 1;
    align-items: stretch;
    background: ${bgColor};
    padding-top: 20px;
`

const DeckView = styled.View`
    border: 2px solid ${textColor};
    height: 60px;
    margin: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params

        return {
            title: `${deckTitle}`
        }
    }

    state = {
        deck: this.props.deck,
        deckTitle: this.props.deckTitle,
        quizQuestionIndex: 0,
        isQuestion: true,
        question: '',
        answer: ''
    }

    componentDidMount() {
        const { deck } = this.state
        if (typeof deck !== undefined && deck.questions !== undefined && deck.questions.length) {
            let questionObject = deck.questions[this.state.quizQuestionIndex]
            const { question, answer} = questionObject
            this.setState({
                question,
                answer
            })
        }
    }

    render() {
        const { deckTitle, deck } = this.state
        const { question, answer } = this.state

        return (
            <CenterView>
                <Text>Quiz about deck {deckTitle}</Text>
                {this.state.isQuestion && (
                    <Text>{question}</Text>
                )}
                {!this.state.isQuestion && (
                    <Text>{answer}</Text>
                )}
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

export default connect(mapStateToProps)(Quiz)