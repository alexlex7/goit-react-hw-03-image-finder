import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({
  image,
  tags,
  modalImage,
  setModalImage,
  toggleModal,
}) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItemImage}
        src={image}
        alt={tags}
        onClick={() => {
          setModalImage(modalImage);
          toggleModal();
        }}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  modalImage: PropTypes.string.isRequired,
  setModalImage: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
