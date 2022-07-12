# React JS Quiz App Component

[Live Demo](https://girid.github.io/react-quiz-app/)

<br />

## Features

+ Summary/Information page to provide description of the quiz
+ Immediately view answer and explanation for current question
+ Quiz result page with summary and detailed explanation of each answer
+ Quiz data imported from a JSON file

<br />

## Code Breakdown

### `Quiz JSON`

Quiz data is stored in JSON format. A sample quiz object looks like below.

```javascript
{
    "quiz_name": "Planet Quiz",
    "description": "There are eight planets in our solar system. Everyone should have some basic knowledge about the rest of the planets orbiting around the sun with ours. Let's test your knowledge.",
    "questions": 
    [
        {
            "id": 1,
            "question": "Which is the smallest planet within our solar system?",
            "options": [
                {
                    "id": "a",
                    "text": "Mercury",
                    "correct": true
                },
                {
                    "id": "b",
                    "text": "Venus",
                    "correct": false
                },
                {
                    "id": "c",
                    "text": "Jupiter",
                    "correct": false
                },
                {
                    "id": "d",
                    "text": "Mars",
                    "correct": false
                }
            ],
            "explanation": "<strong>Reference:</strong>\n</p>\n<p>\n  <a target=\"_blank\" href=\"https://www.universetoday.com/36649/planets-in-order-of-size/\">Planet Size</a>\n</p>"
        }
        ...
    ]
}

```

Questions array in the quiz object can contain any number of questions. Each question object in questions array contains explanation for the answer and 'options' array with one or more 'correct' options. 

<br />

### `App Component`

App component is the main component which contains the logic to start, end and reset quiz and to display appropriate components (described below) during various stages of the quiz. It imports and processes quiz data from external JSON file.


### `QuizInfo Component`

QuizInfo component displays basic information about the quiz and a button to start the quiz. 

### `Quiz Component`

Quiz component displays questions to the user one at a time. The questions can have single correct answer (radio button used for options) or multiple correct answers (checkbox used for options). The user can choose to view the answer immediately. It also has an option for the user to reset/restart the quiz. 

### `QuizResult Component`

Once user confirms to end the quiz, QuizResult component is displayed. It contains summary (total vs correct answers) and answers with explanation for each question. 