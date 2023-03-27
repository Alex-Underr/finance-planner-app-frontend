import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ children }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const [isOpenModal, setIsOpenModal] = useState(true);
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      setIsOpenModal(false);
      navigate('/');
    }
  };
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        setIsOpenModal(false);
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // here is look overflow whe open modal
  // useEffect(() => {
  //   document.body.style.overflow = 'hidden';
  //   return () => (document.body.style.overflow = 'unset');
  // }, []);

  return (
    isOpenModal &&
    createPortal(
      <div className={css.Overlay} onClick={handleBackdropClick}>
        {children}
      </div>,
      modalRoot
    )
  );
};
