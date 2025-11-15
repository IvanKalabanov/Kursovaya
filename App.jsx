import React, { useState, useEffect, useCallback } from 'react';
import GameCard from './components/GameCard';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchGames, searchGames, fetchGamesByGenre, fetchGamesByPlatform, fetchPopularGames, fetchGamesOnSale } from './services/api';
import './styles/App.css';

function App() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeView, setActiveView] = useState('all'); // 'all', 'popular', 'sale'

  const [filters, setFilters] = useState({
    genre: '',
    platform: '',
    sortBy: 'rating'
  });

  // Динамическая загрузка игр
  const loadGames = useCallback(async (page = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setIsLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      let gamesData;
      
      // Динамический выбор источника данных в зависимости от активного вида
      switch (activeView) {
        case 'popular':
          gamesData = await fetchPopularGames(12);
          break;
        case 'sale':
          gamesData = await fetchGamesOnSale(12);
          break;
        case 'all':
        default:
          if (filters.genre) {
            gamesData = await fetchGamesByGenre(filters.genre, page, 8);
          } else if (filters.platform) {
            gamesData = await fetchGamesByPlatform(filters.platform, page, 8);
          } else {
            gamesData = await fetchGames(page, 8);
          }
          break;
      }

      if (isLoadMore) {
        setGames(prev => [...prev, ...gamesData]);
      } else {
        setGames(gamesData);
      }

      // Проверяем, есть ли еще данные для загрузки
      setHasMore(gamesData.length === 8); // Предполагаем, что если вернулось 8 игр, значит есть еще

      if (!isLoadMore) {
        setCurrentPage(1);
      }
    } catch (error) {
      console.error('Error loading games:', error);
      setError('Не удалось загрузить игры. Проверьте подключение к интернету.');
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [activeView, filters.genre, filters.platform]);

  // Динамический поиск с дебаунсингом
  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    
    if (query.trim() === '') {
      setActiveView('all');
      loadGames(1, false);
    } else {
      try {
        setLoading(true);
        setError(null);
        const results = await searchGames(query);
        setGames(results);
        setHasMore(false); // При поиске отключаем бесконечную прокрутку
      } catch (error) {
        console.error('Error searching games:', error);
        setError('Ошибка при поиске игр.');
      } finally {
        setLoading(false);
      }
    }
  }, [loadGames]);

  // Динамическая фильтрация
  const filterGames = useCallback(() => {
    let filtered = [...games];

    // Фильтрация по жанру (если не используется API фильтрация)
    if (filters.genre && activeView === 'all') {
      filtered = filtered.filter(game => 
        game.genre.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }

    // Фильтрация по платформе (если не используется API фильтрация)
    if (filters.platform && activeView === 'all') {
      filtered = filtered.filter(game => 
        game.platform.toLowerCase().includes(filters.platform.toLowerCase())
      );
    }

    // Динамическая сортировка
    switch (filters.sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'releaseDate':
        filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'priceLow':
        filtered.sort((a, b) => (a.onSale ? a.salePrice : a.price) - (b.onSale ? b.salePrice : b.price));
        break;
      case 'priceHigh':
        filtered.sort((a, b) => (b.onSale ? b.salePrice : b.price) - (a.onSale ? a.salePrice : a.price));
        break;
      default:
        break;
    }

    setFilteredGames(filtered);
  }, [games, filters, activeView]);

  // Загрузка при изменении фильтров или активного вида
  useEffect(() => {
    loadGames(1, false);
  }, [loadGames]);

  // Фильтрация при изменении игр или фильтров
  useEffect(() => {
    filterGames();
  }, [filterGames]);

  // Динамическая загрузка при скролле
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoadingMore || !hasMore || searchQuery || activeView !== 'all') {
      return;
    }
    
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    loadGames(nextPage, true);
  }, [currentPage, isLoadingMore, hasMore, searchQuery, activeView, loadGames]);

  // Слушатель скролла для бесконечной прокрутки
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setActiveView('all');
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    setSearchQuery('');
    setFilters({
      genre: '',
      platform: '',
      sortBy: 'rating'
    });
  };

  const retryLoad = () => {
    loadGames(1, false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-icon">🎮</span>
          GameCatalog
        </h1>
        <p className="app-subtitle">Откройте для себя лучшие видеоигры</p>
      </header>

      <main className="app-main">
        <div className="main-content">
          {/* Динамические вкладки */}
          <div className="view-tabs">
            <button 
              className={`tab-button ${activeView === 'all' ? 'active' : ''}`}
              onClick={() => handleViewChange('all')}
            >
              Все игры
            </button>
            <button 
              className={`tab-button ${activeView === 'popular' ? 'active' : ''}`}
              onClick={() => handleViewChange('popular')}
            >
              Популярные
            </button>
            <button 
              className={`tab-button ${activeView === 'sale' ? 'active' : ''}`}
              onClick={() => handleViewChange('sale')}
            >
              Со скидками
            </button>
          </div>

          <div className="controls-section">
            <SearchBar onSearch={handleSearch} />
            <FilterPanel 
              filters={filters} 
              onFilterChange={handleFilterChange}
              activeView={activeView}
            />
          </div>

          {/* Динамическая статистика */}
          <div className="dynamic-stats">
            <div className="games-stats">
              Показано: {filteredGames.length} {filteredGames.length === 1 ? 'игра' : filteredGames.length < 5 ? 'игры' : 'игр'}
              {searchQuery && ` по запросу "${searchQuery}"`}
              {activeView === 'popular' && ' • Популярные'}
              {activeView === 'sale' && ' • Со скидками'}
            </div>
            {hasMore && activeView === 'all' && !searchQuery && (
              <div className="load-more-info">
                Прокрутите вниз чтобы загрузить больше игр
              </div>
            )}
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={retryLoad} className="retry-button">
                Попробовать снова
              </button>
            </div>
          )}

          {loading && !isLoadingMore ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="games-grid">
                {filteredGames.length > 0 ? (
                  filteredGames.map(game => (
                    <GameCard key={`${game.id}-${Math.random()}`} game={game} />
                  ))
                ) : (
                  <div className="no-results">
                    <h3>Игры не найдены</h3>
                    <p>Попробуйте изменить параметры поиска или фильтры</p>
                    <button onClick={retryLoad} className="retry-button">
                      Загрузить все игры
                    </button>
                  </div>
                )}
              </div>

              {/* Индикатор загрузки дополнительного контента */}
              {isLoadingMore && (
                <div className="loading-more">
                  <div className="spinner small"></div>
                  <p>Загрузка дополнительных игр...</p>
                </div>
              )}

              {/* Сообщение о конце списка */}
              {!hasMore && filteredGames.length > 0 && (
                <div className="end-of-list">
                  <p>🎮 Вы просмотрели все игры!</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 GameCatalog. Динамически загружено {games.length} игр</p>
      </footer>
    </div>
  );
}

export default App;