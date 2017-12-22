import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { fetchAllDecks } from '../Decks/decksAction'
import { AppLoading } from 'expo'
import { bgColor, textColor, inActiveColor, white, deckBgColor } from '../utils/colors'
import styled from 'styled-components/native'

const CenterView = styled.View`
    flex: 1;
    align-items: stretch;
    background: ${bgColor};
    padding-top: 20px;
`

const DetailButton = styled.TouchableOpacity`
    border: 1px solid ${inActiveColor};
    height: 50px;
    margin: 10px 80px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: ${deckBgColor};
`

const DetailButtonLabel = styled.Text`
    color: ${white};
    font-size: 15px;
    margin: 0px 40px;
`
const CardLabel = styled.Text`
    color: ${textColor};
    font-size: 15px;
    margin: 10px 80px;
    justify-content: center;
    align-items: center;
`

class DeckDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params

        return {
            title: `${deckTitle}`
        }
    }
    state = {
        deck:this.props.deck,
        deckTitle: this.props.deckTitle
    }
    render() {
        const { deckTitle, deck } = this.props
        
        return (
            <CenterView>
                <CardLabel>{typeof deck === "undefined" ? 0 : deck.questions.length} cards</CardLabel>
                <DetailButton key='newCard'
                    onPress={() => this.props.navigation.navigate(
                        'NewCard',
                        { deckTitle: deckTitle }
                    )}>
                        <DetailButtonLabel>Add Card</DetailButtonLabel>
                </DetailButton>

                <DetailButton key='quiz'
                    onPress={() => this.props.navigation.navigate(
                        'QuizView',
                        { deckTitle: deckTitle }
                    )}>
                        <DetailButtonLabel>Start Quiz</DetailButtonLabel>
                </DetailButton>
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