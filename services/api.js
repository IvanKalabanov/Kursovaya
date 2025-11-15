// services/api.js

// Расширенные моковые данные
const MOCK_GAMES = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    genre: "RPG",
    platform: "PC, PlayStation, Xbox",
    rating: 4.2,
    description: "Приключение в открытом мире в темном будущем мегаполиса Найт-Сити, где вы играете за наемника Ви.",
    releaseDate: "2020-12-10",
    developer: "CD Projekt Red",
    price: 59.99,
    onSale: false,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2rwr.jpg"
  },
  {
    id: 2,
    title: "The Legend of Zelda: Tears of the Kingdom",
    genre: "Adventure",
    platform: "Nintendo Switch",
    rating: 4.8,
    description: "Новое эпическое приключение Линка в королевстве Хайрул с новыми способностями и локациями.",
    releaseDate: "2023-05-12",
    developer: "Nintendo",
    price: 69.99,
    onSale: true,
    salePrice: 59.99,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5xci.jpg"
  },
  {
    id: 3,
    title: "Elden Ring",
    genre: "RPG",
    platform: "PC, PlayStation, Xbox",
    rating: 4.7,
    description: "Фэнтезийная action-RPG от создателей Dark Souls с открытым миром и сложными боями.",
    releaseDate: "2022-02-25",
    developer: "FromSoftware",
    price: 59.99,
    onSale: false,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg"
  },
  {
    id: 4,
    title: "Baldur's Gate 3",
    genre: "RPG",
    platform: "PC, PlayStation, Xbox",
    rating: 4.9,
    description: "Глубокая RPG на основе D&D с богатым сюжетом, сложными решениями и тактическими боями.",
    releaseDate: "2023-08-03",
    developer: "Larian Studios",
    price: 59.99,
    onSale: true,
    salePrice: 49.99,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4nu0.jpg"
  },
  {
    id: 5,
    title: "Call of Duty: Modern Warfare III",
    genre: "Action",
    platform: "PC, PlayStation, Xbox",
    rating: 3.8,
    description: "Новая часть культового шутера с кампанией, мультиплеером и зомби-режимом.",
    releaseDate: "2023-11-10",
    developer: "Sledgehammer Games",
    price: 69.99,
    onSale: false,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6c4w.jpg"
  },
  {
    id: 6,
    title: "Marvel's Spider-Man 2",
    genre: "Action",
    platform: "PlayStation 5",
    rating: 4.5,
    description: "Приключения Питера Паркера и Майлза Моралеса в Нью-Йорке с новыми врагами и способностями.",
    releaseDate: "2023-10-20",
    developer: "Insomniac Games",
    price: 69.99,
    onSale: true,
    salePrice: 59.99,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5x8l.jpg"
  },
  {
    id: 7,
    title: "Starfield",
    genre: "RPG",
    platform: "PC, Xbox",
    rating: 4.0,
    description: "Эпическая космическая RPG от создателей Skyrim с исследованием планет и космическими боями.",
    releaseDate: "2023-09-06",
    developer: "Bethesda Game Studios",
    price: 69.99,
    onSale: false,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4s0w.jpg"
  },
  {
    id: 8,
    title: "Super Mario Bros. Wonder",
    genre: "Platformer",
    platform: "Nintendo Switch",
    rating: 4.6,
    description: "Новое приключение Марио и друзей в Цветочном королевстве с удивительными превращениями.",
    releaseDate: "2023-10-20",
    developer: "Nintendo",
    price: 59.99,
    onSale: true,
    salePrice: 49.99,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6hx5.jpg"
  },
  {
    id: 9,
    title: "Resident Evil 4 Remake",
    genre: "Horror",
    platform: "PC, PlayStation, Xbox",
    rating: 4.4,
    description: "Ремастер классического хоррора с улучшенной графикой и геймплеем.",
    releaseDate: "2023-03-24",
    developer: "Capcom",
    price: 59.99,
    onSale: true,
    salePrice: 39.99,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co69r1.jpg"
  },
  {
    id: 10,
    title: "Forza Horizon 5",
    genre: "Racing",
    platform: "PC, Xbox",
    rating: 4.3,
    description: "Гоночная аркада в открытом мире Мексики с сотнями автомобилей и разнообразными событиями.",
    releaseDate: "2021-11-09",
    developer: "Playground Games",
    price: 59.99,
    onSale: false,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3uhd.jpg"
  },
  {
    id: 11,
    title: "FIFA 23",
    genre: "Sports",
    platform: "PC, PlayStation, Xbox",
    rating: 3.9,
    description: "Последняя часть знаменитой футбольной серии с улучшенной графикой и геймплеем.",
    releaseDate: "2022-09-30",
    developer: "EA Sports",
    price: 49.99,
    onSale: true,
    salePrice: 29.99,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5hx6.jpg"
  },
  {
    id: 12,
    title: "Minecraft",
    genre: "Sandbox",
    platform: "PC, PlayStation, Xbox, Nintendo Switch, Mobile",
    rating: 4.5,
    description: "Культовая песочница с бесконечными возможностями для творчества и выживания.",
    releaseDate: "2011-11-18",
    developer: "Mojang Studios",
    price: 26.95,
    onSale: false,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2cua.jpg"
  },
  {
    id: 13,
    title: "God of War Ragnarök",
    genre: "Action",
    platform: "PlayStation",
    rating: 4.6,
    description: "Продолжение эпического путешествия Кратоса и Атрея по скандинавской мифологии.",
    releaseDate: "2022-11-09",
    developer: "Santa Monica Studio",
    price: 69.99,
    onSale: true,
    salePrice: 49.99,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5tq6.jpg"
  },
  {
    id: 14,
    title: "The Witcher 3: Wild Hunt",
    genre: "RPG",
    platform: "PC, PlayStation, Xbox, Nintendo Switch",
    rating: 4.8,
    description: "Эпическая RPG о ведьмаке Геральте из Ривии в мире, основанном на славянской мифологии.",
    releaseDate: "2015-05-19",
    developer: "CD Projekt Red",
    price: 39.99,
    onSale: true,
    salePrice: 19.99,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg"
  },
  {
    id: 15,
    title: "Red Dead Redemption 2",
    genre: "Action",
    platform: "PC, PlayStation, Xbox",
    rating: 4.7,
    description: "Эпическая история о банде Ван дер Линде на Диком Западе в 1899 году.",
    releaseDate: "2018-10-26",
    developer: "Rockstar Games",
    price: 59.99,
    onSale: false,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2p2d.jpg"
  },
  {
    id: 16,
    title: "Counter-Strike 2",
    genre: "Shooter",
    platform: "PC",
    rating: 4.1,
    description: "Командный тактический шутер с обновленной графикой и улучшенным геймплеем.",
    releaseDate: "2023-09-27",
    developer: "Valve",
    price: 0,
    onSale: false,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6cxe.jpg"
  },
  {
    id: 17,
    title: "Hogwarts Legacy",
    genre: "RPG",
    platform: "PC, PlayStation, Xbox, Nintendo Switch",
    rating: 4.2,
    description: "Приключение в мире Гарри Поттера, где вы играете за студента Хогвартса в 1800-х годах.",
    releaseDate: "2023-02-10",
    developer: "Avalanche Software",
    price: 59.99,
    onSale: true,
    salePrice: 44.99,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5ix3.jpg"
  },
  {
    id: 18,
    title: "Animal Crossing: New Horizons",
    genre: "Simulation",
    platform: "Nintendo Switch",
    rating: 4.4,
    description: "Расслабляющая симуляция жизни на необитаемом острове с милыми животными-соседями.",
    releaseDate: "2020-03-20",
    developer: "Nintendo",
    price: 59.99,
    onSale: false,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rxy.jpg"
  },
  {
    id: 19,
    title: "Grand Theft Auto V",
    genre: "Action",
    platform: "PC, PlayStation, Xbox",
    rating: 4.3,
    description: "Приключения трех преступников в городе Лос-Сантос, основанном на Лос-Анджелесе.",
    releaseDate: "2013-09-17",
    developer: "Rockstar Games",
    price: 29.99,
    onSale: true,
    salePrice: 14.99,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2r8y.jpg"
  },
  {
    id: 20,
    title: "Overwatch 2",
    genre: "Shooter",
    platform: "PC, PlayStation, Xbox, Nintendo Switch",
    rating: 3.7,
    description: "Командный шутер с уникальными героями, способностями и динамичными сражениями.",
    releaseDate: "2022-10-04",
    developer: "Blizzard Entertainment",
    price: 0,
    onSale: false,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5p1z.jpg"
  }
];

// Реальные AJAX запросы с использованием Fetch API
export const fetchGames = async (page = 1, pageSize = 20) => {
  // Имитируем реальный AJAX запрос с задержкой
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Имитация возможной ошибки (1% chance)
        if (Math.random() < 0.01) {
          throw new Error('Сервер временно недоступен');
        }
        
        // Пагинация для демонстрации
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedGames = MOCK_GAMES.slice(startIndex, endIndex);
        
        resolve(paginatedGames);
      } catch (error) {
        reject(error);
      }
    }, 800 + Math.random() * 700); // Случайная задержка от 800 до 1500 мс
  });
};

export const searchGames = async (query, page = 1, pageSize = 20) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!query || query.trim() === '') {
          // Если запрос пустой, возвращаем все игры
          const startIndex = (page - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const paginatedGames = MOCK_GAMES.slice(startIndex, endIndex);
          resolve(paginatedGames);
          return;
        }

        const filtered = MOCK_GAMES.filter(game =>
          game.title.toLowerCase().includes(query.toLowerCase()) ||
          game.genre.toLowerCase().includes(query.toLowerCase()) ||
          game.developer.toLowerCase().includes(query.toLowerCase()) ||
          game.platform.toLowerCase().includes(query.toLowerCase())
        );

        // Пагинация результатов поиска
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedResults = filtered.slice(startIndex, endIndex);
        
        resolve(paginatedResults);
      } catch (error) {
        reject(error);
      }
    }, 500 + Math.random() * 500); // Случайная задержка от 500 до 1000 мс
  });
};

// Дополнительные AJAX методы для демонстрации
export const fetchGameById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const game = MOCK_GAMES.find(game => game.id === parseInt(id));
        if (game) {
          resolve(game);
        } else {
          reject(new Error('Игра не найдена'));
        }
      } catch (error) {
        reject(error);
      }
    }, 600);
  });
};

export const fetchGamesByGenre = async (genre, page = 1, pageSize = 20) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const filtered = MOCK_GAMES.filter(game =>
          game.genre.toLowerCase().includes(genre.toLowerCase())
        );

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedResults = filtered.slice(startIndex, endIndex);
        
        resolve(paginatedResults);
      } catch (error) {
        reject(error);
      }
    }, 700);
  });
};

export const fetchGamesByPlatform = async (platform, page = 1, pageSize = 20) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const filtered = MOCK_GAMES.filter(game =>
          game.platform.toLowerCase().includes(platform.toLowerCase())
        );

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedResults = filtered.slice(startIndex, endIndex);
        
        resolve(paginatedResults);
      } catch (error) {
        reject(error);
      }
    }, 700);
  });
};

// Метод для получения популярных игр (высокий рейтинг)
export const fetchPopularGames = async (limit = 6) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const popularGames = [...MOCK_GAMES]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
      resolve(popularGames);
    }, 600);
  });
};

// Метод для получения игр со скидками
export const fetchGamesOnSale = async (limit = 6) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const saleGames = MOCK_GAMES
        .filter(game => game.onSale)
        .slice(0, limit);
      resolve(saleGames);
    }, 600);
  });
};