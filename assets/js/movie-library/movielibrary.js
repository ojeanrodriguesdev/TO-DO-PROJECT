console.log(
  "Initial movies from localStorage:",
  JSON.parse(localStorage.getItem("movies"))
);

let movies = JSON.parse(localStorage.getItem("movies")) || [];

const movieForm = document.getElementById("movie-form");
const movieList = document.getElementById("movie-list");
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const closeBtn = document.querySelector(".close");
let currentEditIndex;

if (!movieForm) console.warn("Movie form not found in the DOM");
if (!movieList) console.warn("Movie List not found in the DOM");
if (!editModal) console.warn("Edit Modal not found in the DOM");
if (!editForm) console.warn("Edit Form not found in the DOM");
if (!closeBtn) console.warn("Close Button not found in the DOM");

function resizeAndConvertToBase64(file, maxWidth = 300, maxHeight = 300) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

function renderMovies() {
  console.log("Rendering Movies:", movies);
  movieList.innerHTML = "";
  movies.forEach((movie, index) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.setAttribute("data-index", index);
    movieCard.innerHTML = `
      <h3>${movie.title}</h3>
      <img src="${movie.cover}" alt="Movie Cover" style="width: 100px; height: auto;">
      <p>${movie.year}</p>
      <div class="button-container-details">
        <button class="details-button">Show Details</button>
      </div>
    `;
    const detailsButton = movieCard.querySelector(".details-button");
    detailsButton.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMovieDetails(index);
    });
    movieList.appendChild(movieCard);

    if (movies.length === 0) {
      if (editModal) {
        editModal.style.display = "none";
      }
    }
  });
}

if (movieForm) {
  movieForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("Form submitted");

    const title = document.getElementById("movie-title").value;
    const coverFile = document.getElementById("movie-cover").files[0];
    const director = document.getElementById("movie-director").value;
    const year = document.getElementById("movie-year").value;
    const synopsis = document.getElementById("movie-synopsis").value;

    console.log("Form data:", { title, director, year, synopsis });

    if (title && director && year && synopsis) {
      try {
        const cover = await resizeAndConvertToBase64(coverFile);
        const newMovie = { title, director, year, synopsis, cover };
        console.log("Adding new movie: ", newMovie);
        movies.push(newMovie);
        localStorage.setItem("movies", JSON.stringify(movies));
        console.log("Movies after adding:", movies);
        renderMovies();
        movieForm.reset();
      } catch (error) {
        console.error("Error processing image:", error);
        alert("There was an error processing the image. Please try again.");
      }
    } else {
      alert("Please, fill in all fields.");
    }
  });
}

function deleteMovie(index) {
  movies.splice(index, 1);
  localStorage.setItem("movies", JSON.stringify(movies));
  renderMovies();
  const detailsElement = document.getElementById(`movie-details-${index}`);
  if (detailsElement) {
    detailsElement.remove();
  }
}

function openEditModal(index) {
  const movie = movies[index];
  currentEditIndex = index;

  const editTitle = document.getElementById("editTitle");
  const editDirector = document.getElementById("editDirector");
  const editYear = document.getElementById("editYear");
  const editSynopsis = document.getElementById("editSynopsis");

  if (editTitle) editTitle.value = movie.title;
  if (editDirector) editDirector.value = movie.director;
  if (editYear) editYear.value = movie.year;
  if (editSynopsis) editSynopsis.value = movie.synopsis;

  const editModal = document.getElementById("editModal");
  if (editModal) {
    editModal.style.display = "block";
  }
}

function closeEditModal() {
  const editModal = document.getElementById("editModal");
  if (editModal) {
    editModal.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const editModal = document.getElementById("editModal");
  const closeBtn = document.querySelector(".close");

  if (closeBtn) {
    closeBtn.onclick = closeEditModal;
  }

  if (editModal) {
    window.onclick = function (event) {
      if (event.target == editModal) {
        closeEditModal();
      }
    };
  }
});

function editMovie(index) {
  openEditModal(index);
}

function updateMovieCard(index) {
  const movieCard = document.querySelector(
    `.movie-card[data-index="${index}"]`
  );
  if (movieCard) {
    const movie = movies[index];
    movieCard.innerHTML = `
      <h3>${movie.title}</h3>
      <img src="${movie.cover}" alt="Movie Cover" style="width: 100px; height: auto;">
      <p>${movie.year}</p>
      <div class="button-container-details"></div>
      <button class="details-button">Show Details</button>
    `;
    const detailsButton = movieCard.querySelector(".details-button");
    detailsButton.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMovieDetails(index);
    });
  }
}

function toggleMovieDetails(index) {
  const movie = movies[index];
  console.log("Toggling details for movie:", movie);

  let detailsElement = document.getElementById(`movie-details-${index}`);
  const detailsButton = document.querySelector(
    `.movie-card[data-index="${index}"] .details-button`
  );

  if (!detailsElement || detailsElement.style.display === "none") {
    if (detailsElement) {
      detailsElement.remove();
    }
    detailsElement = document.createElement("div");
    detailsElement.id = `movie-details-${index}`;
    detailsElement.className = "movie-details";
    detailsElement.innerHTML = `
        <div class="details-content">
          <div class="details-header">
            <h2>${movie.title}</h2>
            <button class="close-details">X</button>
          </div>
          <img src="${movie.cover}" alt="Movie Cover" class="detail-cover">
          <div class="detail-info">
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Year:</strong> ${movie.year}</p>
            <p><strong>Synopsis:</strong> ${movie.synopsis}</p>
          </div>
          <div class="detail-actions">
            <button onclick="editMovie(${index})" class="edit-btn">Edit</button>
            <button onclick="deleteMovie(${index})" class="delete-btn">Delete</button>
          </div>
        </div>
    `;

    detailsElement.style.display = "flex";
    document.body.appendChild(detailsElement);

    const closeDetailsBtn = detailsElement.querySelector(".close-details");
    if (closeDetailsBtn) {
      closeDetailsBtn.addEventListener("click", () => {
        detailsElement.style.display = "none";
        if (detailsButton) detailsButton.textContent = "Show Details";
      });
    }
    if (detailsButton) detailsButton.textContent = "Hide Details";
  } else {
    detailsElement.style.display = "none";
    if (detailsButton) detailsButton.textContent = "Show Details";
  }
}

if (editForm) {
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const updateMovie = {
      title: document.getElementById("editTitle").value,
      director: document.getElementById("editDirector").value,
      year: document.getElementById("editYear").value,
      synopsis: document.getElementById("editSynopsis").value,
      cover: movies[currentEditIndex].cover,
    };

    movies[currentEditIndex] = updateMovie;
    localStorage.setItem("movies", JSON.stringify(movies));

    updateMovieCard(currentEditIndex);
    updateMovieDetails(currentEditIndex);

    closeEditModal();
  });
}

function updateMovieDetails(index) {
  const detailsElement = document.getElementById(`movie-details-${index}`);
  if (detailsElement) {
    const movie = movies[index];
    detailsElement.innerHTML = `
      <div class="details-content">
        <div class="details-header">
          <h2>${movie.title}</h2>
          <button class="close-details">X</button>
        </div>
        <img src="${movie.cover}" alt="Movie Cover" class="detail-cover">
        <div class="detail-info">
          <p><strong>Director:</strong> ${movie.director}</p>
          <p><strong>Year:</strong> ${movie.year}</p>
          <p><strong>Synopsis:</strong> ${movie.synopsis}</p>
        </div>
        <div class="detail-actions">
          <button onclick="editMovie(${index})" class="edit-btn">Edit</button>
          <button onclick="deleteMovie(${index})" class="delete-btn">Delete</button>
        </div>
      </div>
    `;

    const closeDetailsBtn = detailsElement.querySelector(".close-details");
    if (closeDetailsBtn) {
      closeDetailsBtn.addEventListener("click", () => {
        detailsElement.style.display = "none";
        const detailsButton = document.querySelector(
          `.movie-card[data-index="${index}"] .details-button`
        );
        if (detailsButton) detailsButton.textContent = "Show Details";
      });
    }
  }
}

function clearAllMovies() {
  movies = [];
  localStorage.removeItem("movies");
  renderMovies();
  console.log("All movies cleared.");
}

renderMovies();
