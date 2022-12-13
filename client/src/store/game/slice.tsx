import { createSlice } from "@reduxjs/toolkit";
import { Game, Guide, Place } from "../../../../types/gameTypes";

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
      state.guide = guide;
    },
    addPlace: (state, action) => {
      const place: Place = action.payload;
      state.places
        ? (state.places = [...state.places, place])
        : (state.places = [place]);
    },
  },
});

export const { createGuide, addPlace } = gameSlice.actions;

export default gameSlice.reducer;
