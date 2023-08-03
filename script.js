const API_KEY = 'f4d55fbf';
const API_URL = 'https://www.omdbapi.com/';
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const favoritesContainer = document.getElementById('favoritesContainer');

// Function to fetch search results from the OMDB API
async function searchMovies(query) {
  const url = `${API_URL}?s=${query}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === "True") {
      return data.Search;
    } else {
      console.log('API Error:', data.Error);
      return [];
    }
  } catch (error) {
    console.log('Fetch Error:', error);
    return [];
  }
}

// Function to display search results
function displayResults(results) {
  searchResults.innerHTML = '';

  results.forEach(result => {
    const movieCard = createMovieCard(result);
    searchResults.appendChild(movieCard);
  });
}

// Function to create a movie card
// Function to create a movie card
function createMovieCard(movie, isFavoriteList) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
  
    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movie.Title;
  
    const moviePoster = document.createElement('img');
    moviePoster.src = movie.Poster;
  
    if (!isFavoriteList) {
      const favoriteButton = document.createElement('button');
      favoriteButton.textContent = 'Add to Favorites';
      favoriteButton.addEventListener('click', () => addToFavorites(movie));
  
      movieCard.appendChild(favoriteButton);
    }
  
    movieCard.appendChild(movieTitle);
    movieCard.appendChild(moviePoster);
  
    return movieCard;
  }
  

// Function to add a movie to favorites
function addToFavorites(movie) {
  const favorites = getFavorites();
  favorites.push(movie);
  saveFavorites(favorites);
}

// Function to remove a movie from favorites
function removeFromFavorites(movie) {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(favMovie => favMovie.imdbID !== movie.imdbID);
  saveFavorites(updatedFavorites);
}

// Function to get favorites from local storage
function getFavorites() {
  const favoritesJSON = localStorage.getItem('favorites');
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}

// Function to save favorites to local storage
function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
  displayFavorites();
}

// Function to display favorite movies
// Function to display favorite movies
function displayFavorites() {
    favoritesContainer.innerHTML = '';
  
    const favorites = getFavorites();
    favorites.forEach(favorite => {
      const movieCard = createMovieCard(favorite, true);
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove from Favorites';
      removeButton.addEventListener('click', () => removeFromFavorites(favorite));
  
      movieCard.appendChild(removeButton);
      favoritesContainer.appendChild(movieCard);
    });
  }
  

// Event listener for search input
searchInput.addEventListener('input', async (event) => {
  const query = event.target.value.trim();

  if (query.length > 2) {
    const results = await searchMovies(query);
    displayResults(results);
  } else {
    searchResults.innerHTML = '';
  }
});

// Display favorite movies on page load
displayFavorites();
