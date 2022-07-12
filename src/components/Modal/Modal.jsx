import PropTypes from 'prop-types';
import { Backdrop, ModalStyled, ModalImg } from './Modal.styled';
import { Component } from 'react';

export class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func,
    largeImg: PropTypes.string,
    query: PropTypes.string,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onEscape);
  }

  onEscape = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal(e);
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscape);
  }

  render() {
    const { onCloseModal, largeImg, query } = this.props;

    return (
      <Backdrop onClick={onCloseModal}>
        <ModalStyled>
          <ModalImg src={largeImg} alt={query} />
        </ModalStyled>
      </Backdrop>
    );
  }
}
