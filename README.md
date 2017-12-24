# UdaciCards Project

Is a mobile application (iOS) that allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks..

## Walkthrough


## Project Specifications

### Application Setup
- [x] Application easy to install and start.
  - install all project dependencies with `npm install`
  - start the development server with `npm start`
- [x] Application includes README with clear installation and launch instructions


### Tested Platform
- [x] iOS Simulator.

### Application Functionality

#### Deck List view
- [x] The primary view, seen when the app loads, is a list of created decks which includes the name of each deck and the number of cards.
- [x] Pressing on a deck in the list should generate an animation, and the app should route to an individual deck view.

#### Individual Deck view
- [x] The individual deck view includes (at a minimum):
   - The deck title
   - Number of cards in the deck
   - Option to start a quiz for that deck
   - Option to add a new question to the deck.
- [x] Pressing the 'Start a Quiz' or 'Create New Question' button properly routes to the correct views for those activities.

#### The New Question view
- [x] The New Question view includes a form with fields for a question and answer, and a submit button.
- [x] Submitting the form correctly adds the question to the deck.

#### The Quiz view
- [x] The Quiz view starts with a question from the selected deck.
- [x] The question is display, along with a button to show the answer.
- [x] Pressing the 'Show Answer' button displays the answer.
- [x] Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'.
- [x] The view displays the number of questions remaining.
- [x] When the last question is answered, a score is displayed. This can be displayed as a percentage of correct answers or just the number of questions answered correctly.
- [x] When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.
- [x] Both the 'Restart Quiz' and 'Back to Deck' buttons route correctly to their respective views.

#### The New Deck view
- [x] The view includes a form for creating a new deck - which should just be an input for the title and a 'Create Deck' button.
- [x] Pressing the button correctly creates the deck and routes the user to the Individual Deck view for the new deck.
- [x] Logic for push notification has been implemented. Push notifications are generated at a specific time if the user hasn't completed at least one quiz for that day.
- [x] The app works correctly in iOS device(or emulator).


## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Acknowledgements:
<ol>
  <li>
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
  </li>
  <li>
 Flip Card Animation from [here](https://codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native)
  </li>
  <li>
    Themes from <a href="https://color.adobe.com">Adobe.</a>
  </li>
  </ol>
