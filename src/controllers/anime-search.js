export const searchAnime = (req, res) => {
  const { q } = req.query;
  fetch(`https://api.jikan.moe/v4/anime?q=${q}`)
    .then((response) => response.json())
    .then((data) => res.json(data));
};
