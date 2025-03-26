const API_KEY = '6d1bac3b'; // Твой API-ключ OMDb
const API_URL = 'https://www.omdbapi.com/';

async function searchMovie() {
  const query = document.getElementById('searchInput').value;
  if (!query) {
    alert('Введите название фильма!');
    return;
  }

  const url = `${API_URL}?t=${encodeURIComponent(query)}&apikey=${API_KEY}&plot=short`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      displayResults([]);
    } else {
      displayResults([data]); // Превращаем объект в массив для универсального кода
    }
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
}

function displayResults(movies) {
  const results = document.getElementById('results');
  results.innerHTML = '';

  if (movies.length === 0) {
    results.innerHTML = '<p>Фильмы не найдены</p>';
    return;
  }

  movies.forEach(movie => {
    const posterUrl = movie.Poster !== "N/A" 
      ? movie.Poster 
      : 'https://via.placeholder.com/200x300?text=No+Image';

    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');
    movieDiv.innerHTML = `
      <img src="${posterUrl}" alt="${movie.Title}" />
      <h3>${movie.Title} (${movie.Year})</h3>
      <p>Рейтинг: ${movie.imdbRating}</p>
      <p>Дата выхода: ${movie.Released}</p>
      <p>${movie.Plot}</p>
    `;
    results.appendChild(movieDiv);
  });
}
