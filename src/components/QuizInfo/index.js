import React from 'react'
import PropTypes from 'prop-types'

import { 
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  Button
} from '@mui/material'

const QuizInfo = ({quizData, startQuiz}) => {
  return (
    <>
      <Paper 
        sx= {{margin:4, padding:5}}
        elevation={4}>
          <Stack spacing={3}>
            <Typography sx={{textAlign:'center'}} variant="h4" component="div" color='purple'>
              {quizData.quiz_name}
            </Typography>
            <Divider />
            <Stack spacing={1}>
              <Box sx={{fontWeight:'600'}}>
                Description
              </Box>
              <Box>{quizData.description}</Box>
            </Stack>
            <Stack spacing={1}>
              <Box sx={{fontWeight:'600'}}>
                Number of questions
              </Box>
              <Box>{String(quizData.questions.length)}</Box>
            </Stack>
            <Box sx={{alignSelf:'center'}}>
              <Button variant="contained" onClick={startQuiz} color="secondary">
                <Typography variant="button">
                  Start Quiz
                </Typography>
              </Button>   
            </Box>
          </Stack>
      </Paper>
    </>
  )
}

QuizInfo.propTypes = {
    quizData: PropTypes.object.isRequired,
    startQuiz: PropTypes.func.isRequired
}

export default QuizInfo