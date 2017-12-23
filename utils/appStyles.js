import styled from 'styled-components/native'
import { bgColor, textColor, inActiveColor, white, deckBgColor } from '../utils/colors'

export const CenterView = styled.View`
    flex: 1;
    align-items: stretch;
    background: ${bgColor};
    padding-top: 40px;
`

export const DeckView = styled.View`
    border: 1px solid ${inActiveColor};
    height: 60px;
    margin: 20px 40px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: ${deckBgColor};
`

export const DeckHeadingLabel = styled.Text`
    color: ${textColor};
    font-size: 25px;
    margin: 10px 80px;
    justify-content: center;
    align-items: center;
`

export const CardLabel = styled.Text`
    color: ${white};
    font-size: 15px;
    margin: 0px 40px;
`

export const NewCardLabel = styled.Text`
    color: ${textColor};
    font-size: 20px;
    margin: 0px 40px;
`

export const DeckLabel = styled.Text`
    color: ${textColor};
    font-size: 20px;
    font-weight: bold;
    margin: 0px 40px;
`

export const NewDeckLabel = styled.Text`
    color: ${textColor};
    font-size: 60px;
    margin: 0px 40px;
    justify-content: center;
    align-items: center;
`

export const AppButton = styled.TouchableOpacity`
    border: 1px solid ${inActiveColor};
    height: 50px;
    margin: 10px 80px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: ${deckBgColor};
`

export const AppButtonLabel = styled.Text`
    color: ${white};
    font-size: 15px;
    margin: 0px 40px;
`

export const NewDeckCardView = styled.TextInput`
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

export const CardView = styled.View`
    border: 1px solid ${textColor};
    margin: 20px 40px;
    border-radius: 2px;
    background: ${deckBgColor};
    justify-content: flex-start;
    padding: 10px;
    height: 300px;
`

export const QuestionLabel = styled.Text`
    color: ${textColor};
    font-size: 25px;
    margin: 0px 40px;
`

export const AnswerLabel = styled.Text`
    color: ${white};
    font-size: 20px;
    margin: 0px 40px;
`

export const QuizScoreButton = styled.TouchableOpacity`
    border: 1px solid ${inActiveColor};
    height: 50px;
    background: ${deckBgColor};
    justify-content: center;
    align-items: center;
    margin: 10px 20px;
    border-radius: 2px;
`