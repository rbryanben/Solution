import { createSlice } from "@reduxjs/toolkit";

export const DirectorySlice = createSlice({
    name: 'directory',
    initialState: {
        employees: [],
        employee_ids: {}
    },
    reducers: {
        addEmployees: (state,payload)=>{
            state.employees = []
            state.employee_ids = []
            
            // Add all elements while priventing duplicates 
            payload.payload.forEach(element => {
                // Duplicate entry 
                if (state.employee_ids[element.id] != null ) return
                state.employees.push(element)
                state.employee_ids[element.id] = element.id
            });
        }
    }
})
export const {addEmployees} = DirectorySlice.actions
export default DirectorySlice.reducer