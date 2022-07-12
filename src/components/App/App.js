import React, { useState } from 'react'
import { 
  Container
} from '@mui/material'

import QuizJSON from '../../data/quiz.json'
import QuizInfo from '../QuizInfo'
import Quiz from '../Quiz'
import QuizResult from '../QuizResult'

const App = () => {
  const [quizData, setQuizData] = useState(QuizJSON)
  const [isQuizStarted, setIsQuizStarted] = useState(false)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [quizResult, setQuizResult] = useState(null)

  const prepareQuizData = data => {
    data.questions.forEach(question => {
      question.options.forEach(option => {
        option['user_answer'] = false
      })
    })
    return data
  }

  const startQuiz = () => {
    setQuizData(prepareQuizData(quizData))
    setIsQuizStarted(true)
  }

  const endQuiz = quizData => {
    setQuizResult(quizData)
    setIsQuizStarted(false)
    setIsQuizCompleted(true)
  }

  const resetQuiz = () => {
    setIsQuizStarted(false)
    setIsQuizCompleted(false)
    setQuizData(QuizJSON)
  }

  return (
    <Container>
      { !isQuizStarted && !isQuizCompleted && <QuizInfo quizData={quizData} startQuiz={startQuiz} /> }
      { isQuizStarted && <Quiz quizData={quizData} endQuiz={endQuiz} resetQuiz={resetQuiz} /> }
      { isQuizCompleted && <QuizResult quizData={quizResult} resetQuiz={resetQuiz} /> }
    </Container>
  )
}

export default App