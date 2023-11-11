import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchFotos } from './services/fetchFotoApi';
import { SearchBar } from './SearchBar';
import { ImageGallery } from './ImageGallery/';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import { Loader } from './Loader';
import { Modal } from './Modal';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getQuery = event => {
    event.preventDefault();
    const searchKeyWord = event.target.elements.searchQuery.value;
    if (searchKeyWord !== searchQuery) {
      setSearchQuery(searchKeyWord);
      setCurrentPage(1);
      setImages([]);
    }
  };

  const getURL = (imageURL, alt) => {
    setImageURL(imageURL);
    setImageAlt(alt);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const showImages = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFotos(searchQuery, currentPage);
        const images = data.hits;
        setTotalPages(Math.ceil(data.total / 40));
        if (currentPage === 1) {
          setImages(images);
        } else {
          setImages(prevImages => [...prevImages, ...images]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    showImages();
  }, [searchQuery, currentPage]);

  const loadMore = event => {
    event.preventDefault();
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  return (
    <div className="App">
      {isModalOpen && (
        <Modal modalURL={imageURL} alt={imageAlt} onClose={closeModal} />
      )}
      <SearchBar getQuery={getQuery} />
      {error && <h1>Oops, something went wrong</h1>}
      {isLoading && <Loader />}
      {images.length !== 0 && (
        <ImageGallery>
          <ImageGalleryItem data={images} saveURL={getURL} />
        </ImageGallery>
      )}
      {images.length !== 0 && currentPage !== totalPages && (
        <Button onClick={loadMore} />
      )}
    </div>
  );
};
