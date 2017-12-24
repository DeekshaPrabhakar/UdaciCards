import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native'
import { addNewCard } from '../Decks/decksAction'
import { AppLoading } from 'expo'
import { CenterView, AppButtonLabel, NewCardLabel, AppButton, NewDeckCardView } from '../utils/appStyles'

class NewCard extends Component {
    state = {
        question: '',
        answer: '',
        deckTitle: this.props.deckTitle
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Card'
        }
    }
    submit = () => {
        const deckTitle = this.state.deckTitle

        const newCard = {
            question: this.state.question,
            answer: this.state.answer
        };
        this.props.addNewCard(deckTitle, newCard)

        this.setState(() => ({ question: '', answer: '' }))
        this.props.navigation.goBack();
    }

    render() {
        const { deckTitle } = this.props

        return (
            <CenterView>
                <NewCardLabel>Question</NewCardLabel>
                <NewDeckCardView style={{height: 60, fontSize: 15}} multiline={true} numberOfLines={3} onChangeText={(text) => this.setState({ question: text })} />
                <NewCardLabel>Answer</NewCardLabel>
                <NewDeckCardView style={{height: 60, fontSize: 15}} multiline={true} numberOfLines={3} onChangeText={(text) => this.setState({ answer: text })} />
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
        addNewCard: (deckName, card) => dispatch(addNewCard(deckName, card))
    }
}

function mapStateToProps(state, { navigation }) {
    const { deckTitle } = navigation.state.params

    return {
        deckTitle
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)