import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { fetchAllDecks } from '../Decks/decksAction'
import { AppLoading } from 'expo'
import { bgColor, textColor, deckBgColor } from '../utils/colors'
import styled from 'styled-components/native'

const CenterView = styled.View`
    flex: 1;
    align-items: stretch;
    background: ${bgColor};
    padding-top: 20px;
`

const DeckView = styled.View`
    border: 1px solid ${textColor};
    height: 60px;
    margin: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: ${deckBgColor};
`

class DecksView extends Component {
    state = {
        decks: this.props.decks,
        ready: false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.decks !== undefined) {
            let decks = Object.values(nextProps.decks)
            this.setState({
                decks: decks,
                ready: true
            })
        }
    }

    render() {
        const decks = this.state.decks ? this.state.decks : []
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <CenterView>
                {decks.map((deck) => {
                    const { title, questions } = deck
                    return (
                        <TouchableOpacity key={title}
                            onPress={() => this.props.navigation.navigate(
                                'DeckDetail',
                                { deckTitle: title }
                            )}
                        >
                            <DeckView>
                                <Text style={{ alignItems: 'center', fontSize: 22, fontWeight: 'bold', color: textColor }} >{title}</Text>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{questions.length} cards</Text>
                            </DeckView>
                        </TouchableOpacity>
                    )
                })}
            </CenterView>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const decks = state.decksReducer.decks
    return { decks: decks };
}

export default connect(mapStateToProps)(DecksView)