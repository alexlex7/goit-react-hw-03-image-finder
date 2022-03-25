import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

function Loader() {
  return (
    <div className={s.container}>
      <ThreeDots color="#00BFFF" height={80} width={80} />
    </div>
  );
}

export default Loader;
