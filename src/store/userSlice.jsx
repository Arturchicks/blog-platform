import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import axios from "axios"
export const fetchRegister = createAsyncThunk(
  "user/registerUser",
  async (data, { rejectWithValue }) => {
    const { email, password, username } = data
    try {
      const response = await axios.post(
        "https://blog.kata.academy/api/users",
        {
          user: { username, email, password }
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      )

      return response.data
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      return rejectWithValue({
        status: err.response.status,
        statusText: err?.response?.data?.errors
      })
    }
  }
)
export const fetchLoginUser = createAsyncThunk(
  "user/loginUser",
  // eslint-disable-next-line consistent-return
  async (data, { rejectWithValue }) => {
    try {
      const { email, password } = data
      const response = await axios.post(
        "https://blog.kata.academy/api/users/login",
        {
          user: {
            email,
            password
          }
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      return response.data
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      return rejectWithValue({
        status: err.response.status,
        statusText:
          err?.response?.data?.errors?.message || "Логин или пароль не верные"
      })
    }
  }
)
export const fetchUpdateUser = createAsyncThunk(
  "user/updateUser",
  async (data, { rejectWithValue }) => {
    const { username, email, password, url } = data
    const token = sessionStorage.getItem("token")
    try {
      const response = await axios.put(
        "https://blog.kata.academy/api/user",
        {
          user: {
            username,
            email,
            password,
            image: url
          }
        },
        {
          headers: { Authorization: `Token ${token}` }
        }
      )
      return response.data
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      return rejectWithValue({
        status: err.response.status,
        statusText: err?.response?.data?.errors
      })
    }
  }
)
export const fetchGetUser = createAsyncThunk("user/getUser", async (token) => {
  fetch("https://blog.kata.academy/api/user", {
    headers: {
      Authorization: `Token ${token}`
    }
  })
    .then((response) => response.json())
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Error fetching user data:", error)
    })
})
const initialState = {
  username: null,
  email: null,
  password: null,
  token: null,
  id: null,
  logged: false,
  register: false,
  image: null,
  userUpdated: null,
  error: null,
  logStatus: null
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLog(state, action) {
      state.logged = true
      state.username = action.payload.user.username
      state.image = action.payload.user.image
      state.email = action.payload.user.email
    },
    logOut(state) {
      sessionStorage.removeItem("token")
      state.token = null
      state.logged = false
      state.logStatus = "loggedOut"
    },
    setUser(state, action) {
      state.username = action.payload.username
      state.email = action.payload.email
      state.password = action.payload.password
      console.log(action)
    },
    setUserUpdated(state) {
      state.userUpdated = "userUpdated"
    },
    removeUser(state) {
      state.username = null
      state.email = null
      state.password = null
    },
    setErr(state) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.token = action.payload.user.token
        state.username = action.payload.user.username
        state.logged = true
        state.logStatus = "loggedIn"
        state.error = null
        sessionStorage.setItem("token", action.payload.user.token)
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.logged = true
        state.username = action.payload.user.username
        state.email = action.payload.user.email
        state.token = action.payload.user.token
        state.logStatus = "loggedIn"
        state.error = null
        sessionStorage.setItem("token", action.payload.user.token)
      })
      .addCase(fetchUpdateUser.fulfilled, (state) => {
        state.userUpdated = "fulfilled"
        state.error = null
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.userUpdated = "pending"
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.error = action.payload.statusText
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.error = action.payload.statusText
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.error = action.payload.statusText
        state.userUpdated = "rejected"
      })
  }
})
export const { setUser, removeUser, setLog, logOut, setErr, setUserUpdated } =
  userSlice.actions
export default userSlice.reducer
