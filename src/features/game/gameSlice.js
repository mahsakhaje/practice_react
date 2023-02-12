import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchQuestions = createAsyncThunk("fetchdata", async ({ number }, { rejectWithValue }) => {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple");
    const data = await response.json();

    return data.results;
  } catch (error) {
    return rejectWithValue("Error");
  }
});

// status: "idle" | "loading" | "success" | "error"
const initialState = {
  status: "idle",
  qList: [],
  error: null,
};
const gameSlice = createSlice({
  name: "game",
  initialState,
  extraReducers: {
    [fetchQuestions.fulfilled]: (state, action) => {
      state.status = "success";
      state.qList = action.payload;
    },
    [fetchQuestions.pending]: (state) => {
      state.status = "loading";
    },
    [fetchQuestions.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload;
      state.qList = [];
    },
  },
});

export const selectQuestions = (s) => s.game.qList;
export const selectTotalQuestions = (s) => s.game.qList.length;

export default gameSlice.reducer;
