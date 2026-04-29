import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('user');

const authSlice = createSlice({
  name: 'auth',
  initialState : {
    user: storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null
  },
  reducers: {
    setCredentials: (state, action) => {
  const user = action.payload.user;
  const token = action.payload.token;
  const userId = action.payload.userId; // 🔥 FIX

  state.user = user;
  state.token = token;
  state.userId = userId;

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('userId', userId); // 🔥 correct value
},

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;