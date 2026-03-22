const searchResultsContainer = document.getElementById("search-results");
const btn = document.getElementById("submit");
btn.addEventListener("click", (event) => {
  event.preventDefault();

  const result = document.getElementById("text").value;

  fetch(`/api/search?q=${result}`)
    .then((response) => response.json())
    .then((data) => {
      searchResultsContainer.innerHTML = "";
      data.data.forEach((element) => {
        const card = document.createElement("div");

        const img = document.createElement("img");
        img.src = element.images.jpg.image_url;

        const p = document.createElement("p");
        p.textContent = element.title;

        const score = document.createElement("p");
        score.textContent = element.score;

        card.appendChild(img);
        card.appendChild(p);
        card.appendChild(score);

        searchResultsContainer.appendChild(card);
      });
    });
});
