import callApi from "../../util/apiCaller";

const GET_GAMES = "GET_GAMES";
export function getGames(games) {
  return {
    type: GET_GAMES,
    games
  };
}

export function getGamesRequest(query) {
  return dispatch => {
    return callApi("posts", "get", {
      get: {
        searchQuery: query
      }
    }).then(res => {
      dispatch(getGames(res.games));
    });
  };
}
