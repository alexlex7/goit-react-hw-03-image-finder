import React, { Component } from 'react';
import Searchbar from './Searchbar';
import s from './App.module.css';
import ImageGallery from './ImageGallery';
import api from '../services/api';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from './Modal';
import Button from './Button';
import Loader from './Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    hits: [],
    modalImage: '',
    modalShow: false,
    isLoading: false,
    currentPage: 1,
  };
  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;
    const prevSearchQuery = prevState.searchQuery;
    const { currentPage } = this.state;
    const prevCurrentPage = prevState.currentPage;

    if (prevSearchQuery !== searchQuery) {
      this.setState({ isLoading: true, currentPage: 1 });
      const data = await api.getImages(searchQuery);
      const hits = data.hits.map(
        ({ webformatURL, tags, id, largeImageURL }) => ({
          webformatURL,
          tags,
          id,
          largeImageURL,
        })
      );
      this.setState({ hits, isLoading: false });
    }

    if (prevSearchQuery === searchQuery && currentPage !== prevCurrentPage) {
      this.setState({ isLoading: true });
      const data = await api.getImages(searchQuery, currentPage);
      const hits = data.hits.map(
        ({ webformatURL, tags, id, largeImageURL }) => ({
          webformatURL,
          tags,
          id,
          largeImageURL,
        })
      );
      this.setState(prevState => ({
        hits: [...prevState.hits, ...hits],
        isLoading: false,
      }));
    }
  }

  handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  handleLoadMore = () => {
    this.setState(({ currentPage }) => ({ currentPage: currentPage + 1 }));
  };

  setModalImage = modalImage => {
    this.setState({ modalImage });
  };

  toggleModal = () => {
    this.setState(prevState => ({ modalShow: !prevState.modalShow }));
  };

  render() {
    const { hits, modalShow, modalImage, searchQuery, isLoading } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        {hits.length > 0 && (
          <ImageGallery>
            {hits.map(({ webformatURL, tags, id, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                image={webformatURL}
                tags={tags}
                modalImage={largeImageURL}
                setModalImage={this.setModalImage}
                toggleModal={this.toggleModal}
              />
            ))}
          </ImageGallery>
        )}

        {modalShow && (
          <Modal
            image={modalImage}
            name={searchQuery}
            toggleModal={this.toggleModal}
          />
        )}
        {hits.length > 0 && !isLoading && (
          <Button handleClick={this.handleLoadMore} />
        )}
        {isLoading && <Loader />}
      </div>
    );
  }
}
