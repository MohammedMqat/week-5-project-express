const container = document.getElementById("container");
fetch(`https://api.jikan.moe/v4/top/anime?limit=10`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.data);
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

      container.appendChild(card);
    });
  });
