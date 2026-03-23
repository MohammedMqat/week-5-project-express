export const animeDetails = (req, res) => {
  const id = req.params.id;

  fetch(`https://api.jikan.moe/v4/anime/${id}`)
    .then((response) => response.json())
    .then((data) => res.json(data));
};
