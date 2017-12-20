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

class DeckDetail extends Component {

    render() {
        const { deckTitle } = this.props
        return (
            <CenterView>
                <Text>Deck Detail {deckTitle}</Text>
                <TouchableOpacity key='newCard'
                    onPress={() => this.props.navigation.navigate(
                        'NewCard',
                        { deckTitle: deckTitle }
                    )}>
                    <DeckView>
                        <Text style={{ alignItems: 'center', fontSize: 22, fontWeight: 'bold', color: textColor }} >Add Card</Text>
                    </DeckView>
                </TouchableOpacity>

                <TouchableOpacity key='quiz'
                    onPress={() => this.props.navigation.navigate(
                        'QuizView',
                        { deckTitle: deckTitle }
                    )}>
                    <DeckView>
                        <Text style={{ alignItems: 'center', fontSize: 22, fontWeight: 'bold', color: textColor }} >Start Quiz</Text>
                    </DeckView>
                </TouchableOpacity>
            </CenterView>
        );
    }
}

function mapStateToProps(state, { navigation }) {
    const { deckTitle } = navigation.state.params

    return {
        deckTitle
    }
}

export default connect(mapStateToProps)(DeckDetail)