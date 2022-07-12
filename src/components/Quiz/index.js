import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { 
  Stack,
  Typography,
  Paper,
  Tooltip,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Grid,
  Button,
  Box,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'

import he from 'he'

import { IoArrowBackCircleSharp, IoArrowForwardCircleSharp, IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import { GrPowerReset } from 'react-icons/gr'
import { BiHide, BiShow } from 'react-icons/bi'

const answerColors = {
  correct: 'green',
  incorrect: 'red'
}

const Quiz = ({quizData, endQuiz, resetQuiz}) => {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [singleCorrectAnswer, setSingleCorrectAnswer] = useState(true)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userSlectedAns, setUserSlectedAns] = useState([])
  const [questions, setQuestions] = useState(quizData.questions)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [finishTest, setFinishTest] = React.useState(false)

  const handleOpenDialog = () => {
    setFinishTest(false)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  useEffect(() => {
    let numberOfCorrectAnswers = 0
    for (let option of questions[questionIndex].options) {
      if(option['correct']) {
          numberOfCorrectAnswers = numberOfCorrectAnswers + 1
      }
    }
    if(numberOfCorrectAnswers === 1) {
      setSingleCorrectAnswer(true)
    }
    else if (numberOfCorrectAnswers > 1) {
      setSingleCorrectAnswer(false)
    }
    if(userSlectedAns.length === 0) {
      setUserSlectedAns(questions[questionIndex].options)
    }
  }, [userSlectedAns.length, questions, questionIndex])

  const handleChange = (event) => {
    const newState = userSlectedAns.map(obj => {
      if (event.target.type === 'radio') {
        return {...obj, user_answer: (obj.id === event.target.value)}
      }
      else {
        if (obj.id === event.target.value) {
          return {...obj, user_answer: !obj.user_answer};
        }
        return obj;
      }
    });
    setUserSlectedAns(newState)
  }

  const handlePrevious = () => {
    if(questionIndex !== 0) {
      // Save state
      questions[questionIndex].options = userSlectedAns
      setQuestions(questions)
      setQuestionIndex(questionIndex - 1)
      setUserSlectedAns([])
      setShowAnswer(false)
    }
  }

  const handleNext = () => {
    questions[questionIndex].options = userSlectedAns
    setQuestions(questions)
    if (questionIndex !== questions.length - 1) {
      // Save state
      setQuestionIndex(questionIndex + 1)
      setUserSlectedAns([])
      setShowAnswer(false)
    }
    else {
      setFinishTest(true)
      setOpenDialog(true)
    }
  }

  const checkAnswer = () => {
    for(const option of userSlectedAns) {
      if(option['correct'] !== option['user_answer']) {
        return false
      }
    }
    return true
  }

  const renderRadioGroup = () => {
    return (
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          onChange={handleChange}
        >
          { 
            userSlectedAns.map((option, i) => {
              const decodedOption = he.decode(option.text)
              return (
                <Box sx={{ borderRadius:2, margin: 0.1, border: showAnswer? option.correct ? 3:option.user_answer ? 3:0:0, borderColor: showAnswer ? option.correct ? answerColors['correct']: option.user_answer ? answerColors['incorrect'] : '' : '' }}>
                    <FormControlLabel value={option.id} control={<Radio checked={option.user_answer}/>} label={decodedOption} />
                </Box>                
              );
            })
          }
        </RadioGroup>
      </FormControl>
    )
  }

  const renderCheckbox = () => {
    return (
      <FormControl>
      { 
        userSlectedAns.map((option, i) => {
          const decodedOption = he.decode(option.text)
          return (
            <Box sx={{ borderRadius:2, margin: 0.1, border: showAnswer? option.correct ? 3:option.user_answer ? 3:0:0, borderColor: showAnswer ? option.correct ? answerColors['correct']: option.user_answer ? answerColors['incorrect'] : '' : '' }}>
              <FormControlLabel value={option.id} control={<Checkbox onChange={handleChange} checked={option.user_answer} />} label={decodedOption} />
            </Box>                 
          );
        })
      }
      </FormControl>
    )
  }

  const endQuizAppendData = () => {
    quizData.questions = questions
    return endQuiz(quizData);
  }
  return (
    <>
      <Paper 
        sx={{margin:4, padding:5}}
        elevation={4}>
        <Stack spacing={3}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            >
            <Typography variant="h5" component="div">
              {`Question ${questionIndex + 1} (of ${questions.length})`}
            </Typography>
            <Tooltip title="Reset Quiz">
              <span style={{cursor: 'pointer'}}><GrPowerReset onClick={handleOpenDialog} size="40"/></span> 
            </Tooltip>
          </Grid>
          <Paper sx={{ padding:2, backgroundColor:'#f5f5f5'}} elevation={0}>
              {`${he.decode(questions[questionIndex].question)}`}
          </Paper>
          <Box>
              { singleCorrectAnswer? renderRadioGroup(): renderCheckbox() }
          </Box>
          <Divider />
          { 
            showAnswer && 
            <Paper sx={{ padding:3, backgroundColor:'#f5f5f5'}} elevation={1}>
              { 
                checkAnswer() ? 
                <Box sx={{color: answerColors['correct'], fontWeight: '600'}} component="div"> [ Correct ] </Box> :
                <Box sx={{color: answerColors['incorrect'], fontWeight: '600'}} component="div"> [ Incorrect ] </Box> 
              }
              <br />
              {
              <div dangerouslySetInnerHTML={{ __html: (he.decode(questions[questionIndex].explanation)).replace('href=', 'target="_blank" href=') }}></div>
              } 
            </Paper>
          }
          <Box>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              >
              { 
                !showAnswer ? 
                <Tooltip title="Show Answer">
                  <span style={{cursor: 'pointer'}}><BiShow onClick={()=> setShowAnswer(!showAnswer)} size="50" color="purple" /></span>
                </Tooltip> :
                <Tooltip title="Hide Answer">
                  <span style={{cursor: 'pointer'}}><BiHide onClick={()=> setShowAnswer(!showAnswer)} size="50" color="purple" /></span>
                </Tooltip> 
              }
              <Box sx={{cursor: 'pointer'}}>
                { 
                  questionIndex!== 0 && 
                  <Tooltip title="Previous">
                    <span><IoArrowBackCircleSharp onClick={handlePrevious} size="50" color="purple" /></span>
                  </Tooltip>
                }
                { 
                  questionIndex === questions.length - 1 ? 
                  <Tooltip title="Finish Test">
                    <span><IoCheckmarkDoneCircleSharp onClick={handleNext} size="50" color="purple"/></span>
                  </Tooltip>:
                  <Tooltip title="Next">
                    <span><IoArrowForwardCircleSharp onClick={handleNext} size="50" color="purple"/></span> 
                  </Tooltip>
                }
              </Box>
            </Grid>
          </Box>
        </Stack>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">
            { finishTest ? 'Finish Quiz': 'Reset Quiz' }
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to { finishTest ? 'finish and submit': 'reset' } the quiz?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={finishTest ? endQuizAppendData : resetQuiz}>
            { finishTest ? 'Submit': 'Reset' }
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  )
}

Quiz.propTypes = {
    quizData: PropTypes.object.isRequired,
    endQuiz: PropTypes.func.isRequired,
    resetQuiz: PropTypes.func.isRequired
}

export default Quiz