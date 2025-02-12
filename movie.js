const apiKey = "42d3d1"; // Replace with a secure backend call in production

document.getElementById("searchInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") searchMovies();
});

// Function to fetch and display movies
async function searchMovies() {
    let query = document.getElementById("searchInput").value.trim();
    if (!query) {
        alert("Please enter a movie name!");
        return;
    }

    try {
        let response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
        let data = await response.json();

        if (data.Response === "False") {
            displayMovies([]);
        } else {
            displayMovies(data.Search);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong. Please try again.");
    }
}

// Function to display movie search results
function displayMovies(movies) {
    let movieResults = document.getElementById("movieResults");
    movieResults.innerHTML = "";

    if (!movies.length) {
        movieResults.innerHTML = "<p>No movies found.</p>";
        return;
    }

    movies.forEach(movie => {
        let posterImage = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image";

        let movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="${posterImage}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;
        movieCard.addEventListener("click", () => getMovieDetails(movie.imdbID));
        movieResults.appendChild(movieCard);
    });
}

// Fetch and display movie details
async function getMovieDetails(movieID) {
    try {
        let response = await fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=${apiKey}`);
        let movie = await response.json();

        if (movie.Response === "False") {
            alert("Movie details not found.");
            return;
        }

        showMovieDetails(movie);
    } catch (error) {
        console.error("Error fetching movie details:", error);
        alert("Something went wrong while fetching movie details.");
    }
}

// Function to show movie details
function showMovieDetails(movie) {
    let movieDetails = document.getElementById("movieDetails");
    let movieResults = document.getElementById("movieResults");

    let posterImage = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image";

    movieDetails.innerHTML = `
        <div class="left-section">
            <img src="${posterImage}" alt="${movie.Title}">
        </div>
        <div class="right-section">
            <button class="back-button" onclick="goBack()">⬅ Back</button>
            <h2>${movie.Title}</h2>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">View on IMDb</a>
        </div>
    `;

    movieDetails.style.display = "flex";
    movieResults.style.display = "none";
}

// Function to go back to the search results
function goBack() {
    document.getElementById("movieDetails").style.display = "none";
    document.getElementById("movieResults").style.display = "grid";
}

// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = document.getElementById("themeIcon");

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    themeIcon.src = body.classList.contains("dark-mode") 
        ? "icons8-dark-mode-50.png" 
        : "icons8-light-mode-50.png";

    themeIcon.alt = body.classList.contains("dark-mode") ? "Dark Mode" : "Light Mode";
});
