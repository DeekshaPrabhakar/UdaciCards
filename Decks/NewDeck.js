import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native'
import { addNewDeck } from '../Decks/decksAction'
import { AppLoading } from 'expo'
import { CenterView, AppButton, AppButtonLabel, NewDeckCardView, NewDeckLabel } from '../utils/appStyles'
import { NavigationActions } from 'react-navigation'




  
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

        this.toDeckDetail(newDeckName)
    }

    toDeckDetail = (newDeckName) => {
        this.setState(() => ({ newDeckName: '' }))
        const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({ routeName: 'Home'}),
              NavigationActions.navigate({ routeName: 'DeckDetail',  params: {deckTitle: newDeckName}})
            ]
          })
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        const decks = this.state.decks ? this.state.decks : []

        return (
            <CenterView>
                <NewDeckLabel>What is the title of your new deck?</NewDeckLabel>
                <NewDeckCardView value={this.state.newDeckName} onChangeText={(text) => this.setState({ newDeckName: text })} />
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