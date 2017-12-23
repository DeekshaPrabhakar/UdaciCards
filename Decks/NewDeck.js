import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native'
import { addNewDeck } from '../Decks/decksAction'
import { AppLoading } from 'expo'
import { CenterView, AppButton, AppButtonLabel, NewDeckCardView, NewDeckLabel } from '../utils/appStyles'

class NewDeck extends Component {
    state = {
        decks: this.props.decks,
        newDeckName: ''
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.decks !== undefined) {
            let decks = Object.values(nextProps.decks)
            this.setState({
                decks: decks
            })
        }
    }

    submit = () => {
        const newDeckName = this.state.newDeckName
        this.props.addNewDeck(newDeckName)

        this.setState(() => ({ newDeckName: '' }))
        this.toDeckDetail(newDeckName)
    }

    toDeckDetail = (newDeckName) => {
        this.props.navigation.navigate(
            'DeckDetail',
            { deckTitle: newDeckName }
        )
    }

    render() {
        const decks = this.state.decks ? this.state.decks : []

        return (
            <CenterView>
                <NewDeckLabel>What is the title of your new deck?</NewDeckLabel>
                <NewDeckCardView onChangeText={(text) => this.setState({ newDeckName: text })} />
                <AppButton
                    onPress={this.submit}>
                    <AppButtonLabel>SUBMIT</AppButtonLabel>
                </AppButton>
            </CenterView>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNewDeck: (deckName) => dispatch(addNewDeck(deckName))
    }
}

function mapStateToProps(state, ownProps) {
    const decks = state.decksReducer.decks
    return { decks: decks };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)