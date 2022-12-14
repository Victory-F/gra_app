import { createSlice } from "@reduxjs/toolkit";
import { Game, Guide, Place } from "../../../../types/gameTypes";

const initialState: Game = {
  id: "GENERATE_ID",
  name: "",
  guide: null,
  travellers: null,
  places: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameId: (state, action) => {
      console.log(action.payload);
      state.id = action.payload;
    },
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
    addGameName: (state, action) => {
      state.name = action.payload;
      console.log(action.payload);
    },
  },
});

export const { createGuide, addPlace, addGameName, setGameId } =
  gameSlice.actions;

export default gameSlice.reducer;
