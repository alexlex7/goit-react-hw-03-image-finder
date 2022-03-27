import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

function ImageGallery({ children }) {
  return <ul className={s.ImageGallery}>{children}</ul>;
}

ImageGallery.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default ImageGallery;
