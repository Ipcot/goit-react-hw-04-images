import PropTypes from 'prop-types';
import { LoadMoreButtonStyled } from './LoadMoreButton.styled';

export const LoadMoreButton = ({ onClick }) => {
  return (
    <LoadMoreButtonStyled type="button" onClick={onClick}>
      Load more
    </LoadMoreButtonStyled>
  );
};

LoadMoreButton.propTypes = {
  onClock: PropTypes.func,
}