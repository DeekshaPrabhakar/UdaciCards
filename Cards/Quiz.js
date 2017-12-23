import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity, Animated } from 'react-native'
import { fetchAllDecks } from '../Decks/decksAction'
import { AppLoading } from 'expo'
import { bgColor, textColor, inActiveColor, deckBgColor, white } from '../utils/colors'
import styled from 'styled-components/native'

const CenterView = styled.View`
    flex: 1;
    align-items: center;
    background: ${bgColor};
    padding-top: 20px;
`

const CardView = styled.View`
    border: 1px solid ${textColor};
    margin: 20px 40px;
    border-radius: 2px;
    background: ${deckBgColor};
    justify-content: flex-start;
    padding: 10px;
    height: 300px;
`

const CardLabel = styled.Text`
    color: ${textColor};
    font-size: 15px;
    margin: 0px 40px;
`

const QuestionLabel = styled.Text`
    color: ${textColor};
    font-size: 25px;
    margin: 0px 40px;
`

const AnswerLabel = styled.Text`
    color: ${white};
    font-size: 20px;
    margin: 0px 40px;
`

const QuizButton = styled.TouchableOpacity`
    border: 1px solid ${inActiveColor};
    height: 50px;
    margin: 10px 80px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: ${deckBgColor};
`

const QuizButtonLabel = styled.Text`
    color: ${white};
    font-size: 15px;
    margin: 0px 40px;
`

const QuizScoreButton = styled.TouchableOpacity`
    border: 1px solid ${inActiveColor};
    height: 50px;
    background: ${deckBgColor};
    justify-content: center;
    align-items: center;
    margin: 10px 20px;
    border-radius: 2px;
`

const QuizScoreView = styled.View`
    padding: 10px;
`

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params

        return {
            title: `${deckTitle} Quiz`
        }
    }

    state = {
        deck: this.props.deck,
        deckTitle: this.props.deckTitle,
        quizQuestionIndex: 0,
        isQuestion: true,
        question: '',
        answer: '',
        noOfQuestions: 0,
        scoreCorrect: 0,
        scoreView: false
    }
    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
    }

    toggleQuestionAnswer() {
        if (this.value >= 90) {
            this.setState({
                isQuestion: true
            })
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            this.setState({
                isQuestion: false
            })
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }
    }

    scoreQuestion(isCorrect) {
        const { deck } = this.state
        let quizQuestionIndex = this.state.quizQuestionIndex + 1
        let score = this.state.scoreCorrect
        if (isCorrect) {
            score += 1;
        }
        else {
            score -= 1;
        }
        if (quizQuestionIndex < deck.questions.length) {
            let questionObject = deck.questions[quizQuestionIndex]
            const { question, answer } = questionObject

            if (this.value >= 90) { //reset flip
                Animated.spring(this.animatedValue, {
                    toValue: 0,
                    friction: 8,
                    tension: 10
                }).start();
            }
            this.setState({
                question,
                answer,
                quizQuestionIndex,
                isQuestion: true,
                scoreCorrect: score
            })
        }
        else {
            this.setState({
                question: '',
                answer: '',
                quizQuestionIndex: 0,
                isQuestion: true,
                scoreCorrect: score,
                scoreView: true
            })
        }
    }

    restartQuiz() {
        const { deck } = this.state
        if (typeof deck !== undefined && deck.questions !== undefined && deck.questions.length) {
            let questionObject = deck.questions[0]
            const { question, answer } = questionObject
            this.setState({
                question,
                answer,
                quizQuestionIndex: 0,
                isQuestion: true,
                scoreCorrect: 0,
                scoreView: false
            })
        }
    }

    goToDeck() {
        this.setState({
            question: '',
            answer: '',
            quizQuestionIndex: 0,
            isQuestion: true,
            scoreCorrect: 0,
            scoreView: false
        })
        this.props.navigation.goBack();
    }

    componentDidMount() {
        const { deck } = this.state
        if (typeof deck !== undefined && deck.questions !== undefined && deck.questions.length) {
            let questionObject = deck.questions[this.state.quizQuestionIndex]
            const { question, answer } = questionObject
            this.setState({
                question,
                answer,
                noOfQuestions: deck.questions.length
            })
        }
    }

    render() {
        const { deckTitle, deck } = this.state
        const { question, answer } = this.state

        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }

        return (
            <CenterView>
                {this.state.scoreView && (
                    <View>
                        <CardLabel>Quiz Complete</CardLabel>
                        <CardLabel>{`You got ${this.state.scoreCorrect} of ${this.state.noOfQuestions} questions correct`}</CardLabel>
                        <QuizScoreView style={{ flex: 1, flexDirection: 'row' }}>
                            <QuizScoreButton onPress={() => this.restartQuiz()}>
                                <QuizButtonLabel>Start Again</QuizButtonLabel>
                            </QuizScoreButton>
                            <QuizScoreButton onPress={() => this.goToDeck()}>
                                <QuizButtonLabel>Go to deck</QuizButtonLabel>
                            </QuizScoreButton>
                        </QuizScoreView>
                    </View>
                )}
                {!this.state.scoreView && (
                    <View>
                        <CardLabel>{`${this.state.quizQuestionIndex + 1} of ${this.state.noOfQuestions}`}</CardLabel>
                        <CardView>
                            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                                <QuestionLabel>{question}</QuestionLabel>
                            </Animated.View>
                            <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                                <AnswerLabel>{answer}</AnswerLabel>
                            </Animated.View>
                        </CardView>
                        <QuizButton onPress={() => this.toggleQuestionAnswer()}>
                            {this.state.isQuestion && (
                                <QuizButtonLabel>Show Answer</QuizButtonLabel>
                            )}
                            {!this.state.isQuestion && (
                                <QuizButtonLabel>Show Question</QuizButtonLabel>
                            )}
                        </QuizButton>
                        <QuizScoreView style={{ flex: 1, flexDirection: 'row' }}>
                            <QuizScoreButton onPress={() => this.scoreQuestion(true)}>
                                <QuizButtonLabel>Correct</QuizButtonLabel>
                            </QuizScoreButton>
                            <QuizScoreButton onPress={() => this.scoreQuestion(false)}>
                                <QuizButtonLabel>Incorrect</QuizButtonLabel>
                            </QuizScoreButton>
                        </QuizScoreView>
                    </View>
                )}
            </CenterView>
        );
    }
}
const styles = StyleSheet.create({
    flipCard: {
        alignItems: 'center',
        backfaceVisibility: 'hidden',
        justifyContent: 'flex-start'
    },
    flipCardBack: {
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});


function mapStateToProps(state, { navigation }) {
    const { deckTitle } = navigation.state.params
    const decks = state.decksReducer.decks

    return {
        deck: decks[deckTitle],
        deckTitle
    }
}

export default connect(mapStateToProps)(Quiz)