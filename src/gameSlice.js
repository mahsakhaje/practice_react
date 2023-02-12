import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchQuestions = createAsyncThunk('fetchdata',async () => {
  console.log('called');
//   const response = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple',{

//   headers: {
//     "Access-Control-Allow-Origin": "*",
//        "Content-Type": "application/json"
//   },
// },

 // );
 const response =  await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple');

  const data = await response.json();
  console.log(data);
  return data.results;
})
const initialState = {
  qList: [],
  fetchingQuestions: false,
  errorMessage: null
}
const gameSlice=createSlice({
  name:'game',
  initialState,
  extraReducers: {
    [fetchQuestions.fulfilled]: (state, action) => {
      state.qList = action.payload
      state.fetchingQuestions = false
    },
    [fetchQuestions.pending]: state => {
      state.qList = []

      state.fetchingQuestions = true
    },
    [fetchQuestions.rejected]: state => {
      state.qList = []

      state.fetchingQuestions = false
      state.errorMessage = 'Something went wrong...'
    }
  }
})
export default gameSlice.reducer;
