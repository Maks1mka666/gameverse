const API_KEY = 'a60b06e6455eec107914b73e816bc4f1'; 
const API_URL = 'https://api.themoviedb.org/3/search/movie';

async function searchMovie() {
  const query = document.getElementById('searchInput').value;
  if (!query) {
    alert('Введите название фильма!');
    return;
  }

  // Простой запрос к API
  const url = `${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=ru-RU&page=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // Логируем полученные данные

    // Если мы получили фильмы, отображаем их
    if (data.results && data.results.length > 0) {
      displayResults(data.results);
    } else {
      console.log('Нет фильмов для данного запроса');
      alert('Фильмы не найдены');
    }
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
}

function displayResults(movies) {
  const results = document.getElementById('results');
  results.innerHTML = ''; // Очищаем текущие результаты

  movies.forEach(movie => {
    const posterUrl = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
      : 'https://via.placeholder.com/200x300?text=No+Image';

    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');
    movieDiv.innerHTML = `
      <img src="${posterUrl}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Рейтинг: ${movie.vote_average}</p>
      <p>${movie.release_date}</p>
    `;
    results.appendChild(movieDiv);
  });
}
