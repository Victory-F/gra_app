import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "./game/slice";

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});
