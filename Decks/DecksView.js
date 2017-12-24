import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native'
import { fetchAllDecks } from '../Decks/decksAction'
import { AppLoading } from 'expo'
import { CenterView, DeckView, CardLabel, DeckLabel } from '../utils/appStyles'
import Deck from './Deck'

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
                <FlatList data={decks} renderItem={({ item }) =>
                    <Deck deck={item} navigation={this.props.navigation} />
                } keyExtractor={(item, index) => index} />
            </CenterView>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const decks = state.decksReducer.decks
    return { decks: decks };
}

export default connect(mapStateToProps)(DecksView)