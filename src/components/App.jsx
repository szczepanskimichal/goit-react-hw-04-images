import React, { useEffect, useState } from 'react';
import '.App.css';
import { fetchFotos } from '../api/fetchFotos';
import { SearchgBar } from './SearchBar';
import { ImageGallery } from './ImageGallery/';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import { Loader } from './Loader';
import { Modal } from './Modal';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  //funkcja zamykajaca mod

  const closrModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      {/* Warunek sprawdzający, czy modal ma być otwarty */}
      {isModalOpen && (
        <Modal modalURL={imageURL} alt={imageAlt} onClose={closeModal} />
      )}

      {/* Komponent do wyszukiwania */}
      <SearchBar getQuery={getQuery} />

      {/* Warunek sprawdzający, czy wystąpił błąd podczas pobierania danych */}
      {error && <h1>Oops, something went wrong</h1>}

      {/* Warunek sprawdzający, czy trwa ładowanie danych */}
      {isLoading && <Loader />}

      {/* Warunek sprawdzający, czy są jakieś obrazy do wyświetlenia */}
      {images.length !== 0 && (
        <ImageGallery>
          {/* Komponent wyświetlający pojedyncze obrazy w galerii */}
          <ImageGalleryItem data={images} saveURL={getURL} />
        </ImageGallery>
      )}

      {/* Warunek sprawdzający, czy są obrazy do wyświetlenia i czy nie osiągnięto ostatniej strony */}
      {images.length !== 0 && currentPage !== totalPages && (
        // Komponent do ładowania kolejnej strony obrazów
        <Button onClick={loadMore} />
      )}
    </div>
  );
};
