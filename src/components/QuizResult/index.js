import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { 
  Stack,
  Typography,
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Box,
  Divider,
  Grid,
  Tooltip
} from '@mui/material'

import he from 'he'

import { IoExitOutline } from 'react-icons/io5'

const answerColors = {
  correct: 'green',
  incorrect: 'red'
}

const QuizResult = ({quizData, resetQuiz}) => {
  const [correctAnswers, setCorrectAnswers] = useState(0)

  const checkRadioCheckbox = options => {
    let numberOfCorrectAnswers = 0
    for (let option of options) {
      if(option['correct'])
      {
        numberOfCorrectAnswers = numberOfCorrectAnswers + 1
      }
    }
    if(numberOfCorrectAnswers === 1) {
      return true
    } 
    return false
  }

  useEffect(() => { 
    let numberOfCorrectAnswers = 0
    quizData.questions.forEach(question => {
      if(checkAnswer(question.options)) {
        numberOfCorrectAnswers = numberOfCorrectAnswers + 1
      }
    })
    setCorrectAnswers(numberOfCorrectAnswers)
  }, [quizData.questions])

  const checkAnswer = options => {
    for (let option of options) {
      if(option['correct'] !== option['user_answer'])
        return false
    }
    return true
  }

  const renderRadioGroup = options => {
    return (
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
        >
          { 
            options.map((option, i) => {
              const decodedOption = he.decode(option.text)
              return (
                <Box sx={{ borderRadius:2, margin: 0.1, border: option.correct ? 3:option.user_answer ? 3:0, borderColor: option.correct ? answerColors['correct']: option.user_answer ? answerColors['incorrect'] : ''  }}>
                    <FormControlLabel value={option.id} control={<Radio checked={option.user_answer}/>} label={decodedOption} disabled={true}/>
                </Box>                
              );
            })
          }
        </RadioGroup>
      </FormControl>
    )
  }

  const renderCheckbox = options => {
    return (
      <FormControl>
      { 
        options.map((option, i) => {
          const decodedOption = he.decode(option.text)
          return (
            <Box sx={{ borderRadius:2, margin: 0.1, border: option.correct ? 3:option.user_answer ? 3:0, borderColor: option.correct ? answerColors['correct']: option.user_answer ? answerColors['incorrect'] : ''  }}>
              <FormControlLabel value={option.id} control={<Checkbox checked={option.user_answer} />} label={decodedOption} disabled={true} />
            </Box>                 
          )
        })
      }
      </FormControl>
    )
  }

  return (
    <>
      <Paper 
        sx={{margin:4, padding:5}}
        elevation={4}>
        <Paper sx={{ padding:2, backgroundColor:'#f5f5f5'}} elevation={1}>
          <Stack spacing={2}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              >
              <Typography sx={{textAlign:'center'}} variant="h5" component="div" color='purple'>
                {quizData.quiz_name} Result Summary
              </Typography>
              <Tooltip title="Exit">
                <span style={{cursor: 'pointer'}}><IoExitOutline onClick={resetQuiz} size="40" color='purple'/></span> 
              </Tooltip>
            </Grid>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <Box sx={{fontWeight:'300', textAlign:'center'}}>
                    Total Number of Questions
                  </Box>
                  <Box sx={{fontWeight:'600', textAlign:'center'}} color='purple'>{String(quizData.questions.length)}</Box>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <Box sx={{fontWeight:'300', textAlign:'center'}}>
                    Correct Answers
                  </Box>
                  <Box sx={{fontWeight:'600', textAlign:'center'}} color='purple'>{String(correctAnswers)}</Box>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <Box sx={{fontWeight:'300', textAlign:'center'}}>
                    Percentage
                  </Box>
                  <Box sx={{fontWeight:'600', textAlign:'center'}} color='purple'>{String((correctAnswers*100.0/quizData.questions.length).toFixed(2))}</Box>
                </Stack>
              </Grid>
            </Grid>
            <br/>
          </Stack>
        </Paper>
        <br/><br/>
        { 
          quizData.questions.map((question, questionIndex) => {
            return (
            <Stack spacing={3}>
                <Typography variant="h6" component="div">
                  {`Question ${questionIndex + 1} (of ${quizData.questions.length})`}
                </Typography>
                <Paper sx={{ padding:2, backgroundColor:'#f5f5f5'}} elevation={0}>
                  {`${he.decode(question.question)}`}
                </Paper>
                <Box>
                  { checkRadioCheckbox(question.options) ? renderRadioGroup(question.options): renderCheckbox(question.options) }
                </Box>
                <Paper sx={{ padding:3, backgroundColor:'#f5f5f5'}} elevation={0}>
                  { 
                    checkAnswer(question.options) ? 
                    <Box sx={{color: answerColors['correct'], fontWeight: '600'}} component="div"> [ Correct ] </Box> :
                    <Box sx={{color: answerColors['incorrect'], fontWeight: '600'}} component="div"> [ Incorrect ] </Box> 
                  }
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: (he.decode(question.explanation)).replace('href=', 'target="_blank" href=') }}></div>
                </Paper>
                <br/><Divider /><br/><br/>
            </Stack>
          )})
        }
      </Paper>
    </>
  );
};

QuizResult.propTypes = {
    quizData: PropTypes.object.isRequired,
    resetQuiz: PropTypes.func.isRequired
};

export default QuizResult