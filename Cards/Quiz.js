import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity, Animated } from 'react-native'
import { fetchAllDecks } from '../Decks/decksAction'
import {
    CenterView, NewCardLabel,
    DeckHeadingLabel, CardView, QuestionLabel,
    AnswerLabel, AppButton, AppButtonLabel, QuizScoreButton
} from '../utils/appStyles'

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params
        return {
            title: `Quiz`
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
                        <DeckHeadingLabel>Quiz Complete</DeckHeadingLabel>
                        <NewCardLabel>{`You got ${this.state.scoreCorrect} of ${this.state.noOfQuestions} questions correct`}</NewCardLabel>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                            <QuizScoreButton style={{ marginRight: 0 }} onPress={() => this.restartQuiz()}>
                                <AppButtonLabel>Start Again</AppButtonLabel>
                            </QuizScoreButton>
                            <QuizScoreButton onPress={() => this.goToDeck()}>
                                <AppButtonLabel>Go to deck</AppButtonLabel>
                            </QuizScoreButton>
                        </View>
                    </View>
                )}
                {!this.state.scoreView && (
                    <View>
                        <NewCardLabel>{`${this.state.quizQuestionIndex + 1} of ${this.state.noOfQuestions}`}</NewCardLabel>
                        <CardView>
                            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                                <QuestionLabel>{question}</QuestionLabel>
                            </Animated.View>
                            <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                                <AnswerLabel>{answer}</AnswerLabel>
                            </Animated.View>
                        </CardView>
                        <AppButton onPress={() => this.toggleQuestionAnswer()}>
                            {this.state.isQuestion && (
                                <AppButtonLabel>Show Answer</AppButtonLabel>
                            )}
                            {!this.state.isQuestion && (
                                <AppButtonLabel>Show Question</AppButtonLabel>
                            )}
                        </AppButton>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <QuizScoreButton onPress={() => this.scoreQuestion(true)}>
                                <AppButtonLabel>Correct</AppButtonLabel>
                            </QuizScoreButton>
                            <QuizScoreButton onPress={() => this.scoreQuestion(false)}>
                                <AppButtonLabel>Incorrect</AppButtonLabel>
                            </QuizScoreButton>
                        </View>
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