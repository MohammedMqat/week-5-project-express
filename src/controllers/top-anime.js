export const TopAnime = (req, res) => {
  fetch(`https://api.jikan.moe/v4/top/anime?limit=10`)
    .then((response) => response.json())
    .then((data) => res.json(data));
};
