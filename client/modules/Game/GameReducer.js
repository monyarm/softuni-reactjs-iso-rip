import { GET_GAMES } from "./GameActions";

// Initial State
const initialState = { games: [] };

const GameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        games: action.games
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getGames = state => state.games.games;

export default GameReducer;
