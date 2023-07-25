import { createSlice } from '@reduxjs/toolkit'

export const employersSlice = createSlice({
  name: 'employers',
  initialState: {
    list: [
        {
            company_name : "CN",
            date_of_reg: "2022/02/21",
            registration_number: "12343"
        },
        {
            company_name : "PPC",
            date_of_reg: "2022/23/21",
            registration_number: "123435"
        }
    ],
  },
  reducers: {
    addEmployer: (state, action) => {
      state.list.push(action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addEmployer } = employersSlice.actions

export default employersSlice.reducer