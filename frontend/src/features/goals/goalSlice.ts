import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import goalService, { GoalData } from './goalService';
import { RootState } from '../../app/store';

export interface Goal {
  _id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

interface GoalState {
  goals: Goal[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

const initialState: GoalState = {
  goals: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Create new goal
export const createGoal = createAsyncThunk<
  Goal,
  GoalData,
  { state: RootState; rejectValue: string }
>('goals/create', async (goalData: GoalData, thunkApi) => {
  try {
    const token = thunkApi.getState().auth?.user?.token ?? '';
    return await goalService.createGoal(goalData, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error;
    return thunkApi.rejectWithValue(message);
  }
});

// Get user goals
export const getGoals = createAsyncThunk<
  Goal[],
  undefined,
  { state: RootState; rejectValue: string }
>('goals/getAll', async (_: undefined, thunkApi) => {
  try {
    const token = thunkApi.getState().auth?.user?.token ?? '';
    return await goalService.getGoals(token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error;
    return thunkApi.rejectWithValue(message);
  }
});

// Delete a goal
export const deleteGoal = createAsyncThunk<
  { id: string },
  string,
  { state: RootState; rejectValue: string }
>('goals/delete', async (goalId: string, thunkApi) => {
  try {
    const token = thunkApi.getState().auth?.user?.token ?? '';
    return await goalService.deleteGoal(goalId, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error;
    return thunkApi.rejectWithValue(message);
  }
});

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ?? 'An error occurred';
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ?? 'An error occurred';
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ?? 'An error occurred';
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
