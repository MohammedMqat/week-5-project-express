const searchParams = new URLSearchParams(location.search);
let currentPage = searchParams.get("page") || 1;
let searchQuery = searchParams.get("q");
const searchResultsContainer = document.getElementById("search-results");
const previous = document.createElement("button");
previous.textContent = "previous";
const next = document.createElement("button");
next.textContent = "next";

next.addEventListener("click", () => {
  currentPage = currentPage + 1;
  fetchAnime(searchQuery, currentPage).then(renderAnime);
  history.pushState(null, "", `/search?q=${searchQuery}&page=${currentPage}`);
});
previous.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage = currentPage - 1;
    fetchAnime(searchQuery, currentPage).then(renderAnime);
    history.pushState(null, "", `/search?q=${searchQuery}&page=${currentPage}`);
  }
});
function fetchAnime(query, page = 1) {
  return fetch(`/api/search?q=${encodeURIComponent(query)}&page=${page}`).then((response) =>
    response.json(),
  );
}
function renderAnime(data) {
  searchResultsContainer.innerHTML = "";

  data.data.forEach((element) => {
    const card = document.createElement("div");
    card.className = "card";
    const img = document.createElement("img");
    img.src = element.images.jpg.image_url;

    card.addEventListener("click", () => {
      window.location.href = `/anime/${element.mal_id}`;
    });

    const p = document.createElement("p");
    p.textContent = element.title;

    const score = document.createElement("p");
    score.textContent = element.score;

    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(score);

    searchResultsContainer.appendChild(card);
  });
  searchResultsContainer.appendChild(previous);
  searchResultsContainer.appendChild(next);
}
if (searchQuery) {
  fetchAnime(searchQuery, currentPage).then(renderAnime);
}
