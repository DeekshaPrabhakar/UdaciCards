import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native'
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

const NewCardView = styled.TextInput`
    border: 1px solid ${textColor};
    height: 50px;
    margin: 10px 40px;
    justify-content: center;
    align-items: stretch;
    border-radius: 5px;
    font-size: 24px;
`

const CardLabel = styled.Text`
    color: ${textColor};
    font-size: 15px;
    margin: 0px 40px;
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

class NewCard extends Component {
    state = {
        question:'',
        answer:''
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Card'
        }
    }
    render() {
        const { deckTitle } = this.props
        return (
            <CenterView>
                 <CardLabel>Question</CardLabel>
                 <NewCardView onChangeText={(text) => this.setState({ question: text })}  />
                 <CardLabel>Answer</CardLabel>
                 <NewCardView onChangeText={(text) => this.setState({ answer: text })} />
                <SubmitButton
                    onPress={this.submit}>
                    <SubmitButtonLabel>SUBMIT</SubmitButtonLabel    >
                </SubmitButton>
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

export default connect(mapStateToProps)(NewCard)