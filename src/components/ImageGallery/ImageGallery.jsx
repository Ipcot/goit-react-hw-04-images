import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ImageGalleryStyled } from './ImageGallery.styled';

export const ImageGallery = ({ payload, onOpenModal, query }) => {
  return (
    <ImageGalleryStyled>
      {payload.length > 0 &&
        payload.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            smallImg={webformatURL}
            largeImg={largeImageURL}
            onOpenModal={onOpenModal}
            query={query}
          />
        ))}
    </ImageGalleryStyled>
  );
};

ImageGallery.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      largeImageURL: PropTypes.string,
      webformatURL: PropTypes.string,
    })
  ),
  onOpenModal: PropTypes.func,
  query: PropTypes.string,
};
