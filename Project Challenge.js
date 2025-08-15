const API_KEY = '8228aa823bmshe92e8464db7082ap1c3836jsncd014863cbe1';
const BASE_URL = 'https://games-details.p.rapidapi.com';

const gameInfo = document.getElementById('game-info');
const pages = document.getElementById('pagination');

let currentPage = 1;
let totalPages;
let gameId;
async function getGameList() {
  try {
    const response = await fetch(`${BASE_URL}/page/${currentPage}`, {
      crossDomain: true,
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'games-details.p.rapidapi.com',
      },
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { data } = await response.json();
    console.log('hello', data);
    totalPages = data.total_page;
    // gameId = data.pages.id;
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const games = document.querySelector('.games-grid');
async function renderGames() {
  games.innerHTML = "<p class='loading-text'>Loading...</p>";
  const { pages } = await getGameList();
  games.innerHTML = '';
  console.log(pages);
  pages.forEach(({ id, img, name, price }) => {
    console.log('hi', pages);
    gameId = id;
    const list = document.createElement('li');
    list.innerHTML = `  <div class="game-card" id=${id}>
    <img src= ${img} />
    </div>  
    <div class="info">
    <span class="name">${name}</span>
    <span class="price">${price}</span>
    </div> 
    `;
    games.appendChild(list);
    list.addEventListener('click', () => {
      renderGameInfo(id);
    });
  });
}
renderGames();

// Previous + Next button
document.getElementById('next').addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage += 1;
  }
  renderGames();
  gameInfo.innerHTML = '';
});

document.getElementById('previous').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
  }
  renderGames();
  gameInfo.innerHTML = '';
});

// Set current page to the according page number
pages.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    currentPage = Number(e.target.dataset.page); // 3

    if (!isNaN(currentPage)) {
      renderGames();
      renderPageNumbers();
    }
  }
});
//render page numbers
let firstPage = 1;

function renderPageNumbers() {
  pages.innerHTML = '';
  let pageNumbers = [];

  const before = currentPage - 1;
  const after = currentPage + 1;

  if (firstPage < currentPage && currentPage < totalPages - 2) {
    pageNumbers.push(before, currentPage, after, '...', totalPages);
  } else if (currentPage === firstPage) {
    pageNumbers.push(currentPage, after, after + 1, '...', totalPages);
  } else {
    pageNumbers.push(firstPage, '...', before, currentPage, after);
  }
  //render page numbers
  pageNumbers.forEach((page) => {
    const link = document.createElement('a');
    if (page === currentPage) {
      link.style.fontWeight = 'bold';
    }
    if (typeof page === 'number') {
      link.innerHTML = `XP${page} | `;
      link.style.cursor = 'pointer';
      link.dataset.page = page; // important
    } else {
      link.style.pointerEvents = 'none';
      link.innerHTML = page;
    }
    pages.appendChild(link);
    link.style.margin = '0 3px';
  });
}

//Game info
async function getGameInfo(gameId) {
  try {
    const response = await fetch(`${BASE_URL}/gameinfo/single_game/${gameId}`, {
      crossDomain: true,
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'games-details.p.rapidapi.com',
      },
    });
    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { data } = await response.json();
    console.log('info', data);

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
// Render game info
async function renderGameInfo(gameId) {
  console.log('rendering game info for', gameId);
  // delete game list
  games.innerHTML = '';
  gameInfo.innerHTML = '';
  // fetch game info
  const info = await getGameInfo(gameId);
  // Pull values from the info object
  const img = info.media.screenshot[0] || 'error.jpg';
  const name = info.name || 'Unknown';
  const about_game = info.about_game || 'No description available.';
  const release_date = info.release_date || 'N/A';
  // const price = info.pricing.[0] || 'N/A';

  const infoText = document.createElement('div');
  infoText.innerHTML = `
  <div class="game-info">
  <div class="single-name"><strong>Name</strong>: ${name}</div>
  <div class="single-desc"><strong>About Game</strong>: ${about_game}</div>
  <div class="release-date"><strong>Release date</strong>: ${release_date}</div>
  </div>
  <img class="screenshot" src= ${img} /> `;
  gameInfo.appendChild(infoText);
}

document.querySelector('.discover-btn').addEventListener('click', () => {
  renderGames(currentPage);
  gameInfo.innerHTML = '';
});

//Write a function that fetches a user by ID from this endpoint: https://jsonplaceholder.typicode.com/users/{id}
//Call the function with id = 3 and log the user's name.



