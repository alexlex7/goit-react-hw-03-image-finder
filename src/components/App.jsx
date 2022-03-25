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

    if (prevSearchQuery !== searchQuery) {
      this.setState({ isLoading: true, currentPage: 1 });
      const { hits } = await api.getImages(searchQuery);
      this.setState({ hits, isLoading: false });
    }
  }

  handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  handleLoadMore = async () => {
    this.setState({
      isLoading: true,
    });
    const { searchQuery, currentPage } = this.state;
    const { hits } = await api.getImages(searchQuery, currentPage + 1);

    this.setState(prevState => ({
      hits: [...prevState.hits, ...hits],
      isLoading: false,
      currentPage: prevState.currentPage + 1,
    }));
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
