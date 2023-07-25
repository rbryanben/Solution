import { configureStore } from '@reduxjs/toolkit'
import employersSlice from './employersSlice'
import directorySlice from './directorySlice'

export default configureStore({
  reducer: {
    employers: employersSlice,
    directory: directorySlice
  },
})
