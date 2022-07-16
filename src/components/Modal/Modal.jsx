import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Backdrop, ModalStyled, ModalImg } from './Modal.styled';

export const Modal = ({ onCloseModal, largeImg, query }) => {
  useEffect(() => {
    const onEscape = e => {
      if (e.code === 'Escape') {
        onCloseModal(e);
      }
    };

    window.addEventListener('keydown', onEscape);

    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  }, [onCloseModal]);

  return (
    <Backdrop onClick={onCloseModal}>
      <ModalStyled>
        <ModalImg src={largeImg} alt={query} />
      </ModalStyled>
    </Backdrop>
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func,
  largeImg: PropTypes.string,
  query: PropTypes.string,
};
