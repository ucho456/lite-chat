import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RoomsState = {
  rooms: Room[];
};

const initialState: RoomsState = {
  rooms: [],
};

export const rooms = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<RoomsState["rooms"]>) => {
      state.rooms = action.payload;
    },
  },
});

const { setRooms } = rooms.actions;

export { setRooms };
export default rooms.reducer;
