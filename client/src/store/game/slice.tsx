import { createSlice } from "@reduxjs/toolkit";
import { Game, Guide } from "../../../../types/gameTypes";

const initialState: Game = {
  id: "GENERATE_ID",
  name: "?????",
  guide: null,
  travellers: null,
  places: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    createGuide: (state, action) => {
      const guide: Guide = action.payload;
      console.log(guide);
      state.guide = guide;
    },
  },
});

export const { createGuide } = gameSlice.actions;

export default gameSlice.reducer;
