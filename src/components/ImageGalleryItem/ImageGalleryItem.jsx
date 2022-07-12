import PropTypes from 'prop-types';
import {
  ImageGalleryItemStyled,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  smallImg,
  largeImg,
  onOpenModal,
  query,
}) => {
  return (
    <>
      <ImageGalleryItemStyled
        onClick={() => {
          onOpenModal(largeImg);
        }}
      >
        <ImageGalleryItemImage src={smallImg} alt={query} />
      </ImageGalleryItemStyled>
    </>
  );
};

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string,
  largeImg: PropTypes.string,
  onOpenModal: PropTypes.func,
  query: PropTypes.string,
};
