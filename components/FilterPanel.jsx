import React from 'react';

const FilterPanel = ({ filters, onFilterChange, activeView }) => {
  const genres = ['Все', 'Action', 'RPG', 'Adventure', 'Strategy', 'Sports', 'Racing', 'Simulation', 'Horror', 'Shooter', 'Platformer', 'Sandbox'];
  const platforms = ['Все', 'PC', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile'];
  const sortOptions = [
    { value: 'rating', label: 'По рейтингу' },
    { value: 'releaseDate', label: 'По дате выхода' },
    { value: 'title', label: 'По названию' },
    { value: 'priceLow', label: 'По цене (сначала дешевые)' },
    { value: 'priceHigh', label: 'По цене (сначала дорогие)' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value === 'Все' ? '' : value };
    onFilterChange(newFilters);
  };

  // Динамически меняем доступность фильтров в зависимости от активного вида
  const isFiltersDisabled = activeView !== 'all';

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label className="filter-label">
          Жанр:
          {isFiltersDisabled && <span className="filter-disabled-note"> (недоступно)</span>}
        </label>
        <select 
          value={filters.genre || 'Все'} 
          onChange={(e) => handleFilterChange('genre', e.target.value)}
          className="filter-select"
          disabled={isFiltersDisabled}
        >
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">
          Платформа:
          {isFiltersDisabled && <span className="filter-disabled-note"> (недоступно)</span>}
        </label>
        <select 
          value={filters.platform || 'Все'} 
          onChange={(e) => handleFilterChange('platform', e.target.value)}
          className="filter-select"
          disabled={isFiltersDisabled}
        >
          {platforms.map(platform => (
            <option key={platform} value={platform}>{platform}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Сортировка:</label>
        <select 
          value={filters.sortBy} 
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="filter-select"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Динамическая подсказка */}
      {isFiltersDisabled && (
        <div className="filter-notice">
          ⓘ Фильтры по жанру и платформе доступны только в разделе "Все игры"
        </div>
      )}
    </div>
  );
};

export default FilterPanel;