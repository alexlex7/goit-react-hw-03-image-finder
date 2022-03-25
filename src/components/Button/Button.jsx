import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

function Button({ handleClick }) {
  return (
    <button className={s.Button} type="button" onClick={handleClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Button;
