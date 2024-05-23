// Importujemy bibliotekę React
import React from 'react';

// Importujemy style CSS dla tego komponentu
import css from './SearchBar.module.css';

// Definiujemy i eksportujemy komponent funkcyjny React o nazwie SearchBar
export const SearchBar = ({ getQuery }) => {
  return (
    // Tworzymy element nagłówka, który ma klasę CSS Searchbar
    <header className={css.Searchbar}>
      {/* Tworzymy formularz z klasą CSS SearchForm. Kiedy formularz jest wysyłany, wywoływana jest funkcja getQuery */}
      <form className={css.SearchForm} onSubmit={getQuery}>
        {/* Tworzymy przycisk wysyłający formularz. Przycisk ma klasę CSS SearchForm-button */}
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>

        {/* Tworzymy pole tekstowe, które ma kilka atrybutów, takich jak autoComplete="off", autoFocus, placeholder i name */}
        <input
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchQuery"
        />
      </form>
    </header>
  );
};
