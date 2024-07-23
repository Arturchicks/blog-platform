import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"
import articlesSlice from "./articlesSlice"
import userSlice from "./userSlice"
const rootReducer = combineReducers({
  article: articlesSlice,
  user: userSlice
})
// eslint-disable-next-line import/prefer-default-export
export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: false
    }).concat(thunk)
})
