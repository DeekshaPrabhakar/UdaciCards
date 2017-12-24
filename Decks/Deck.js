import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { DeckView, CardLabel, DeckLabel } from '../utils/appStyles'

class Deck extends Component {

    render() {
        const { title, questions } = typeof this.props.deck !== undefined ? this.props.deck : { title: '', questions: [] }

        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate(
                    'DeckDetail',
                    { deckTitle: title }
                )}
            >
                <DeckView>
                    <DeckLabel>{title}</DeckLabel>
                    <CardLabel>{questions.length} cards</CardLabel>
                </DeckView>
            </TouchableOpacity>
        )
    }
}


export default Deck