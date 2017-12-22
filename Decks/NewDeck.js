import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native'
import { addNewDeck } from '../Decks/decksAction'
import { AppLoading } from 'expo'
import { bgColor, textColor, inActiveColor, white, deckBgColor } from '../utils/colors'
import styled from 'styled-components/native'

const CenterView = styled.View`
    flex: 1;
    align-items: stretch;
    background: ${bgColor};
    padding-top: 20px;
    justify-content: center;
`

const SubmitButton = styled.TouchableOpacity`
    border: 1px solid ${inActiveColor};
    height: 50px;
    margin: 10px 80px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: ${deckBgColor};
`

const SubmitButtonLabel = styled.Text`
    color: ${white};
    font-size: 15px;
    margin: 0px 40px;
`

const NewDeckView = styled.TextInput`
    border: 1px solid ${textColor};
    height: 50px;
    margin: 10px 40px;
    justify-content: center;
    align-items: stretch;
    border-radius: 5px;
    font-size: 24px;
    padding: 10px;
    color: ${textColor};
`

const DeckLabel = styled.Text`
    color: ${textColor};
    font-size: 60px;
    margin: 0px 40px;
    justify-content: center;
    align-items: center;
`

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
                <DeckLabel>What is the title of your new deck?</DeckLabel>
                <NewDeckView onChangeText={(text) => this.setState({ newDeckName: text })} />
                <SubmitButton
                    onPress={this.submit}>
                    <SubmitButtonLabel>SUBMIT</SubmitButtonLabel>
                </SubmitButton>
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