import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tickets: []
};
const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        addTicket: (state, action) => {
            state.tickets.push(action.payload);
        }
    }
});

export const { addTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
