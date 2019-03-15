import apicalypse from "apicalypse";
const userKey = "ac52edd19940c4d53e874b5f1580bde5";

export function findGames(req, res) {
  apicalypse({
    method: "get", // The default is `get`
    baseURL: "https://api-v3.igdb.com",
    headers: {
      Accept: "application/json",
      "user-key": userKey
    },
    responseType: "json",
    timeout: 10000
  })
    .fields("name")
    .search(req.body.searchQuery)
    .request("/games/")
    .then(response => {
      console.log(response);
      return res.json({ games: response.data });
    })
    .catch(err => console.log(err));
}
