import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
  };

  render() {
    const { children } = this.props;
    return <ul className={s.ImageGallery}>{children}</ul>;
  }
}
