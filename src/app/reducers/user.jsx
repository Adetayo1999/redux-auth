import { createSlice } from '@reduxjs/toolkit';
import { getUserProfile } from '../../api/user';

const initialState = {
  loading: false,
  user: {},
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    get(state) {
      state.loading = true;
    },
    success(state, action) {
      state.user = action.payload;
      state.error = '';
      state.loading = false;
    },
    failure(state, action) {
      state.error = action.payload;
      state.user = {};
      state.loading = false;
    }
  }
});

const { get, success, failure } = userSlice.actions;

export const fetchUserDetails = () => (dispatch) => {
  dispatch(get());
  getUserProfile(
    (response) => {
      dispatch(success(response.data));
    },
    (error) => {
      dispatch(failure(error.response));
    }
  );
};

export default userSlice.reducer;
