import React from 'react';

const GameCard = ({ game }) => {
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#4CAF50';
    if (rating >= 4.0) return '#8BC34A';
    if (rating >= 3.5) return '#FFC107';
    if (rating >= 3.0) return '#FF9800';
    return '#F44336';
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Дата не указана';
      }
      return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Дата не указана';
    }
  };

  return (
    <div className="game-card">
      <div className="game-card-image">
        <img src={game.image} alt={game.title} />
        <div className="game-rating" style={{ backgroundColor: getRatingColor(game.rating) }}>
          {game.rating.toFixed(1)}
        </div>
      </div>
      
      <div className="game-card-content">
        <h3 className="game-title">{game.title}</h3>
        
        <div className="game-meta">
          <span className="game-platform">{game.platform}</span>
          <span className="game-genre">{game.genre}</span>
        </div>
        
        <p className="game-description">{game.description}</p>
        
        <div className="game-details">
          <div className="game-release">
            <span className="detail-label">Дата выхода:</span>
            <span>{formatDate(game.releaseDate)}</span>
          </div>
          
          <div className="game-developer">
            <span className="detail-label">Разработчик:</span>
            <span>{game.developer}</span>
          </div>
        </div>
        
        <div className="game-price">
          {game.onSale ? (
            <>
              <span className="price-old">${game.price?.toFixed(2)}</span>
              <span className="price-new">${game.salePrice?.toFixed(2)}</span>
              <span className="sale-badge">Скидка!</span>
            </>
          ) : (
            <span className="price-normal">${game.price?.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;